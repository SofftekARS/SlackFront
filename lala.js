var Slack = require('slack-api').promisify();
var express = require('express');

var open = require('open');
let app = express();
let apiRoutes = express.Router();

let option = {
    client_id: '136512074102.135911134772',
    scope: 'admin',
}

apiRoutes.route("/hola").get((req, resp) => {
    console.log("entro a hola");
    let opt = {
        client_id: '136512074102.135911134772',
        client_secret: "213f6bb78f755ab427ec713fa7a52ffe",
        code: req.query.code
    }

    Slack.oauth.access(opt).then((ok) => {
        console.log(ok);
    });
});


app.use('/', apiRoutes);
app.listen(8080);
Slack.oauth.getUrl(option).then((url) => {
    open(url);
});