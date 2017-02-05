var User = require('../models/user');
var ResponseHelper = require('../utils/ResponseHelper');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

function init(router, app) {
    router.route('/authenticate')
        .post(function(req, res) {
            // find the user
            User.findOne({
                name: req.body.name
            }, function(err, user) {
                if (err) throw err;
                if (!user) {
                    let obj = { success: false, message: 'Authentication failed. User not found.' };
                    ResponseHelper.write(res, obj, err, ResponseHelper.unathorize);
                } else if (user) {
                    // check if password matches
                    if (user.password != req.body.password) {
                        let obj = { success: false, message: 'Authentication failed. Wrong password.' };
                        ResponseHelper.write(res, obj, err, ResponseHelper.unathorize);
                    } else {

                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresIn: 86400 // expires in 24 hours
                        });

                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            });
        });

    router.use(function(req, res, next) {

        var token = req.headers.authorization;
        console.log(token);
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    ResponseHelper.write(res, { success: false, message: 'Failed to authenticate token.' }, err, ResponseHelper.unathorize);
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }

    });

}

module.exports = {
    init: init
}