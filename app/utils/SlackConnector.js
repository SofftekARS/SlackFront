let SlackApi = require('slack-api').promisify();
let SlackBot = require('slackbots');
let Slack = require('../models/slack');

let bots = [];

let start = () => {
    // busco los slacks y los guardo en memoria
    Slack.find({}).exec((err, slacks) => {
        slacks.forEach((slack) => {
            let bot = getBot(slack);
            setListeners(bot, slack, slacks);
        });
    });
}

/***Setea todos los observers, para que cuando 
 * alguien hable se escriba en el resto de los slacks */
let setListeners = (bot, slack, slacks) => {
    bot.on('message', (data) => {
        if (data.type == "message") {
            console.log(data);
            if (data.subtype != "bot_message") {
                slacks.forEach((other_slack) => {
                    if (slack != other_slack) {
                        writeMessage(other_slack, data.text);
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
    let bot = bots[slack._id];
    if (!bot) {
        bots[slack._id] = new SlackBot({
            token: slack.bot.bot_access_token,
            name: slack.teamName,
        });
        bot = bots[slack._id];
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
    bot.postMessageToChannel('tt', message, params).always(function(data) {
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
            name: "salaComun",
            token: tokenResponse.access_token
        }).then((channelsResponse) => {
            console.log(channelsResponse);
            //TODO: invite peaple join to chanel
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
}