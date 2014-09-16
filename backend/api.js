var mysql = require('mysql'),
    express = require('express'),
    multer = require('multer'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    secret       = require('./config/secret');

var app    = express(),
    routes = require('./routes.js');

var connectionPool = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Enviromap'
};


app.use(multer(
    {
        dest: '../frontend/photos/large'
    }));
app.use(bodyParser());
app.use(cookieParser());
app.use(bodyParser());
app.use(myConnection(mysql, connectionPool, 'pool'));
app.use('/',express.static('../frontend'));
//console.log(__dirname);

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' === req.method) return res.send(200);
  next();
});

//user
app.get('/api/problems', routes.getProblems);
app.get('/api/problems/:id', routes.getProblemId);
app.get('/api/users/:idUser', routes.getUserId);
app.get('/api/activities/:idUser', routes.getUserActivity);
app.post('/api/problempost', routes.postProblem);
app.post('/api/vote', routes.postVote);
app.get('/api/resources/:name',routes.getResource);
//new api for adding new photos to existed problem
app.post('/api/photo/:id',routes.addNewPhotos);

app.post('/api/login', routes.logIn);
app.get('/api/logout', routes.logOut);
app.post('/api/register', routes.register);
//admin
app.get('/api/not_approved', routes.notApprovedProblems);
app.delete('/api/problem/:id', routes.deleteProblem);
app.delete('/api/user/:id', routes.deleteUser);
app.delete('/api/activity/:id', routes.deleteComment);
app.delete('/api/photo/:id', routes.deletePhoto);
app.put('/api/edit', routes.editProblem);


app.listen(8090);
console.log('Rest Demo Listening on port 8090');
