var mysql      = require('mysql');
var express    = require('express');
var app		   = express();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());

var connectionpool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'enviromap'
});

app.get('/problems', function(req,res){getProblems(req,res);})
app.get('/problems/:id', function(req,res){getProblemId(req,res);})
app.get('/users/:idUser', function(req,res){getUserId(req,res);})
app.get('/activities/:idUser', function(req,res){getUserActivity(req,res);})
app.get('/problemspost/:id', function(req,res){postProblemId(req,res);})
app.get('/vote/:id', function(req,res){postVote(req,res);})

function getProblems(req,res){ // get all problems in brief (id, title, coordinates, type)
	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("getProblems - method works");
            connection.query('SELECT Id, Title, Lat, Lon, ProblemTypes_Id FROM Problems', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    // fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};

function getProblemId(req,res){ //get detailed problem description (everything)
	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("getProblemId - method works");
            var id = req.params.id;
            connection.query('SELECT * FROM Problems WHERE Id=?', [id], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    // fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};

function getUserId(req,res){ //get all user's problems in brief (coords, type, title)
	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("getUserId - method works");
            var idUser = req.params.idUser;
            connection.query('SELECT Id, Title, Lat, Lon, ProblemTypes_Id FROM Problems WHERE Id IN (SELECT Problems_Id FROM Activities WHERE Users_Id = ?)', [idUser], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    // fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};

function getUserActivity(req,res){  //get user's activity list (everything)
	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("getUserActivity - method works");
            var idUser = req.params.idUser;
            connection.query('SELECT Id, ActivityContent, ActivityDate, ActivityTypes_Id, Problems_Id FROM Activities WHERE Users_Id = ?', [idUser], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    // fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};

function postProblemId(req,res){  //post new problem
	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("postProblemId - method works");
            // var input = req.body;
            // var data = {
            // 	Title 				: input.title,
            // 	Content 			: input.content,
            // 	Lat 				: input.latitude,
            // 	Lon 				: input.longituge,
            // 	ProblemStatus_Id 	: input.problemStatus_Id,
            // 	ProblemTypes_Id 	: input.problemTypes_Id
            // };
            // var id = req.params.id;
            var data = {
            	Title 				: "Dump",
            	Content 			: "lol",
            	Lat 				: "8",
            	Lon 				: "3",
            	ProblemStatus_Id 	: "1",
            	ProblemTypes_Id 	: "1"
            };
            connection.query('INSERT INTO Problems SET ?', data, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};

function postVote(req,res){  //+1 vote for a problem
	connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("postVote - method works");
            var id = req.params.id;
            connection.query('UPDATE Problems SET Votes=Votes+1 WHERE Id=?', [id], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};

app.listen(3000);
console.log('Rest Demo Listening on port 3000');
