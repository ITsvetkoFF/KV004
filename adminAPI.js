var mysql      = require('mysql');
var express    = require('express');
var app = express();

var connectionpool = mysql.createPool({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'enviromap',
    });
app.get('/not_aprooved', notAproovedProblems);
app.delete('/problem', deleteProblem);
app.delete('/user', deleteUser);
app.delete('/comment', deleteComment);
app.delete('/photo', deletePhoto);
app.put('/edit', editProblem);

function notAproovedProblems(req, res) {
connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',

				err:    err.code
			});
		} else {
            console.log("selectNotAproovedProblems - method works");
            var queryString='SELECT Id, Title FROM Problems WHERE Moderation IS NULL;';
            connection.query(queryString, function(err, rows, fields) {
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
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};
function deleteProblem(req, res) {
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
            var id=req.body.problem_id;
            connection.query('DELETE FROM Problems WHERE Id = ?', id, function(err, rows, fields) {
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
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};
function deleteUser(req, res) {
connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("deleteUser - method works");
            var id=req.body.user_id;
            connection.query('DELETE FROM Users WHERE Id = ?', id, function(err, rows, fields) {
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
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};
function deleteComment(req, res) {
connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("deleteComment - method works");
            var id=req.body.comment_id;
            connection.query('DELETE FROM Activities WHERE Id = ?', id, function(err, rows, fields) {
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
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};
function deletePhoto(req, res) {
connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("deletePhoto - method works");
            var id=req.body.photo_id;
            connection.query('DELETE FROM Photos WHERE Id = ?', id, function(err, rows, fields) {
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
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
};
function editProblem(req, res) {
connectionpool.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            console.log("editProblem - method works");
         var data = {
         	 Title : req.body.title,
             Content : req.body.content,
             Severity : req.body.severity,
             Moderation : req.body.moderation,
             ProblemStatus_Id : req.body.problemStatus_Id,
             ProblemTypes_Id : req.body.problemTypes_Id
         };
             var id = req.body.problem_id;

            connection.query("UPDATE Problems SET ? WHERE Id = ?", [data, id], function(err, rows, fields) {
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
