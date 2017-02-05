//--------------------------------------------------------------------------------------
var Twitter = require('twitter');

var client = new Twitter({

    consumer_key: 'ZXaOFwTlUfKYc9iFRHZx1VloO',
    consumer_secret: 'UazTCVbwjVgCkSxInIJ7S5eH2JTjParBPf2xVr7qEpnTlsrblH',

    access_token_key: '87772574-xMf7H0q4xwTAjkoudqJJkXVTqLgWCto1DWZtpVYvB',
    access_token_secret: '8m6gqrlYLkI4a77lx0NsI3UcNxt3IFgI61eNTmJktmjXb'
});

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
var Slack = require('slack-node');
slack = new Slack('xoxp-125452612967-125441556822-130372106566-8ced93699abbe8fff5b1146a5580cc24');

var reply = slack.respond({ text: "hola" }, function(hook) {
    return {
        text: 'Good point, ' + hook.user_name,
        username: 'Bot'
    };
});

client.stream('statuses/filter', { track: 'doitTest' }, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet);
        slack.api('chat.postMessage', {
            text: tweet.user.screen_name + " dijo: " + tweet.text,
            channel: '#doit_test'
        }, function(err, response) {
            console.log(response);
        });
        if (tweet.place) {
            if (tweet.place.url) {
                client.get(tweet.place.url, {}, function(err, msj) {
                    console.log("-----------");
                    console.log(msj);
                    console.log("-----------");
                });
            }
        }
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});