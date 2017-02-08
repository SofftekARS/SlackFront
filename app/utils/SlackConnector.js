let SlackApi = require('slack-api').promisify();
let SlackBot = require('slackbots');
let Slack = require('../models/slack');
let Async = require('async');

const channelGeneral = "pruebachannels1";

let opt = {
    client_id: '136512074102.135911134772',
    client_secret: "213f6bb78f755ab427ec713fa7a52ffe",
    scope: 'admin, bot, channels:read chat:write:bot channels:write'
};

let bots = [];
let slacks = [];

let start = () => {
    // busco los slacks y los guardo en memoria
    Slack.find({}).exec((err, slacksDB) => {
        console.log("inicializizo " + slacksDB.length + " slacks");
        slacksDB.forEach((slack) => {
            setListeners(slack);
        });
    });
}


/***Setea todos los observers, para que cuando 
 * alguien hable se escriba en el resto de los slacks */
let setListeners = (slack) => {
    //agrego el slack al pool de slacks
    slacks.push(slack);
    console.log("agrego 1 slack: " + slacks.length);
    //busco el bot correspontiente a ese slack
    let bot = getBot(slack);
    bot.on('message', (event) => {
        //cuando pasa algo en cada slack me fijo que sea del tipo mensaje
        if (event.type == "message" && event.subtype != "bot_message") {
            //le aviso a todos los otros slacks que tengo que escribirles
            callOthersSlacks(slack, bot.token, event);
        }
    });
}

let callOthersSlacks = (slack, tokenBot, event) => {
    slacks.forEach((otherSlack) => {
        //skipeo el slack donde se produjo el evento 
        if (slack != otherSlack) {
            //obtengo la info del usuario
            SlackApi.users.info({ token: tokenBot, user: event.user }, (err, userDetail) => {
                writeMessage(otherSlack, event, slack.teamName, userDetail.user);
            });
        }
    });
}

let getBot = (slack) => {
    let bot = bots[slack.teamId];
    if (!bot) {
        bots[slack.teamId] = new SlackBot({
            token: slack.bot.bot_access_token,
            name: slack.teamName,
        });
        bot = bots[slack.teamId];
    }
    return bot;
}

/***Escribe el mesaje en un slack en particular */
let writeMessage = (slack, data, teamName, user) => {
    console.log(user);
    let params = {
        username: user.name + "/" + teamName,
        icon_url: user.profile.image_32

    };
    let bot = getBot(slack);
    console.log("escribo en: " + slack.teamName + ": " + JSON.stringify(data));
    bot.postMessageToChannel(channelGeneral, data.text, params).fail(function(data) {
        console.log(data);
    });
}

let getToken = (code, next) => {
    opt.code = code;
    console.log("buscando token de slack: ");
    console.log(opt);
    //change code to token
    SlackApi.oauth.access(opt).then((tokenResponse) => {
        console.log("obtengo token: " + JSON.stringify(tokenResponse));
        next(undefined, tokenResponse);
    }).catch(SlackApi.errors.SlackError, function(error) {
        console.log('Slack did not like what you did: ' + error.message);
        next(error);
    });
}
let getImageTeam = (slack) => {
    getBot(slack).on("start", () => {
        console.log(SlackApi.team);
    });
};

let createChannel = (token, botUserId, next) => {
        //create a channel
        SlackApi.channels.create({ name: channelGeneral, token: token }).then((channelsResponse) => {
            console.log("-------- cree el canal: ");
            console.log(channelsResponse);

            let inviteOptions = {
                channel: channelsResponse.channel.id,
                token: token,
                user: botUserId,
            };

            SlackApi.channels.invite(inviteOptions);
            next(undefined, channelsResponse);

        }).catch(SlackApi.errors.SlackError, function(error_channel) {
            console.log('Slack create channel: ' + error_channel.message);
            if (error_channel.message != "name_taken") {
                next(error_channel);
            } else {
                //TODO: invite peaple join to chanel
                next(undefined, channelsResponse);
            }
        });
    }
    /**
     * Obtengo la url para redirigir
     */
let getUrl = (next) => {
    SlackApi.oauth.getUrl(opt).then((url) => {
        console.log("salck me dio esta url: " + url);
        let obj = {
            url: url
        }
        next(obj);
    });
}

start();

module.exports = {
    getUrl: getUrl,
    getToken: getToken,
    setListeners: setListeners,
    getImageTeam: getImageTeam,
    createChannel: createChannel,
}