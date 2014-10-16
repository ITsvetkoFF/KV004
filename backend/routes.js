var jwt          = require('jsonwebtoken'),
    crypto       = require('crypto'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    myConnection = require('express-myconnection'),
    secret = require('./config/secret'),
    mcapi = require('mailchimp-api');

    mc = new mcapi.Mailchimp('23740bea44a8cfd98fb228dd5691e2b5-us9');

    var mailchimpListID;
    mc.lists.list(function(data) {
        mailchimpListID = data.data[0].id;
    
        //look for all existing segments in the list
        mc.lists.segments({id:mailchimpListID}, function(data){
            console.log(data.static);
            for(var i=0;i<data.static.length;i++)
            console.log(data.static[i].name + ': ' +data.static[i].id);
        
        });

        //adding 7 segment for each type of problems - in development
        /*mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'newSegment1'}}, function(data){
            console.log('Segment was created!');

        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                
            } else {
                console.log('There was an error subscribing that user');
            }
        });*/
    });

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
            connection.query('SELECT Problems.Id, Problems.Title, Problems.Latitude, Problems.Longtitude, Problems.ProblemTypes_Id, Problems.Status, Activities.Date FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE Moderation=1 AND ActivityTypes_Id=1', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
};

exports.getProblemId = function(req,res){ //get detailed problem description (everything)
    console.log("get problems");
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
                        res.send([rows1, rows2, rows3]);
                    });
                });
            });
        }
    });
};

exports.getTitles = function(req,res){ //get titles of resources
    req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT Title, Alias, Id, IsResource FROM Resources', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
};

exports.getResource = function(req,res){ //get resourse
    console.log("get resource");
    req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            var name = req.params.name
            connection.query('SELECT * FROM Resources WHERE Alias = ?', name, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
};
exports.getUserById = function(req,res) { //get all user information(name and etc)
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
            connection.query('SELECT Users.Name, Users.Surname FROM Users WHERE Users.Id = ?', [idUser], function(err, rows, fields) {
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
}


exports.getUserProblemsById = function(req,res){ //get all user's problems in brief (coords, type, title)
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
            connection.query('SELECT Problems.Id, Problems.Title, Problems.Latitude, Problems.Longtitude, Problems.ProblemTypes_Id, Problems.Status FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE Activities.Users_Id = ?', [idUser], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
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
exports.addNewPhotos = function(req,res){
    req.getConnection(function(err,connection){
        if(err){
            console.log('Connection error: ',err);
            res.send({
                result:'error',
                err:err.code
            });
        }
        else{
            console.log(req.body);
            var i=0;
            var rows=[];
            console.log(req.body.solveProblemMark);
            if(req.body.description==undefined){
                req.body.description=[];
            }
            if(!Array.isArray(req.body.description)){
                console.log("!!!!");
                var temp=req.body.description;
                req.body.description=[];
                req.body.description.push(temp);
                
            }
            while (req.files['file[' + i + ']'] != undefined) {
                var photo_data = {
                    Link: req.files['file[' + i + ']'].name,
                    Status: req.body.solveProblemMark,
                    Description: req.body.description[i],
                    Problems_Id: req.params.id
                };

                connection.query('INSERT INTO Photos SET ?', [photo_data], function (err, row, fields) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err: err.code
                        });
                    }
                    rows.push(row);


                    var content ={
                        Content:"додав фото",
                        userName:req.body.userName
                    }
                    if(req.body.userId==undefined) {
                        content.Content="Фото додано анонімно";
                        content.userName="(Анонім)";
                        req.body.userId = 2;


                    }
                    var activityData = {
                        Content:JSON.stringify(content),
                        Date:new Date(),
                        ActivityTypes_Id:4,
                        Users_Id:req.body.userId,
                        Problems_Id:req.params.id
                    }

                    connection.query('INSERT INTO Activities SET ?',[activityData],function(err,rowsAcivity,fields){

                        if (err) {
                            console.error(err);
                            res.statusCode = 500;
                            res.send({
                                result: 'error',
                                err:    err.code
                            });
                        }
                    });



                });
                i++;
            }
            res.send({
                json:   rows,
                length: rows.length
            });

        }
    });
}
exports.addComment = function(req,res) {
    req.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {

        }
        var content ={
            Content:req.body.data.Content,
            userName:req.body.data.userName
        }
        if(req.body.data.userId==undefined) {
             content.userName="(Анонім)";
            req.body.userId = 2;


        }
        var activityData = {
            Content:JSON.stringify(content),
            //Content: "Корістувачь " + req.body.userName + " залишив коментар: "+req.body.Content,
            Date: new Date(),
            ActivityTypes_Id: 5,
            Users_Id: req.body.data.userId,
            Problems_Id: req.params.id
        };

        connection.query('INSERT INTO Activities SET ?', [activityData], function (err, rowsAcivity, fields) {

            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.send({
                    result: 'error',
                    err: err.code
                });
            }
            connection.query('SELECT * FROM Activities WHERE Activities.Problems_Id=?', [req.params.id], function(err3, rows3, fields3) {
                if (err3) {
                    console.error(err3);
                    res.statusCode = 500;
                    res.send({
                        result3: 'error',
                        err3:    err3.code
                    });
                }
                res.send([rows3]);
            });


        });
    });
}
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

            console.log(req.body);

            var data = {
                Title: req.body.title,
                Content: req.body.content,
                Latitude: req.body.latitude,
                Longtitude: req.body.longitude,
                Moderation:'1',
                Status: 0,
                ProblemTypes_Id: req.body.type,
                Votes:0
            };
                        if(req.body.userId==undefined){
                data.Moderation ='0';
            }


            connection.query('INSERT INTO Problems SET ?', [data], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }

                var i = 0;
                var content ={
                    Content:"додав проблему",
                    userName:req.body.userName
                }
                if(req.body.userId==undefined) {
                    content.Content="Проблему створено анонімно";
                    req.body.userId = 2;
                    content.userName="(Анонім)";



                }
                var activityData = {
                    Content:JSON.stringify(content),
                    Date:new Date(),
                    ActivityTypes_Id:1,
                    Users_Id:req.body.userId,
                    Problems_Id:rows.insertId
                };

                connection.query('INSERT INTO Activities SET ?',[activityData],function(err,rowsAcivity,fields){

                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                    if(req.body.description==undefined){
                        req.body.description=[];
                    }

                    while (req.files['file[' + i + ']'] != undefined) {
                        var photo_data = {
                            Link: req.files['file[' + i + ']'].name,
                            Status: 0,
                            Description: req.body.description[i],
                            Problems_Id: rows.insertId
                        };

                        connection.query('INSERT INTO Photos SET ?', [photo_data], function (err, rows, fields) {
                            if (err) {
                                console.error(err);
                                res.statusCode = 500;
                                res.send({
                                    result: 'error',
                                    err: err.code
                                });
                            }
                        });

                        i++;
                    }



                });



                res.send({
                    json:   rows,
                    length: rows.length
                });
            });
        }
    });
};
exports.postNews = function(req,res) {
    console.log("post news");
    req.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }


                console.log(req.body);

                var data = {

                    Content: req.body.news

                };

                connection.query('INSERT INTO News SET ?', [data], function (err, rows, fields) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err: err.code
                        });
                    }
                });
                res.send({
                    result: "ok"
                });
            });
        }

    });
}
exports.getNews = function(req,res) {
    req.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {

        }

        console.log(req.body);

        var data = {

            Content: req.body.news

        };

        connection.query('SELECT * FROM News ', function (err, rows, fields) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.send({
                    result: 'error',
                    err: err.code
                });
            }
            res.send({
               news:rows
            });
        });


    });
}

exports.clearNews = function(req,res) {
    req.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if (err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }


                console.log(req.body);

                var data = {

                    Content: req.body.news

                };

                connection.query('DELETE FROM News ', function (err, rows, fields) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err: err.code
                        });
                    }
                    res.send({
                        news: rows
                    });
                });
            });
        }


    });
}
exports.clearOneNews = function(req,res) {
    req.getConnection(function (err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if (err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }else {

                    console.log(req.body.id);

                    connection.query('DELETE FROM News WHERE Content=?', req.body.content, function (err, rows, fields) {
                        if (err) {
                            console.error(err);
                            res.statusCode = 500;
                            res.send({
                                result: 'error',
                                err: err.code
                            });
                        }
                        res.send({
                            news: rows
                        });
                    });
                }
            });
        }
    });
}
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
            var problemId = req.body.idProblem;
            var userId = req.body.userId;
            console.log(req.body.userId);
            connection.query('UPDATE Problems SET Votes=Votes+1 WHERE Id=?', [problemId], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                var content ={
                    Content:"додав голос",
                    userName:req.body.userName
                }
                if(req.body.userId==undefined) {
                    content.Content="Голос додано анонімно";
                    userId = 2;
                    content.userName="(Анонім)";


                }

                var activityData = {
                    Content: JSON.stringify(content),
                    Date: new Date(),
                    ActivityTypes_Id: 3,
                    Users_Id: userId,
                    Problems_Id: problemId
                }

                connection.query('INSERT INTO Activities SET ?',[activityData],function(err,rowsAcivity,fields){

                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }


                });

                res.send({
                    json:   rows,
                    length: rows.length,
                    fields:fields


                });

            });
        }
    });
};
exports.logIn = function(req, res) {
    console.log("email is - " + req.body.email + ", pass is - " +req.body.password);
    req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            console.log('Request: ' + req.body.email);
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

exports.register = function (req, res) {
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
            userData.name = req.body.first_name||'';
            userData.surname = req.body.last_name||'';
            userData.email = req.body.email||'';
            userData.password = req.body.password||'';
            userData.userRoles_Id = 2;

            if (userData.name === '' || userData.surname === '' || userData.email === '' || userData.password === '') {
               return res.send(401);
            }

            userData.password = crypto.createHmac("sha1", secret.secretToken).update(userData.password).digest("hex");

            connection.query("select Id from Users where Email like ?", userData.email, function(err, result) {

        //todo: send only message (status=200), that user exists
        
            if(result.length !== 0) {
                return res.send(400);
            }
            var mcReq = {
                id: mailchimpListID,
                email: { email: userData.email },
                merge_vars: {
                    EMAIL: userData.email,
                    FNAME: userData.name,
                    LNAME: userData.surname
                }, double_optin: false
            };

            console.log('MailChimp List ID is: ' + mailchimpListID);
            mc.lists.subscribe(mcReq, function(data) {
              console.log('User with email ' + req.body.email + ' subscribed successfully!');
            },
            function(error) {
              if (error.error) {
                console.log(error.code + ": " + error.error);
              } else {
                console.log('There was an error subscribing that user');
              }
            });

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
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                connection.query('SELECT Problems.Id, Problems.Title, Problems.Latitude, Problems.Longtitude, Activities.Date FROM Problems JOIN Activities ON Problems.Id = Activities.Problems_Id WHERE Moderation =0;', function(err, rows, fields) {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.send({
                            result: 'error',
                            err:    err.code
                        });
                    }
                        res.send(rows);
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
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            };
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                var id=req.params.id;
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
            });
        }
    });
};

exports.approveProblem = function(req, res) {
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
                token = req.cookies.token;
            } else {
                return res.send(401);
            };
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                var id=req.params.id;
                connection.query('UPDATE Problems SET Moderation=1 WHERE Id = ?', id, function(err, rows, fields) {
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
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                var id=req.params.id;
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
            console.log("req.body.id"+req.body.id);
            console.log("req.params.id"+req.params.id)
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }else {

                    connection.query('DELETE FROM Activities WHERE Id = ?', req.params.id, function (err, rows, fields) {
                        if (err) {
                            console.error(err);
                            res.statusCode = 500;
                            res.send({
                                result: 'error',
                                err: err.code
                            });
                        }

                        res.send({
                            result: 'success'

                        });

                    });
                }
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
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }

            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                var id=req.params.id;
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
            var token;
            if(req.cookies.token) {
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                var data = {
             Title : req.body.Title,
             Content : req.body.Content,
             Severity : req.body.Severity,
             //ProblemTypes_Id : req.body.problemTypes_Id,
                    //Moderation : req.body.moderation,
             Status : req.body.ProblemStatus
                };
            var id = req.params.id;
                console.log("id="+id);
                console.log('data=' + data);
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
            });
        }
    });
};
exports.addResource = function(req, res) {
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
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                var data = {
            Title: req.body.Title,
            Content: req.body.Content,
            Alias: req.body.Alias,
            IsResource: req.body.IsResource
        };
        connection.query("INSERT INTO Resources SET ?", data, function(err, rows, fields) {
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
                        err:    ''
                    });
                    });
            });
        }
    });
};
exports.editResource = function(req, res) {
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
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
                var data = {
            Alias: req.body.Alias,
            Title: req.body.Title,
            Content: req.body.Content,
            IsResource: req.body.IsResource
                };
                var Id = req.params.id
        connection.query("UPDATE Resources SET ? WHERE Id = ?", [data, Id], function(err, rows, fields) {
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
                        err:    ''
                    });
                    });
            });
        }
    });
};
exports.deleteResource = function(req, res) {
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
                token = req.cookies.token;
            } else {
                return res.send(401);
            }
            jwt.verify(token, secret.secretToken, function(err, decoded) {
                if(err) {
                    return res.send(401);
                }
                if (decoded.role != 'administrator') {
                    return res.send(401);
                }
            var Id = req.params.id
        connection.query("DELETE FROM Resources WHERE Id = ?", Id, function(err, rows, fields) {
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
                        err:    ''
                    });
                    });
            });
        }
    });
};
exports.getStats1 = function (req, res) {
     req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            var val
                switch(req.params.val){
        case "D": val = "%Y-%m-%d";
            break;
        case "W": val = "%Y-%v";
            break;
        case "M": val = "%Y-%m";
            break;
        };
            connection.query('SELECT count(Id) as value, DATE_FORMAT(Date,'+ '"' + val + '"' +') as date FROM Activities where ActivityTypes_Id = 1 GROUP BY DATE_FORMAT(Date,'+ '"' + val + '"' +');', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
}
exports.getStats2 = function (req, res) {
     req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            var val
                switch(req.params.val){
        case "Y": val = "YEAR";
            break;
        case "W": val = "WEEK";
            break;
        case "M": val = "MONTH";
            break;
        };
            connection.query('SELECT Problems.ProblemTypes_Id as id, count(Problems.Id) as value FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE (Activities.ActivityTypes_Id = 1) AND (' + val + '(Activities.Date) = '+ val +'(NOW()) ) GROUP BY Problems.ProblemTypes_Id;', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
}
exports.getStats3 = function (req, res) {
     req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT Problems.Status as status, count(Problems.Id) as value FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE Activities.ActivityTypes_Id = 1 GROUP BY Problems.Status;', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
    }
exports.getStats4 = function (req, res) {
     req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT Problems.ProblemTypes_Id as id, SUM(Problems.Votes) as value FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE Activities.ActivityTypes_Id = 1 GROUP BY Problems.ProblemTypes_Id;', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
    }
exports.getStats5 = function (req, res) {
     req.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            var val
                switch(req.params.val){
        case "D": val = "%Y-%m-%d";
            break;
        case "W": val = "%Y-%v";
            break;
        case "M": val = "%Y-%m";
            break;
        };
            connection.query('SELECT count(Id) as value, DATE_FORMAT(Date,'+ '"' + val + '"' +') as date FROM Activities where ActivityTypes_Id = 3 GROUP BY DATE_FORMAT(Date,'+ '"' + val + '"' +');', function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send(rows);
            });
        }
    });
}