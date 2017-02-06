let User = require('../models/user');
let ResponseHelper = require('../utils/ResponseHelper');
let GenericDao = require('../utils/GenericDao');

function init(router) {
    router.route('/users')
        .get(getUsers);
    router.route('/users/slacks')
        .get(getSlacks);
    router.route('/users/:id')
        .get(getUser)
        .post(saveUser);
}

let getSlacks = function(req, res) {
    User.findById(req.decoded._doc._id).select("-_id -password -creation -name -__v").populate("slacks", "-__v -token -bot -scope").exec(
        function(err, users) {
            ResponseHelper.write(res, users, err, ResponseHelper.get);
        });
};
let getUsers = function(req, res) {
    User.find({}).select("-password").exec(
        function(err, users) {
            ResponseHelper.write(res, users, err, ResponseHelper.get);
        });
};
let getUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        ResponseHelper.write(res, user, err, ResponseHelper.get);
    });
};
let saveUser = function(req, res) {
    User.findOne({ name: req.body.name }, (err, user) => {
        if (!err && !user) {
            GenericDao.save(req, res, User);
        } else {
            ResponseHelper.write(res, { message: "el usuario ya existe" }, err, ResponseHelper.badRequest);
        }
    });
};
module.exports = {
    init: init
}