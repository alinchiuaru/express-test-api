var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    jwt           = require('jsonwebtoken'),
    config        = require('./config'),
    morgan        = require('morgan');
    models        = require('./models'),
    db            = models.db,
    User          = models.User,
    users         = require('./controllers/users'),
    auth          = require('./controllers/auth'),
    authorization = require('./middlewares/authorization'),
    cors          = require('cors');

var port = process.env.PORT || 8077;
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// use morgan to log requests to the console
app.use(morgan('dev'));

//CrossOrigin
app.use(cors());

app.use('/api', authorization);

//register the users route with api prefix
app.use('/api', users);
//register auth route
app.use(auth);


app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


//Create the tabel if not exist then start the app;
User.sync().then(function() {
    app.listen(port);
    console.log('API runs on localhost @ port: ' + port);
});
