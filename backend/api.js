var mysql        = require('mysql'),
    express      = require('express'),
    jwt          = require('jsonwebtoken'),
    crypto       = require('crypto'),
    bodyParser   = require('body-parser'), 
    cookieParser = require('cookie-parser'),
    myConnection = require('express-myconnection'),
    secret       = require('./config/secret');  

var app    = express(),
    routes = require('./routes.js');

var connectionPool = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Enviromap'
};

app.use(bodyParser());
app.use(cookieParser());
app.use(myConnection(mysql, connectionPool, 'pool'));
app.use(express.static(__dirname + '/frontend'));

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' === req.method) return res.send(200);
  next();
});

//user
app.get('/problems', routes.getProblems);
app.get('/problems/:id', routes.getProblemId);
app.get('/users/:idUser', routes.getUserId);
app.get('/activities/:idUser', routes.getUserActivity);
app.post('/problempost', routes.postProblem);
app.post('/vote', routes.postVote);

app.post('/login', routes.logIn);
app.get('/logout', routes.logOut); 
app.post('/register', routes.register);
//admin
app.get('/not_approved', routes.notApprovedProblems);
app.delete('/problem', routes.deleteProblem);
app.delete('/user', routes.deleteUser);
app.delete('/comment', routes.deleteComment);
app.delete('/photo', routes.deletePhoto);
app.put('/edit', routes.editProblem);

app.listen(3000);
console.log('Rest Demo Listening on port 3000');
