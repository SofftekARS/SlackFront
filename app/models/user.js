var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    creation: { type: Date, default: Date.now },
    slacks: [{ type: Schema.Types.ObjectId, ref: 'Slack' }]
}, { collection: 'UsersSlacks' });


UserSchema.methods.populate = function(req) {
    this.name = req.body.name;
    this.password = req.body.password;
};
// set up a mongoose model
module.exports = mongoose.model('User', UserSchema);