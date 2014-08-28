exports.getProblems = function(req,res){ // get all moderated problems in brief (id, title, coordinates, type)
	req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            connection.query('SELECT Id, Title, Latitude, Longtitude, ProblemTypes_Id FROM Problems WHERE Status=1', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    json:   rows,
                    length: rows.length
                });
            });
        }
    });
};

exports.getProblemId = function(req,res){ //get detailed problem description (everything)
	req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            var id = req.params.id;
            connection.query('SELECT * FROM Problems WHERE Id=?', [id], function(err1, rows1, fields1) {
                if (err1) {
                    console.error(err1);
                    res.statusCode = 500;
                    res.send({
                        result1: 'error',
                        err1:    err1.code
                    });  
                }
                connection.query('SELECT * FROM Photos WHERE Problems_Id=?', [id], function(err2, rows2, fields2) {
                    if (err2) {
                        console.error(err2);
                        res.statusCode = 500;
                        res.send({
                            result2: 'error',
                            err2:    err2.code
                        });  
                    }
                    connection.query('SELECT * FROM Activities WHERE Activities.Problems_Id=?', [id], function(err3, rows3, fields3) {
                        if (err3) {
                        console.error(err3);
                        res.statusCode = 500;
                        res.send({
                            result3: 'error',
                            err3:    err3.code
                            });  
                        }
                        res.send({
                            json: [rows1, rows2, rows3],
                        });
                    });
                });
            });
        }
    });
};

exports.getUserId = function(req,res){ //get all user's problems in brief (coords, type, title)
	req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            var idUser = req.params.idUser;
            connection.query('SELECT Problems.Id, Problems.Title, Problems.Latitude, Problems.Longtitude, Problems.ProblemTypes_Id FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id AND Users_Id = ?', [idUser], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    json:   rows,
                    length: rows.length
                });
            });
        }
    });
};

exports.getUserActivity = function(req,res){  //get user's activity list (everything)
	req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            var idUser = req.params.idUser;
            connection.query('SELECT Id, Content, Date, ActivityTypes_Id, Problems_Id FROM Activities WHERE Users_Id = ?', [idUser], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    json:   rows,
                    length: rows.length
                });
            });
        }
    });
};

exports.postProblem = function(req,res){  //post new problem
	req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
            // var data = {
            // 	Title 				: req.body.title,
            // 	Content 			: req.body.content,
            // 	Latitude 			: req.body.latitude,
            // 	Longtitude 			: req.body.longituge,
            // 	Status 	            : req.body.status,
            // 	ProblemTypes_Id 	: req.body.problemTypes_Id
            // };
            var data = {
            	Title 				: "Dump",
            	Content 			: "lol",
            	Latitude 	     	: "8",
            	Longtitude         	: "3",
            	Status 	            : "1",
            	ProblemTypes_Id 	: "1"
            };
            connection.query('INSERT INTO Problems SET ?', [data], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    json:   rows,
                    length: rows.length
                });
            });
        }
    });
};

exports.postVote = function(req,res){  //+1 vote for a problem
	req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
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
                    json:   rows,
                    length: rows.length
                });
            });
        }
    });
};

exports.logIn = function(req, res) {
    req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
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
    });       
}
  
exports.logOut = function(req, res) {
    req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
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
    });
}

exports.register = function(req, res) {
    req.getConnection(function(err, connection) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err:    err.code
			});
		} else {
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
    });  
};
//admin-------------------------------------------------------------------
exports.notApprovedProblems = function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            console.log("selectNotApprovedProblems - method works");
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
            });
        }
    });
};

exports.deleteProblem = function(req, res) {
    req.getConnection(function(err, connection) {
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
            });
        }
    });
};

exports.deleteUser = function(req, res) {
    req.getConnection(function(err, connection) {
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
            });
        }
    });
};

exports.deleteComment = function(req, res) {
    req.getConnection(function(err, connection) {
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
            });
        }
    });
};

exports.deletePhoto = function(req, res) {
    req.getConnection(function(err, connection) {
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
            });
        }
    });
};

exports.editProblem = function(req, res) {
    req.getConnection(function(err, connection) {
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
               Status : req.body.status,
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
        });
       }
   });
};
