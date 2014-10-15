var mysql = require('mysql'),
    express = require('express'),
    multer = require('multer'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    secret       = require('./config/secret'),
    io = require('socket.io'),
    routes = require('./routes.js'),
    //location = require('./config.js');
    // for image processing !!!! use with GraphicsMagick and gm module
    // var gm = require('gm');
    var productionVersion = process.argv[0];
    var locationProduction = "../frontend/dist";
    var locationDevelop = "../frontend";
    var location="";
    if(productionVersion){
        location = locationProduction;
    }else{
        location = locationDevelop;
    }
    io = io.listen(server);
    require('./sockets/base')(io);

var connectionPool = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'Enviromap'
};

 
 var router = express.Router();

  /* GET users listing. */
  router.get('/', function(req, res) {
      console.log(req);
    res.send('respond with a resource');
  });
 

// optional - set socket.io logging level
io.set('log level', 1);
io.set('transports', ['flashsocket', 'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

app.use(multer(
    {
        dest: location+'photos/large'
    }));
    /*    // for image processing !!!! use with GraphicsMagick and gm module
app.use(multer(
    {
        dest: location+"/photos/large/",
        onFileUploadComplete: function(file){


            gm(location+"/photos/large/"+file.name)
            .size(function (err, size) {
              if (!err && size.height>=1000){
                  this.resize(3000, 1000)
            .write(location+"/photos/large/"+file.name, function (err) {
            if (!err) console.log('done');
            });

              }
            if(err) throw err;
            })


    }
    }));
*/
    
    
app.use(bodyParser());
app.use(cookieParser());
app.use(bodyParser());
app.use(myConnection(mysql, connectionPool, 'pool'));
app.use('/',express.static(location));
console.log(__dirname);

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' === req.method) return res.send(200);
  next();
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//user
app.get('/api/problems', routes.getProblems);
app.get('/api/problems/:id', routes.getProblemId);
app.get('/api/users/:idUser', routes.getUserById);
app.get('/api/usersProblem/:idUser', routes.getUserProblemsById);
app.get('/api/activities/:idUser', routes.getUserActivity);
app.post('/api/problempost', routes.postProblem);
app.post('/api/vote', routes.postVote);
app.get('/api/getTitles',routes.getTitles);
app.get('/api/resources/:name',routes.getResource);
//new api for adding new photos to existed problem
app.post('/api/photo/:id',routes.addNewPhotos);
app.post('/api/comment/:id',routes.addComment);
app.post('/api/login', routes.logIn);
app.get('/api/logout', routes.logOut);
app.post('/api/register', routes.register);
//admin
app.get('/api/not_approved', routes.notApprovedProblems);
app.delete('/api/problem/:id', routes.deleteProblem);
app.delete('/api/user/:id', routes.deleteUser);
app.delete('/api/activity/:id', routes.deleteComment);
app.delete('/api/photo/:id', routes.deletePhoto);
app.put('/api/editProblem/:id', routes.editProblem);
app.post('/api/addResource', routes.addResource);
app.put('/api/editResource/:id', routes.editResource);
app.delete('/api/deleteResource/:id', routes.deleteResource);
app.post('/api/approve/:id', routes.approveProblem);
//admin - newsline Api
app.post('/api/postNews',routes.postNews);
app.post('/api/getNews',routes.getNews);
app.post('/api/clearNews',routes.clearNews);
app.post('/api/clearOneNews',routes.clearOneNews);
app.get('/api/getStats1/:val', routes.getStats1);
app.get('/api/getStats2/:val', routes.getStats2);
app.get('/api/getStats3', routes.getStats3);
app.get('/api/getStats4', routes.getStats4);
app.get('/api/getStats5/:val', routes.getStats5);



server.listen(8090);

console.log('Rest Demo Listening on port 8090');
