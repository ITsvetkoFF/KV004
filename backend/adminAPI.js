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
app.delete('/delete_problem', deleteProblem);
app.delete('/delete_user', deleteUser);
app.delete('/delete_comment', deleteComment);
app.put('/edit_problem', editProblem);

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
            var queryString='SELECT Id, Title FROM Problems WHERE Moderation=0;';
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
            var id=req.body.Problem_id;
            connection.query('DELETE FROM Problems WHERE Id=' + id, function(err, rows, fields) {
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
            connection.query('DELETE FROM Users WHERE Id=' + id, function(err, rows, fields) {
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
            connection.query('DELETE FROM Activities WHERE Id=' + id, function(err, rows, fields) {
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
         var title = req.body.title,
             content = req.body.content,
             severity = req.body.severity,
             moderation = req.body.moderation,
             ProblemStatus_Id = req.body.ProblemStatus_Id,
             ProblemTypes_Id = req.body.ProblemTypes_Id,
             id = req.body.id;
            connection.query("UPDATE Problems SET Title="+ "\'" + title + "\'" + " , Content=" + "\'" + content + "\'" + " , Severity=" + severity+ ", Moderation="+ moderation +" , ProblemStatus_Id="+ProblemStatus_Id+", ProblemTypes_Id="+ProblemTypes_Id+ " WHERE Id="+id+";", function(err, rows, fields) {
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
