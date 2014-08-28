
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
    var email = req.body.email||'',
        password = req.body.password||'';


    if (email === '' || password === '') {
		return res.send(401);
	}
    password = crypto.createHmac("sha1", secret.secretToken).update(password).digest("hex");

    var userData = {};

    connection.query("select Users.Id, Users.Name, Users.Surname, UserRoles.Role from Users left join UserRoles on Users.UserRoles_Id = UserRoles.Id where Email like  '" + email + "' and Password like '" + password + "'", function(err, result) {
        if(err) console.log;

        if(result.length === 0) {
            return res.send(400);
        }
        userData.id = result[0].Id;
        userData.name = result[0].Name;
        userData.surname = result[0].Surname;
        userData.role = result[0].Role;
        userData.token = jwt.sign(userData, secret.secretToken);
        return res.json(userData);

    });

}


function logOut(req, res) {
    var token;
    if(req.cookies.token) {
        console.log(req.cookies);
        token = req.cookies.token;
    } else {
        return res.send(401);
    }

    jwt.verify(token, secret.secretToken, function(err, decoded) {
        if(err) {
            return res.send(401);
        }
// for administrator's api
//        if (decoded.role != 'administrator') {
//            return res.send(401);
//        }
        return res.send(200);

    });

}

function register(req, res) {

    var userData = {};
    userData.name = req.body.username||'';
    userData.surname = req.body.surname||'';
    userData.email = req.body.email||'';
    userData.password = req.body.password||'';
    userData.userRoles_Id = 2;

     if (userData.name === '' || userData.surname === '' || userData.email === '' || userData.password === '') {
         return res.send(401);
	}

    password = crypto.createHmac("sha1", secret.secretToken).update(userData.password).digest("hex");

    connection.query("select Id from Users where Email like ?", userData.email, function(err, result) {

        if(result.length !== 0) {
            return res.send(400);
        }

        connection.query("insert into Users set ?", userData, function(err, recordId) {
            userData.id = recordId;
            userData.role = 'user';
            delete userData.email;
            delete userData.password;
            userData.token = jwt.sign(userData, secret.secretToken);
            return res.json(userData);

        });
    });

}
