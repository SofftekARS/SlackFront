let SlackConnector = require('../utils/SlackConnector');
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
    Slack.find({}).exec((err, slacks) => {
        ResponseHelper.write(res, slacks, err, ResponseHelper.get);
    });
}
let authorize = function(req, res) {
    SlackConnector.getToken(req.body.code, (err, ok) => {
        if (!err) {
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
        } else {
            ResponseHelper.write(res, undefined, err, ResponseHelper.badRequest);
        }
    })
};

let getUrl = function(req, res) {
    SlackConnector.getUrl((result) => {
        ResponseHelper.write(res, result, undefined, ResponseHelper.get);
    });
};

function saveSlack(slack, userId, res) {
    User.findById(userId, (err, user) => {
        if (!err && user) {
            slack.save((err, new_slack) => {
                user.slacks.push(new_slack);
                user.save((err, user) => {
                    ResponseHelper.write(res, user, err, ResponseHelper.create);
                });
                SlackConnector.setListeners(new_slack);
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