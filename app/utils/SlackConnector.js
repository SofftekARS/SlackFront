let SlackApi = require('slack-api').promisify();
let SlackBot = require('slackbots');
let Slack = require('../models/slack');

let bots = [];

let start = () => {
    Slack.find({}).exec((err, slacks) => {
        slacks.forEach((slack) => {
            let bot = getBot(slack);
            setListeners(bot, slack, slacks);
        });
    });
}

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
    scope: 'admin, bot'
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
    SlackApi.oauth.access(opt).then((ok) => {
        console.log("obtengo token: " + JSON.stringify(ok));
        next(undefined, ok);
    }).catch(SlackApi.errors.SlackError, (error) => {
        console.log('Slack did not like what you did: ' + error.message);
        next(error);
    });
}

let getUrl = (next) => {
    SlackApi.oauth.getUrl(opt).then((url) => {
        console.log("salck me dio esta url: " + url);
        let obj = {
            url: url
        }
        next(obj);
    });
}

let getChannels = (slack) => {

    }
    // busco los slacks y los guardo en memoria
start();

module.exports = {
    getUrl: getUrl,
    getToken: getToken,
}