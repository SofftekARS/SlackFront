var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let botSchemma = new Schema({
    bot_user_id: { type: String, required: true },
    bot_access_token: { type: String, required: true },
});
var SlackSchema = new Schema({
    userSlackId: { type: String, required: true },
    token: { type: String, required: true },
    scope: { type: String, required: true },
    teamName: { type: String, required: true },
    teamId: { type: String, required: true, index: { unique: true } },
    channel: { type: String, index: { unique: true } },
    bot: botSchemma,
}, { collection: 'Slacks' });

SlackSchema.methods.populate = function(req) {
    this.name = req.body.name;
    this.token = req.body.token;
};
SlackSchema.methods.populateFromSlackResponse = function(req) {
    console.log("populateFromSlackResponse");
    console.log(req);
    this.scope = req.scope;
    this.userSlackId = req.user_id;
    this.teamName = req.team_name;
    this.teamId = req.team_id;
    this.token = req.access_token;
    this.bot = req.bot;
};
// set up a mongoose model
module.exports = mongoose.model('Slack', SlackSchema);