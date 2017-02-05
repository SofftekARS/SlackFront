let SlackApi = require('slack-api').promisify();
let User = require('../models/user');
let Slack = require('../models/slack');
let ResponseHelper = require('../utils/ResponseHelper');
let GenericDao = require('../utils/GenericDao');

function init(router) {
    router.route('/slack')
        .post(authorize)
        .get(getAll);
    router.route('/slack/url')
        .get(getUrl);
}

let getAll = function(req, res) {
    Slack.find({}).exec((err, users) => {
        ResponseHelper.write(res, users, err, ResponseHelper.get);
    });
}
let authorize = function(req, res) {
    let opt = {
        client_id: '136512074102.135911134772',
        client_secret: "213f6bb78f755ab427ec713fa7a52ffe",
        code: req.body.code
    }

    SlackApi.oauth.access(opt).then((ok) => {
        let slack = new Slack();
        slack.populateFromSlackResponse(ok);
        Slack.findOne({ teamId: ok.team_id }, (err, findSlack) => {
            if (!findSlack && !err) {
                console.log("guardando slack");
                saveSlack(slack, req.decoded._doc._id, res);
            } else {
                ResponseHelper.write(res, { message: "el Slack ya existe" }, err, ResponseHelper.badRequest);
            }
        });
    }).catch(SlackApi.errors.SlackError, (error) => {
        console.log('Slack did not like what you did: ' + error.message);
        ResponseHelper.write(res, undefined, error, ResponseHelper.badRequest);
    });
};

let getUrl = function(req, res) {
    let option = {
        client_id: '136512074102.135911134772',
        scope: 'admin',
    }

    SlackApi.oauth.getUrl(option).then((url) => {
        console.log(url);
        let obj = {
            url: url
        }
        ResponseHelper.write(res, obj, undefined, ResponseHelper.get);
    });
};

function saveSlack(slack, userId, res) {
    User.findById(userId, (err, user) => {
        if (!err && user) {
            slack.save((err, new_obj) => {
                user.slacks.push(new_obj);
                user.save((err, user) => {
                    ResponseHelper.write(res, user, err, ResponseHelper.create);
                });
            });
        } else {
            console.error(err);
            ResponseHelper.write(res, undefined, err, ResponseHelper.create);
        }
    });
};

module.exports = {
    init: init
}