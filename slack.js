var Slack = require('slack-api');

Slack.api.test({}, function(error, data) {
    console.log(data);
});



// create a bot 
let bot_new = new SlackBot({
    token: 'xoxp-125452612967-125441556822-130372106566-8ced93699abbe8fff5b1146a5580cc24', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'My Bot'
});

let bots = [bot_new];
initBots(bots, generalBot);

function initBots(bots, generalBot) {
    bots.forEach(function(bot) {
        runBot(bot, generalBot);
    });
}

function runBot(bot, generalBot) {
    bot.on("start", () => {
        bot.getChannels().then((data, err) => {
            let channel = data.channels.filter(function(e) {
                return e.name == "random";
            });
            if (channel.length > 0) {
                init(bot, channel[0], generalBot);
            } else {
                console.err("no se encuentra el channel");
            }
        });
    });
}

function init(bot, channel, generalBot) {
    console.log("entre al init");
    bot.on('message', (data) => {
        if (data.type == "message" && data.channel == channel.id) {
            console.log(data);
            bot.getUserById(data.user).then((userSlack, err) => {
                if (!err) {
                    var params = {
                        icon_emoji: ':cat:'
                    };
                    let message = userSlack.name + " del channel: " + channel.name + " dice: " + data.text;
                    generalBot.postMessageToChannel('general', message, params);
                    console.log(message);
                } else {
                    console.err(err);
                }
            });
        }
    });

}