'use strict';

var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    jwt           = require('jsonwebtoken'),
    config        = require('./config'),
    morgan        = require('morgan'),
    models        = require('./models'),
    users         = require('./controllers/users'),
    auth          = require('./controllers/auth'),
    cors          = require('cors');

var port = process.env.PORT || 8077;
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// use morgan to log requests to the console
app.use(morgan('dev'));

//CrossOrigin
app.use(cors());

//register the users route with api prefix
app.use('/api', users);

//register auth route
app.use(auth);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


var modelsSync = [
    models.User.sync(),
    models.Course.sync(),
    models.Chapter.sync(),
    models.Lesson.sync(),
    models.Quiz.sync(),
    models.Question.sync()
];

Promise.all(modelsSync)
    .then(function() {
        app.listen(port);
        console.log('API runs on localhost @ port: ' + port);
    });

