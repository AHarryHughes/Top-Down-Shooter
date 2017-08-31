const express = require('express');
const application = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Users = require("../models/Users");

mongoose.connect('mongodb://localhost:27017/Shooterbase');
mongoose.connection
    .once('open', () => console.log('good to go'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use('/assets', express.static('./src/assets'));
application.use('/bin', express.static('./src/bin'));
application.use('/levels', express.static('./src/levels'));

application.use(bodyParser());
application.use(bodyParser.urlencoded({ extended: true }));

application.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

session.isAuthenticated = false;
session.user = null;

application.get('/', (request, response) => {
    response.render('login');
});

application.post('/', async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    let errors = [];

    if(await Users.findOne({username: username}) == null){
        errors.push('This username is not valid');
        response.render('login', {errors: errors});
    }
    else{
        session.user = await Users.findOne({username: username});
    }

    if(session.user.password == password){
        session.isAuthenticated = true;
        response.redirect('game');
    }
    else{
        session.user = null;
        errors.push('This password is not valid');
        response.render('login', {errors: errors});
    }


});

application.get('/signup', (request, response) => {
    response.render('signup');
});

application.post('/signup', async (request, response) => {
    let username = request.body.username;
    let display = request.body.display;
    let password = request.body.password;
    let confirm = request.body.confirm;
    let errors = [];

    if(await Users.findOne({username: username}) != null){
        errors.push('This username is taken');
    }
    if(await Users.findOne({display: display}) != null){
        errors.push('This display name is taken');
    }
    if(password != confirm) {
        errors.push('The passwords do not match');
    }

    if(errors.length == 0){
        Users.create({
            username: username,
            password: password,
            display: display,
            topWave: 0
        })
            .then(() => {
                response.redirect('/')
            })
            .catch(() => {
                console.log("It aint be creating");
            });

    }
    else{
        response.render('signup', {errors: errors});
    }


});

application.get('/game', async (request, response) => {
    if(session.isAuthenticated == false){
        response.redirect('/');
    }

    let topWavers = await Users.find();

    let topWaverIndex = 0;
    for(let i = 1; i < topWavers.length; i++){
        topWavers[topWaverIndex].topWave < topWavers[i].topWave ? topWaverIndex = i : topWaverIndex = topWaverIndex ;
    }

    let highScore = {name: topWavers[topWaverIndex].display, waves: topWavers[topWaverIndex].topWave};

    response.render('game', highScore);
});

application.listen(4000);



