var mysql = require('mysql'),
    express = require('express'),
    compress = require('compression'),
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
    location = require('./config.js')
    //for image processing !!!! use with GraphicsMagick and gm module
    //var gm = require('gm');
    
    io = io.listen(server);
    require('./sockets/base')(io);

app.set('view engine', 'ejs');
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
    
    
        // for image processing !!!! use with GraphicsMagick and gm module
        // AND ALSO U NEED TO CREATE small folder!!
/*
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
            });
            

            gm(location+"/photos/large/"+file.name)
            .size(function (err, element) {
                    var w = element.width;
                    var h = element.height;
                    if (h>w) {
                        this.crop(w,w,0,Math.floor((h - w)/2))
                            .resize(160)
                            .write(location + "/photos/small/" + file.name, function (err) {
                                if (!err) console.log('done');
                            });
                        console.log(element.height);
                    } else {
                        this.crop(h,h,(w - h)/2, 2)
                            .resize(null, 160)
                            .write(location + "/photos/small/" + file.name, function (err) {
                                if (!err) console.log('done');
                            });
                    };


            if(err) throw err;
            });



    }
    }));
    */




//app.use(compress());
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
/*app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/
//part addComment with using socket
//////////////////
var addComment = function(req,res) {
    console.log("start addComment API function");
    req.getConnection(function (err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err: err.code
            });
            console.log('Can`t connect to db in addComment API call\n' + err +"\n");
        } else {
            try{
                var content ={
                    Content:req.body.data.Content,
                    userName:req.body.data.userName,
                    userSurname:req.body.data.userSurname

                };
                if(req.body.data.userId==undefined) {
                    content.userName="(Анонім)";
                    req.body.userId = 2;
                }
                var activityData = {
                    Content:JSON.stringify(content),
                    //Content: "Корістувач " + req.body.userName + " залишив коментар: "+req.body.Content,
                    Date: new Date((new Date()).getTime()+2*60*60*1000),
                    ActivityTypes_Id: 5,
                    Users_Id: req.body.data.userId,
                    Problems_Id: req.params.id
                };
                connection.query('INSERT INTO Activities SET ?', [activityData], function (err) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err: err.code
                        });
                        console.error('Can`t make INSERT query for activityData = '+ activityData +'\n' + err +"\n");
                    }
                    /////// using socket
                    io.sockets.emit('broadcast', {
                        payload: {content:content.Content,id:req.params.id,user:content.userName,date:new Date((new Date()).getTime()+2*60*60*1000),trigger:true
                        },
                        source: ""
                    });
                    ///////
                    connection.query('SELECT * FROM Activities WHERE Activities.Problems_Id=?', [req.params.id], function(err3, rows3) {
                        if (err3) {
                            res.statusCode = 500;
                            res.send({
                                err3:    err3.code
                            });
                            console.error('Can`t make SELECT query for Activities.Problems_Id = '+ req.params.id +'\n' + err +"\n");
                        }
                        res.send([rows3]);
                        console.log("end addComment API function");
                    });
                });
            }
            catch(err){
                console.log('Can`t make query to db in addComment API' + err + '\n');
            }
        }
    });
};
//////////////////
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
app.post('/api/comment/:id',addComment);
app.post('/api/login', routes.logIn);
app.get('/api/logout', routes.logOut);
app.post('/api/register', routes.register);
app.post('/api/changePassword', routes.changePassword);
app.post('/api/resetPassword', routes.resetPassword);
//admin
app.get('/api/not_approved', routes.notApprovedProblems);
app.delete('/api/problem/:id', routes.deleteProblem);
app.delete('/api/user/:id', routes.deleteUser);
app.delete('/api/activity/:id', routes.deleteComment);
app.delete('/api/photo/:link', routes.deletePhoto);
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
app.get('/api/getStats1', routes.getStats1);
app.get('/api/getStats2/:val', routes.getStats2);
app.get('/api/getStats3', routes.getStats3);
app.get('/api/getStats4', routes.getStats4);


server.listen(8090);

console.log('Rest Demo Listening on port 8090');
