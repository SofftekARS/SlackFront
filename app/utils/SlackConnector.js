let SlackApi = require('slack-api').promisify();
let SlackBot = require('slackbots');
let Slack = require('../models/slack');
const channelGeneral = "pruebachannels1";
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
    let bot = getBot(slack);
    bot.on('message', (data) => {
        if (data.type == "message") {
            //console.log(data);
            if (data.subtype != "bot_message") {
                slacks.forEach((other_slack) => {
                    if (slack != other_slack) {
                        writeMessage(other_slack, data.text);
                    } else {
                        //console.log("este no");
                    }
                });
            }
        }
    });
}

let opt = {
    client_id: '136512074102.135911134772',
    client_secret: "213f6bb78f755ab427ec713fa7a52ffe",
    scope: 'admin, bot, channels:read chat:write:bot channels:write'
};

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
let writeMessage = (slack, message) => {
    let params = {
        username: "damian/doit",
        icon_emoji: ':cat:'
    };
    let bot = getBot(slack);
    console.log("--------- escribo en: " + slack.teamName);
    if (!message) {
        message = "mensaje vacio";
    }
    bot.postMessageToChannel(channelGeneral, message, params).fail(function(data) {
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
        //create a channel
        SlackApi.channels.create({
            name: channelGeneral,
            token: tokenResponse.access_token
        }).then((channelsResponse) => {
            console.log("-------- cree el canal: ");
            console.log(channelsResponse);
            SlackApi.channels.invite({
                channel: channelsResponse.channel.id,
                token: tokenResponse.access_token,
                user: tokenResponse.bot.bot_user_id,
            });
            next(undefined, tokenResponse);
        }).catch(SlackApi.errors.SlackError, function(error_channel) {
            console.log('Slack create channel: ' + error_channel.message);
            if (error_channel.message != "name_taken") {
                next(error_channel);
            } else {
                //TODO: invite peaple join to chanel
                next(undefined, tokenResponse);
            }
        });
    }).catch(SlackApi.errors.SlackError, function(error) {
        console.log('Slack did not like what you did: ' + error.message);
        next(error);
    });
}
let getImageTeam = (slack) => {
    getBot(slack).on("start", () => {
        console.log(SlackApi.team);
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
    getImageTeam: getImageTeam
}