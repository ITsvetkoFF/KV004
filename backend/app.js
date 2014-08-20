
var mysql       = require('mysql');
var express     = require('express');
var app         = express();

var jwt         = require('jsonwebtoken');
var crypto      = require("crypto");

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var secret = require('./config/secret');

app.use(bodyParser());
app.use(cookieParser());

app.use(express.static(__dirname + '/frontend'));

app.listen(3000);
console.log('I am working!');

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'Enviromap_schema',
});

connection.connect();

//var psw = crypto.createHmac("sha1", "10011992").update("123456").digest("hex");
//connection.query("update `Enviromap_schema`.`Users` set email = 'real@gmail.com' where `Id`=2",  function(err, affectedRows) {
//    console.log(affectedRows);
//});

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' === req.method) return res.send(200);
  next();
});

app.get('/', function(req, res){
    res.send('I am working!');
});


app.post('/login', logIn);
app.get('/logout', logOut);
app.post('/register', register);


function logIn(req, res) {
    var email = req.body.username||"";
    var password = req.body.password||"";


    if (email === '' || password === '') {
		return res.send(401);
	}
    password = crypto.createHmac("sha1", "123456").update(password).digest("hex");

    var userData = {};

    connection.query("select `Id`, `Name`, `Surname`  from `Enviromap_schema`.`Users` where `Email` like '" + email + "' and `Password` like '" + password + "'", function(err, result) {

        if(result.length === 0) {
            return res.send(401);
        }

        userData.name = result[0].Name;
        userData.surname = result[0].Surname
        userData.token = jwt.sign(result, secret.secretToken);
        return res.json(userData);

    });

}


function logOut(req, res) {
    var token = req.cookies.token;
    jwt.verify(token, secret.secretToken, function(err, decoded) {
        if(err) {
            return res.send(401);
        }
        return res.send(200);
    });

}

function register(req, res) {

    var name = req.body.username||"";
    var surname = req.body.surname||"";
    var email = req.body.email||"";
    var password = req.body.password||"";

     if (name === "" || surname === "" || email === "" || password === "") {
         return res.send(401);
	}

    password = crypto.createHmac("sha1", "123456").update(password).digest("hex");

    var userData = {};

    connection.query("select `Id`  from `Enviromap_schema`.`Users` where `Email` like '" + email + "'", function(err, result) {


        if(result.length !== 0) {
            return res.send(401);
        }

        connection.query("insert into `Enviromap_schema`.`Users` (`Name`, `Surname`, `Email`, `Password`) values ('" + name + "', '" + surname + "', '" + email + "', '" + password + "')", function(err, recordId) {

            userData.token = jwt.sign(recordId, secret.secretToken);
            userData.name = name;
            userData.surname = surname;
            console.log(userData);
            return res.json(userData);

        });
    });

}
