//Config
let config = require('./config'); // get our config file
let port = process.env.PORT || 8080; // used to create, sign, and verify tokens
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let morgan = require('morgan');
let fs = require('fs');
let path = require('path');
let util = require('util');

//---------------------------------------------------------------
let log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
let log_stdout = process.stdout;

console.log = (d) => { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
//----------------------------------------------------------------


let app = express();
mongoose.connect(config.database); // connect to database

morgan.token('request', function getId(req) {
    return JSON.stringify(req.body);
});

app.use(morgan(':method - :url - :status, :req[header], :request :response-time[digits]ms', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); //enable cors
app.set('superSecret', config.secret); // secret variable

//------------------------------------------------------------------------
let SecurityController = require('./app/controllers/SecurityController');
let UserController = require('./app/controllers/UserController');
let SlackController = require('./app/controllers/SlackController');

let apiRoutes = express.Router();

SecurityController.init(apiRoutes, app);
UserController.init(apiRoutes);
SlackController.init(apiRoutes);

app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);