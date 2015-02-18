var jwt          = require('jsonwebtoken'),
    crypto       = require('crypto'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    myConnection = require('express-myconnection'),
    secret = require('./config/secret'),
    fs = require('fs'),
    location = require('./config.js'),
    mcapi = require('mailchimp-api'),
    mandrill = require('mandrill-api/mandrill'),
    generatePassword = require('password-generator');

    /*
    mc = new mcapi.Mailchimp('key');
    var mandrill_client = new mandrill.Mandrill('id');

    var mailchimpListID, segments = {};

    //server's call about who is connected through mandrill
    mandrill_client.users.info({}, function(result) {
        console.log('Mandrill account connected to user: '+result.username);

    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Invalid_Key - Invalid API key
    });



    mc.lists.list({filters:{list_name: 'All list'}}, function(data) {
        mailchimpListID = data.data[0].id;
    
        
        //adding 7 segments for each type of problems - in development
        //segment forest problems
        mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'Forest problems'}}, function(data){
            console.log('Segment was created!');

        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                            
            } else {
                console.log('There was an error subscribing that user');
            }
        });
        //segment garbage landfills
        mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'Garbage landfills'}}, function(data){
            console.log('Segment was created!');
        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                
            } else {
                console.log('There was an error subscribing that user');
            }
        });
        //segment illegal construction
        mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'Illegal construction'}}, function(data){
            console.log('Segment was created!');
        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                
            } else {
                console.log('There was an error subscribing that user');
            }
        });
        //segment waterbody problems
        mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'Waterbody problems'}}, function(data){
            console.log('Segment was created!');
        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                
            } else {
                console.log('There was an error subscribing that user');
            }
        });
        //segment biodiversity threat
        mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'Biodiversity threat'}}, function(data){
            console.log('Segment was created!');
        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                
            } else {
                console.log('There was an error subscribing that user');
            }
        });
        //segment illegal hunting
        mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'Illegal hunting'}}, function(data){
            console.log('Segment was created!');
        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                
            } else {
                console.log('There was an error subscribing that user');
            }
        });
        //segment other problems
        mc.lists.segmentAdd({id: mailchimpListID, opts:{type:'static',name:'Other problems'}}, function(data){
            console.log('Segment was created!');
        }, 
        function(error) {
            if (error.error) {
                console.log(error.code + ": " + error.error);
                
            } else {
                console.log('There was an error subscribing that user');
            }
        });

        //look for all existing segments in the list
        mc.lists.segments({id:mailchimpListID}, function(data){
            
            for(var i=0;i<data.static.length;i++){
                switch(data.static[i].name){
                    case 'Forest problems':
                        segments['1'] = data.static[i].id;
                        break;
                    case 'Garbage landfills':
                        segments['2'] = data.static[i].id;
                        break;
                    case 'Illegal construction':
                        segments['3'] = data.static[i].id;
                        break;
                    case 'Waterbody problems':
                        segments['4'] = data.static[i].id;
                        break;
                    case 'Biodiversity threat':
                        segments['5'] = data.static[i].id;
                        break;
                    case 'Illegal hunting':
                        segments['6'] = data.static[i].id;
                        break;
                    case 'Other problems':
                        segments['7'] = data.static[i].id;
                        break;
                    default:
                        break;
                }
            }
        });
    });*/

exports.getProblems = function(req,res){ // get all moderated problems in brief (id, title, coordinates, type)
    console.log("start to get information about all moderated problems");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 500;
            res.send({
                err: err.code
            });
            console.log('Can`t connect to db in getProblems API call\n' + err +"\n");
        } else {
            try{
                connection.query('SELECT Problems.Id, Problems.Title, Problems.Latitude, Problems.Longtitude, Problems.ProblemTypes_Id, Problems.Status, Activities.Date FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE Moderation=1 AND ActivityTypes_Id=1', function(err, rows, fields) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err: err.code
                        });
                        console.error('Can`t make request to Problems db\n', err);
                    } else {
                        res.send(rows);
                        console.log("end to get information about all moderated problems \n");
                    }
                });
            }
            catch(err){
                console.log("Can`t make query for getProblems \n");
            }
        }
    });
};

exports.getProblemId = function(req,res){ //get detailed problem description (everything)
    console.log("start to get information about problem  with id:" + req.params.id);
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getProblemId API call\n' + err +"\n");
        } else {
            var id = req.params.id ;
                connection.query('SELECT * FROM Problems WHERE Id=?', [id], function(err1, rows1) {
                    if (err1) {
                        console.log('Can`t make SELECT request to Problems db with id=' + id +'\n' + err1);
                        res.statusCode = 500;
                        res.send({
                            err1: err1.code
                        });
                    }
                    if (rows1.length == 0) {
                        res.send({
                            error: "there is no problem with id:" + id
                        });
                        console.log("there is no problem with id:" + id);
                    }else{
                        connection.query('SELECT * FROM Photos WHERE Problems_Id=?', [id], function (err2, rows2) {
                            if (err2) {
                                console.error('Can`t make query\n', err2);
                                res.statusCode = 500;
                                res.send({
                                    err2: err2.code
                                });
                            }
                            if (rows2.length == 0) {
                                console.log("there is no photos referring to problem with id:" + id);
                            }
                            connection.query('SELECT * FROM Activities WHERE Activities.Problems_Id=?', [id], function (err3, rows3) {
                                if (err3) {
                                    console.error('Can`t make query\n', err3);
                                    res.statusCode = 500;
                                    res.send({
                                        err3: err3.code
                                    });
                                }
                                if (rows3.length == 0) {
                                    console.log("there is no Activities referring to problem with id:" + id);
                                }
                                try {
                                    res.send([rows1, rows2, rows3]);
                                    console.log("end of query to get information about problem  with id:" + req.params.id + '\n');
                                }
                                catch(err) {
                                    console.log('Can`t send information to client' + err + '\n');
                                }
                            });
                        });
                    }
            });
        }
    });
};

exports.getTitles = function(req,res){ //get titles of resources
    console.log("start getTitles API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:err.code
            });
            console.log('Can`t connect to db in getTitles API call\n' + err +"\n");
        } else {
            try {
                connection.query('SELECT Title, Alias, Id, IsResource FROM Resources', function(err, rows) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err:err.code
                        });
                        console.error('Can`t make query\n', err);
                    }else{
                        if (rows.length == 0) {
                            res.statusCode = 404;
                            console.log("Title, Alias, Id, IsResource are empty");
                        }else{
                            res.statusCode = 200;
                            res.send(rows);
                            console.log("end getTitles API function");
                        }
                    }
                });
            }
            catch(err) {
                console.log('Can`t send information to client' + err + '\n');
            }
        }
    });
};

exports.getResource = function(req,res){ //get resourse
    console.log("start getResource API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getResource API call\n' + err +"\n");
        } else {
            try{
                var name = req.params.name;
                connection.query('SELECT * FROM Resources WHERE Alias = ?', name, function(err, rows) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err: err.code
                        });
                        console.error('Can`t make query for Alias name= '+ name +'\n' + err +"\n");
                    } else {
                        if (rows.length == 0){
                            console.log("there are no any resources for Alias = " + name + '\n');
                        } else {
                            res.send(rows);
                            console.log("end getResource API function");
                        }
                    }
                });
            }
            catch(err){
                console.log('Can`t send information to client getResource API' + err + '\n');
            }
        }
    });
};

exports.getUserById = function(req,res) { //get all user information(name and etc)
    console.log("start getUserById API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getUserById API call\n' + err +"\n");
        } else {
            var idUser = req.params.idUser;
            connection.query('SELECT Users.Name, Users.Surname FROM Users WHERE Users.Id = ?', [idUser], function(err, rows) {
                if (err) {
                    res.statusCode = 500;
                    res.send({
                        err:    err.code
                    });
                    console.error('Can`t make query for Users.Id = '+ idUser +'\n' + err +"\n");
                }
                if(rows.length == 0) {
                    console.log("there is no User info for id = " + idUser + '\n');
                }
                try{
                    res.send({
                        json:   rows,
                        length: rows.length
                    });
                    console.log("end getUserById API function");
                }
                catch(err){
                    console.log('Can`t send information to client in getUserById API' + err + '\n');
                }
            });
        }
    });
};

exports.getUserProblemsById = function(req,res){ //get all user's problems in brief (coords, type, title)
    console.log("start getUserProblemsById API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getUserProblemsById API call\n' + err +"\n");
        } else {
            var idUser = req.params.idUser;
            connection.query('SELECT Problems.Id, Problems.Title, Problems.Latitude, Problems.Longtitude, Problems.ProblemTypes_Id, Problems.Status, Activities.Date FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE Activities.Users_Id = ?', [idUser], function(err, rows) {
                if (err) {
                    res.statusCode = 500;
                    res.send({
                        err:    err.code
                    });
                    console.error('Can`t make query for Users.Id = '+ idUser +'\n' + err +"\n");
                }
                if(rows.length == 0){
                    console.log('there is no User problems for id = ' + idUser + '\n')
                }
                try{
                    res.send(rows);
                    console.log("end getUserProblemsById API function");
                }
                catch(err){
                    console.log('Can`t send information to client in getUserProblemsById API'  + err + '\n');
                }
            });
        }
    });
};

exports.getUserActivity = function(req,res){  //get user's activity list (everything)
    console.log("start getUserActivity API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getUserActivity API call\n' + err +"\n");
        } else {
            var idUser = req.params.idUser;
            connection.query('SELECT Id, Content, Date, ActivityTypes_Id, Problems_Id FROM Activities WHERE Users_Id = ?', [idUser], function(err, rows) {
                if (err) {
                    res.statusCode = 500;
                    res.send({
                        err:    err.code
                    });
                    console.error('Can`t make query for Id = '+ idUser +'\n' + err +"\n");
                }
                if(rows.length == 0){
                    console.log('there is no User activity for Id = ' + idUser + '\n')
                }
                try{
                    res.send({
                        json:   rows,
                        length: rows.length
                    });
                    console.log("end getUserActivity API function");
                }
                catch(err){
                    console.log('Can`t send information to client in getUserActivity API'  + err + '\n');
                }
            });
        }
    });
};

exports.addNewPhotos = function(req,res){
    console.log("start addNewPhotos API function");
    req.getConnection(function(err,connection){
        if(err){
            res.send({
                err:err.code
            });
            console.log('Can`t connect to db in addNewPhotos API call\n' + err +"\n");
        }
        else{
            try{
                var i=0;
                var rows=[];
                 if(req.body.solveProblemMark=="on"){
                    req.body.solveProblemMark=1;
                }else{
                    req.body.solveProblemMark=0;
                }
                if(req.body.description==undefined){
                    req.body.description=[];
                }
                if(!Array.isArray(req.body.description)){
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

                    connection.query('INSERT INTO Photos SET ?', [photo_data], function (err, row) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err: err.code
                            });
                            console.error('Can`t make INSERT query for photo_data = '+ photo_data +'\n' + err +"\n");
                        }
                        rows.push(row);
                        var content ={
                            Content:"додав фото",
                            userName:req.body.userName,
                            userSurname:req.body.userSurname
                        };
                        if(req.body.userId==undefined) {
                            content.Content="Фото додано анонімно";
                            content.userName="(Анонім)";
                            req.body.userId = 2;
                        }
                        var activityData = {
                            Content:JSON.stringify(content),
                            Date:new Date((new Date()).getTime()+2*60*60*1000),
                            ActivityTypes_Id:4,
                            Users_Id:req.body.userId,
                            Problems_Id:req.params.id
                        };
                        connection.query('INSERT INTO Activities SET ?',[activityData],function(err,rowsAcivity,fields){
                            if (err) {
                                console.error('Can`t make INSERT query for activityData = '+ activityData +'\n' + err +"\n");
                                res.statusCode = 500;
                                res.send({
                                    err:    err.code
                                });
                            }
                        });
                    });
                    i++;
                }
            }
            catch (err) {
                console.log('Error in Photos API call\n' + err +"\n");
            }
            try{
                res.send({
                    json:   rows,
                    length: rows.length
                });
                console.log("end addNewPhotos API function");
            }
            catch(err){
                console.log('Can`t send information to client in addNewPhotos API' + err + '\n');
            }
        }
    });
};


exports.postProblem = function(req,res){  //post new problem
    console.log("start postProblem  API function");
    /*for (var prop in segments)
        console.log("We have those segments"+prop);
    
    function addEmailToSegment(problemType, userEmail){
        console.log(problemType, userEmail);
        console.log('mailchimpID: ' + mailchimpListID+ '. Problem type: ' + segments[problemType] + '. Email: ' + userEmail);
        mc.lists.staticSegmentMembersAdd({id:mailchimpListID, seg_id:segments[problemType],batch:[{email:userEmail}]});
    };*/
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in postProblem API call\n' + err +"\n");
        } else {
            try {
                var data = {
                    Title: req.body.title,
                    Content: req.body.content,
                    Proposal: req.body.proposal,
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
                else {
                    var idUser = req.body.userId;
                    console.log(idUser);
                    connection.query('SELECT Users.Email FROM Users WHERE Users.Id = ?', [idUser], function(err, rows, fields) {
                        if (err) {
                            console.error(err);
                        }
                        else { 
                            console.log('no errors');
                            console.log(rows[0].Email);
                            //addEmailToSegment(req.body.type, rows[0].Email);
                        }
                    });
                };
                
                connection.query('INSERT INTO Problems SET ?', [data], function(err, rows) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err:    err.code
                        });
                        console.error('Can`t make query for  data  = '+ JSON.stringify(data) +'\n' + err +"\n");
                    }else{
                        var i = 0;
                        var content ={
                            Content:"додав проблему",
                            userName:req.body.userName,
                            userSurname:req.body.userSurname

                        };
                        if(req.body.userId==undefined) {
                            content.Content="Проблему створено анонімно";
                            req.body.userId = 2;
                            content.userName="(Анонім)";
                        }
                        var activityData = {
                            Content:JSON.stringify(content),
                            Date:new Date((new Date()).getTime()+2*60*60*1000),
                            ActivityTypes_Id:1,
                            Users_Id:req.body.userId,
                            Problems_Id:rows.insertId
                        };
                        connection.query('INSERT INTO Activities SET ?',[activityData],function(err){

                            if (err) {
                                res.statusCode = 500;
                                res.send({
                                    err:    err.code
                                });
                                console.error('Can`t make query for activityData = '+ activityData +'\n' + err +"\n");
                            }
                            if(req.body.description==undefined){
                                req.body.description=[];
                            }
                            if(!Array.isArray(req.body.description)){
                                var temp=req.body.description;
                                req.body.description=[];
                                req.body.description.push(temp);

                            }
                            while (req.files['file[' + i + ']'] != undefined) {
                                var photo_data = {
                                    Link: req.files['file[' + i + ']'].name,
                                    Status: 0,
                                    Description: req.body.description[i],
                                    Problems_Id: rows.insertId
                                };
                                connection.query('INSERT INTO Photos SET ?', [photo_data], function (err) {
                                    if (err) {
                                        res.statusCode = 500;
                                        res.send({
                                            err: err.code
                                        });
                                        console.error('Can`t make query for photo_data = '+ photo_data +'\n' + err +"\n");
                                    }
                                });
                                i++;
                            }
                        });

                        res.send({
                            json:   rows,
                            length: rows.length
                        });
                        console.log("end postProblem  API function");
                    }

                });
            }
            catch(err){
                console.log('Can`t make query to db in postProblem API' + err + '\n');
            }
        }
    });
};

exports.postNews = function(req,res) {
    console.log("start postNews  API function");
    req.getConnection(function (err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err: err.code
            });
            console.log('Can`t connect to db in postNews API call\n' + err +"\n");
        } else {
            try{
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
                        Content: req.body.news
                    };
                    connection.query('INSERT INTO News SET ?', [data], function (err, rows, fields) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err: err.code
                            });
                            console.error('Can`t make query for data = '+ data +'\n' + err +"\n");
                        }
                    });
                    res.send({
                        result: "ok"
                    });
                    console.log("end postProblem API function");
                });
            }catch(err){
                console.log('Can`t make query to db in postProblem API' + err + '\n');
            }
        }
    });
};

exports.getNews = function(req,res) {
    console.log("start getNews API function");
    req.getConnection(function (err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err: err.code
            });
            console.log('Can`t connect to db in getUserActivity API call\n' + err +"\n");
        } else {
            try{
                connection.query('SELECT * FROM News ', function (err, rows) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err: err.code
                        });
                        console.error('Can`t make query in getNews' + '\n' + err +"\n");
                    }
                    res.send({
                        news: rows
                    });
                    console.log("end getNews API function");
                });
            }
            catch(err){
                console.log('Can`t send information to client in getNews API' + err + '\n');
            }
        }

        console.log(req.body);

        var data = {
            Content: req.body.news
        };

    });
};

exports.clearNews = function(req,res) {
    console.log("start clearNews API function");
    req.getConnection(function (err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err: err.code
            });
            console.log('Can`t connect to db in clearNews API call\n' + err +"\n");
        } else {
            try{
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
                    var data = {
                        Content: req.body.news
                    };
                    connection.query('DELETE FROM News ', function (err, rows) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err: err.code
                            });
                            console.log('Can`t connect to db in clearNews API for data =' + data + '\n' + err +"\n");
                        }
                        res.send({
                            news: rows
                        });
                        console.log("end getNews API function");
                    });
                });
            }
            catch(err){
                console.log('Can`t send information to client in getNews API' + err + '\n');
            }
        }
    });
};

exports.clearOneNews = function(req,res) {
    console.log("end clearOneNews API function");
    req.getConnection(function (err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err: err.code
            });
            console.log('Can`t connect to db in clearOneNews API call\n' + err +"\n");
        } else {
            try {
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
                        connection.query('DELETE FROM News WHERE Content=?', req.body.content, function (err, rows, fields) {
                            if (err) {
                                res.statusCode = 500;
                                res.send({
                                    err: err.code
                                });
                                console.error('Can`t make query for content = '+ req.body.content +'\n' + err +"\n");
                            }
                            res.send({
                                news: rows
                            });
                            console.log("end clearOneNews API function");
                        });
                    }
                });
            }
            catch(err){
                console.log('Can`t send information to client in clearOneNews API '+'\n' + err +"\n");
            }
        }
    });
};

exports.postVote = function(req,res){  //+1 vote for a problem
    console.log("end postVote API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in postVote API call\n' + err +"\n");
        } else {
            try{
                var problemId = req.body.idProblem;
                var userId = req.body.userId;
                console.log(req.body.userId);
                connection.query('UPDATE Problems SET Votes=Votes+1 WHERE Id=?', [problemId], function(err, rows, fields) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err:    err.code
                        });
                        console.error('Can`t make query for problemId = '+ problemId +'\n' + err +"\n");
                    }
                    var content ={
                        Content:"додав голос",
                        userName:req.body.userName,
                        userSurname:req.body.userSurname

                    };
                    if(req.body.userId==undefined) {
                        content.Content="Голос додано анонімно";
                        userId = 2;
                        content.userName="(Анонім)";
                    }
                    var activityData = {
                        Content: JSON.stringify(content),
                        Date: new Date((new Date()).getTime()+2*60*60*1000),
                        ActivityTypes_Id: 3,
                        Users_Id: userId,
                        Problems_Id: problemId
                    };
                    connection.query('INSERT INTO Activities SET ?',[activityData],function(err,rowsAcivity,fields){
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.error('Can`t make query for activityData= '+ activityData +'\n' + err +"\n");
                        }
                        else {
                            res.send({
                        json:   rows,
                        length: rows.length,
                        fields:fields
                    });
                        }
                    });
                    console.log("end postVote API function");
                });
            }
            catch(err){
                console.log('Can`t send information to client in postVote API '+'\n' + err +"\n");
            }
        }
    });
};
exports.logIn = function(req, res) {
    console.log("start getUserActivity API function");
    //console.log("email is - " + req.body.email + ", pass is - " +req.body.password);
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getUserActivity API call\n' + err +"\n");
        } else {
            try{
                //console.log('Request: ' + req.body.email);
                var email = req.body.email||'',
                    password = req.body.password||'';
                if (email === '' || password === '') {
                    return res.send(401);
                }
                password = crypto.createHmac("sha1", secret.secretToken).update(password).digest("hex");
                var userData = {};
                connection.query("select Users.Id, Users.Name, Users.Surname, Users.Email, UserRoles.Role from Users left join UserRoles on Users.UserRoles_Id = UserRoles.Id where Email like  '" + email + "' and Password like '" + password + "'", function(err, result) {
                    if(err){
                        console.error('Can`t make query for login = ' + '\n' + err +"\n");
                    }

                    if(result.length === 0) {
                        return res.send(400);
                    }
                    userData.id = result[0].Id;
                    userData.name = result[0].Name;
                    userData.surname = result[0].Surname;
                    userData.role = result[0].Role;
                    userData.token = jwt.sign(userData, secret.secretToken);
                    userData.email = result[0].Email;
                    return res.json(userData);
                });
                console.log("end logIn API function");
            }
            catch(err){
                console.log('Can`t login');
            }
        }
    });
};

exports.logOut = function(req, res) {
    console.log("start logOut API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in LogOut API call\n' + err +"\n");
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
            console.log("end logOut API function");
        }
    });
};

exports.register = function (req, res) {
    console.log("start register API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in register API call\n' + err +"\n");
        } else {
            try{
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
                        if (err) {
                            res.statusCode = 503;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t connect to db in register API call userData' + userData + '\n' + err +"\n");
                        } else {
                            userData.id = recordId;
                            userData.role = 'user';
                            delete userData.email;
                            delete userData.password;
                            userData.token = jwt.sign(userData, secret.secretToken);
                            return res.json(userData);
                            console.log("end logOut API function");
                        }
                    })
                });
            }
            catch(err){
                console.log('Can`t execute register API');
            }
        }
    })
};




//admin-------------------------------------------------------------------
exports.notApprovedProblems = function(req, res) {
    console.log("start notApprovedProblems API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getUserActivity API call\n' + err +"\n");
        } else {
            try{
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
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for moderation = 0 '+'\n' + err +"\n");
                        }
                        res.send(rows);
                        console.log("end notApprovedProblems API function");
                    });
                });
            }
            catch(err){
                console.log('Can`t execute notApprovedProblems API');
            }
        }
    });
};

exports.deleteProblem = function(req, res) {
    console.log("start deleteProblem API function");
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in deleteProblem API call\n' + err +"\n");
        } else {
            try{
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
                    connection.query('DELETE FROM Problems WHERE Id = ?', id, function(err, rows, fields) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for id =  '+ id +'\n' + err +"\n");
                        }
                        res.send({
                            result: 'success',
                            err:    '',
                            json:   rows,
                            length: rows.length
                        });
                        console.log('end deleteProblem API function');
                    });
                });
            }
            catch(err){
                console.log('Can`t execute deleteProblem API');
            }
        }
    });
};

exports.approveProblem = function(req, res) {
    console.log('start approveProblem API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in approveProblem API call\n' + err +"\n");
        } else {
            try{
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
                    connection.query('UPDATE Problems SET Moderation=1 WHERE Id = ?', id, function(err, rows) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for id =  '+ id +'\n' + err +"\n");
                        }else{
                            res.send({
                                result: 'success',
                                err:    '',
                                json:   rows,
                                length: rows.length
                            });
                            console.log('end approveProblem API function');
                        }
                    });
                });
            }
            catch(err){
                console.log('Can`t execute approveProblem API');
            }
        }
    });
};

exports.deleteUser = function(req, res) {
    console.log('start deleteUser API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in approveProblem API call\n' + err +"\n");
        } else {
            try{
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
                    connection.query('DELETE FROM Users WHERE Id = ?', id, function(err, rows) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for id =  '+ id +'\n' + err +"\n");
                        }else{
                            res.send({
                                result: 'success',
                                err:    '',
                                json:   rows,
                                length: rows.length
                            });
                            console.log('end deleteUser API function');
                        }
                    });
                });
            }
            catch(err){
                console.log('Can`t execute deleteUser API');
            }
        }
    });
};

exports.deleteComment = function(req, res) {
    console.log('start deleteComment API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in deleteComment API call\n' + err +"\n");
        } else {
            try{
                //console.log("req.body.id"+req.body.id);
                //console.log("req.params.id"+req.params.id)
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
                        connection.query('DELETE FROM Activities WHERE Id = ?', req.params.id, function (err) {
                            if (err) {
                                res.statusCode = 500;
                                res.send({
                                    err: err.code
                                });
                                console.log('Can`t make query for id =  '+ id +'\n' + err +"\n");
                            }else{
                                res.send({
                                    result: 'success'
                                });
                                console.log('end deleteComment API function');
                            }
                        });

                    }
                });
            }
            catch(err){
                console.log('Can`t execute deleteComment API');
            }
        }
    });
};
exports.deletePhoto = function(req, res) {
    console.log('start deletePhoto API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in deletePhoto API call\n' + err +"\n");
        } else {
            try{
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
                    connection.query('DELETE FROM Photos WHERE Link = ?', req.params.link, function(err, rows) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for id =  '+ id +'\n' + err +"\n");
                        }else{
                            res.send({
                                result: 'success',
                                err:    '',
                                json:   rows,
                                length: rows.length
                            });
                            console.log('end deletePhoto API function');
                            fs.unlink(location+"photos/large/"+req.params.link, function(){});
                        }
                    });
                });
            }
            catch(err){
                console.log('Can`t execute deletePhoto API');
            }
        }
    });
};

exports.editProblem = function(req, res) {
    console.log('start editProblem API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in editProblem API call\n' + err +"\n");
        } else {
            try{
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
                        Proposal : req.body.Proposal,
                        //ProblemTypes_Id : req.body.problemTypes_Id,
                        //Moderation : req.body.moderation,
                        Status : req.body.ProblemStatus
                    };
                    console.log(data.Proposal);
                    var id = req.params.id;
                    //console.log("id="+id);
                    //console.log('data=' + data);
                    connection.query("UPDATE Problems SET ? WHERE Id = ?", [data, id], function(err, rows, fields) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for data='+data+' for id = '+ id +'\n' + err +"\n");
                        }else{
                            res.send({
                                result: 'success',
                                err:    '',
                                json:   rows,
                                length: rows.length
                            });
                            console.log('end editProblem API function');
                        }
                    });
                });
            }
            catch(err){
                console.log('Can`t execute editProblem API');
            }
        }
    });
};
exports.addResource = function(req, res) {
    console.log('start addResource API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in addResource API call\n' + err +"\n");
        } else {
            try{
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
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for data='+data+'\n' + err +"\n");
                        }
                        else {
                            res.send({
                            result: 'success',
                                err:    ''
                            });
                        }
                        console.log('end addResource API function');
                    });
                });
            }
            catch(err){
                console.log('Can`t execute addResource API');
            }
        }
    });
};
exports.editResource = function(req, res) {
    console.log('start editResource API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in editResource API call\n' + err +"\n");
        } else {
            try{
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
                    connection.query("UPDATE Resources SET ? WHERE Id = ?", [data, Id], function(err) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for id='+Id+'\n' + err +"\n");
                        }else{
                            res.send({
                                result: 'success',
                                err:    ''
                            });
                            console.log('end editResource API function');
                        }
                    });
                });
            }
            catch(err){
                console.log('Can`t execute editResource API');
            }
        }
    });
};
exports.deleteResource = function(req, res) {
    console.log('start deleteResource API function');
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in deleteResource API call\n' + err +"\n");
        } else {
            try{
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
                    var Id = req.params.id;
                    connection.query("DELETE FROM Resources WHERE Id = ?", Id, function(err) {
                        if (err) {
                            res.statusCode = 500;
                            res.send({
                                err:    err.code
                            });
                            console.log('Can`t make query for id='+Id+'\n' + err +"\n");
                        }else{
                            res.send({
                                result: 'success',
                                err:    ''
                            });
                            console.log('end deleteResource API function');
                        }
                    });
                });
            }
            catch(err){
                console.log('Can`t execute deleteResource API');
            }
        }
    });
};
exports.getStats1 = function (req, res) {
    console.log('start getStats1 API function');
     req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getStats1 API call\n' + err +"\n");
        } else {
            try{
                connection.query('SELECT Activities.Problems_Id as Id, Activities.Date as start, Activities.ActivityTypes_Id as act, Problems.ProblemTypes_Id as lane FROM Activities LEFT JOIN Problems ON Problems.Id = Activities.Problems_Id WHERE (ActivityTypes_Id = 1) OR (ActivityTypes_Id = 3);', function(err, rows) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err:    err.code
                        });
                        console.log('Can`t make query for (ActivityTypes_Id = 1) OR (ActivityTypes_Id = 3)\n' + err +"\n");
                    }else{
                        res.send(rows);
                        console.log('end getStats1 API function');
                    }
                });
            }
            catch(err){
                console.log('Can`t execute getStats1 API');
            }
        }
    });
};
exports.getStats2 = function (req, res) {
    console.log('start getStats2 API function');
     req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getStats1 API call\n' + err +"\n");
        } else {
            try{

                var val;
                switch(req.params.val){
                    case "D": val = 'AND (DATE(Activities.Date) = DATE(NOW()))';
                        break;
                    case "W": val = 'AND (DATE_FORMAT(Activities.Date,"%u-%Y") = DATE_FORMAT(NOW(),"%u-%Y"))';
                        break;
                    case "M": val = 'AND (DATE_FORMAT(Activities.Date,"%m-%Y") = DATE_FORMAT(NOW(),"%m-%Y"))';
                        break;
                    case "Y": val = 'AND (YEAR(Activities.Date) = YEAR(NOW()))';
                        break;
                    case "A": val = "";
                        break;
                };
                connection.query('SELECT Problems.ProblemTypes_Id as id, count(Problems.Id) as value FROM Problems LEFT JOIN Activities ON Problems.Id=Activities.Problems_Id WHERE (Activities.ActivityTypes_Id = 1) ' + val + ' GROUP BY Problems.ProblemTypes_Id;', function(err, rows, fields) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err:    err.code
                        });
                        console.log('Can`t make query for getStats2\n' + err +"\n");
                    }else{
                        res.send(rows);
                        console.log('end getStats2 API function');
                    }
                });
            }
            catch(err){
                console.log('Can`t execute getStats2 API');
            }
        }
    });
}
exports.getStats3 = function (req, res) {
    console.log('start getStats3 API function');
     req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getStats1 API call\n' + err +"\n");
        } else {
            try{
                connection.query('SELECT count(Id) as problems, sum(votes) as votes FROM Problems;', function(err, rows1) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err:    err.code
                        });
                        console.log('Can`t make query for getStats3 first SELECT\n' + err +"\n");
                    } else{
                        connection.query('SELECT count(Id) as photos FROM Photos;', function(err, rows2) {
                            if (err) {
                                res.statusCode = 500;
                                res.send({
                                    err:    err.code
                                });
                                console.log('Can`t make query for getStats3 second SELECT\n' + err +"\n");
                            } else {
                                connection.query('SELECT count(Id) as comments FROM Activities WHERE ActivityTypes_Id=5;', function(err, rows3, fields) {
                                    if (err) {
                                        res.statusCode = 500;
                                        res.send({
                                            err:    err.code
                                        });
                                        console.log('Can`t make query for getStats3 third SELECT\n' + err +"\n");
                                    } else {
                                        res.send([rows1,rows2,rows3]);
                                        console.log('end getStats3 API function');
                                    }
                                });
                            }
                        });
                    }
                });
            }
            catch(err){
                console.log('Can`t execute getStats3 API');
            }

        }
    });
};
exports.getStats4 = function (req, res) {
    console.log('start getStats3 API function');
     req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in getStats4 API call\n' + err +"\n");
        } else {
            try{
                connection.query('SELECT Id, Title, Votes FROM Problems ORDER BY Votes DESC LIMIT 10;', function(err, rows1) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err:    err.code
                        });
                        console.log('Can`t make query for getStats3 first SELECT\n' + err +"\n");
                    } else{
                        connection.query('SELECT Id, Title, Severity FROM Problems ORDER BY Severity DESC LIMIT 10;', function(err, rows2) {
                            if (err) {
                                res.statusCode = 500;
                                res.send({
                                    err:    err.code
                                });
                                console.log('Can`t make query for getStats4 second SELECT\n' + err +"\n");
                            } else {
                                connection.query('SELECT DISTINCT Activities.Problems_Id as Id, Problems.Title, count(*) as value FROM Activities LEFT JOIN Problems ON Problems.Id = Activities.Problems_Id WHERE ActivityTypes_Id = 5 GROUP BY Activities.Problems_Id ORDER BY value DESC LIMIT 10;', function(err, rows3, fields) {
                                    if (err) {
                                        res.statusCode = 500;
                                        res.send({
                                            err:    err.code
                                        });
                                        console.log('Can`t make query for getStats4 third SELECT\n' + err +"\n");
                                    } else {
                                        res.send([rows1,rows2,rows3]);
                                        console.log('end getStats4 API function');
                                    }
                                });
                            }
                        });
                    }
                });
            }
            catch(err){
                console.log('Can`t execute getStats4 API');
            }

        }
    });
};
exports.changePassword = function (req, res) {
    req.getConnection(function(err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err:    err.code
            });
            console.log('Can`t connect to db in register API call\n' + err +"\n");
        } else {
            
            try{
                var userData = {};
                userData.userId = req.body.userId||'';
                userData.old_password = req.body.old_password||'';
                userData.old_password_hashed = crypto.createHmac("sha1", secret.secretToken).update(userData.old_password).digest("hex");
                userData.new_password = req.body.new_password||'';
                userData.new_password_second = req.body.new_password_second||'';
                userData.new_password_hashed =  crypto.createHmac("sha1", secret.secretToken).update(userData.new_password).digest("hex");

                if (userData.old_password === '' || userData.new_password === '' || userData.new_password_second === '') {
                    return res.send(401);
                }

                connection.query("select Email, Password from Users where Id like ?", userData.userId, function(err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err: err.code
                        });

                    } else {
                        
                        if (result[0].Password == userData.old_password_hashed) {
                            
                            connection.query('UPDATE Users SET Password = ? WHERE Id = ?', [userData.new_password_hashed,userData.userId], function(err, rows) {
                                if (err) {
                                    res.statusCode = 500;
                                    res.send({
                                        err:    err.code
                                    });
                                }else{
                                    res.statusCode = 200;
                                    res.send({
                                        result: 'success'
                                    });
                                    
                                }
                            });
                        }
                        else {
                            return res.send(400);
                        }
                    }
                });
            }
            catch(err){
                console.log('Can`t execute change password API');
            }
        }
    })
};

exports.resetPassword = function (req, res) {
    console.log('reset password called');
    req.getConnection(function (err, connection) {
        if (err) {
            res.statusCode = 503;
            res.send({
                err: err.code
            });
            console.log('Can`t connect to db in reset password API call\n' + err + "\n");
        }
        else {
            try {
                var userData = {};
                userData.email = req.body.email || '';
                userData.surname = req.body.surname || '';


                connection.query("select Surname from Users where Email like ?", userData.email, function (err, result) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({
                            err: err.code
                        });

                    } else {

                        if (result[0] && (result[0].Surname == userData.surname)) {
                            userData.newPassword = generatePassword(6);

                            userData.newPasswordHashed = crypto.createHmac("sha1", secret.secretToken).update(userData.newPassword).digest("hex");

                            var message = {
                                "html": "<p>Ваш новий пароль </p>" + userData.newPassword + "<br><p>При наступному вході на сайт, наполегливо радимо змінити пароль через відповідну функцію!</p>",
                                "subject": "Ваш новий пароль на сайті ecomap.org",
                                "from_email": "robot@ecomap.org",
                                "from_name": "Поштовий робот ecomap.org",
                                "to": [{
                                    "email": userData.email,
                                    "type": "to"
                                }]
                            };
                            var async = true;
                            
                            mandrill_client.messages.send({"message": message, "async": async}, function(result) {
                                console.log(result);

                            }, function(e) {
                                // Mandrill returns the error as an object with name and message keys
                                console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                                // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
                            });

                            connection.query('UPDATE Users SET Password = ? WHERE Email = ?', [userData.newPasswordHashed, userData.email], function (err, rows) {
                                if (err) {
                                    res.statusCode = 500;
                                    res.send({
                                        err: err.code
                                    });
                                }
                                else {
                                    res.statusCode = 200;
                                    res.send({
                                        result: 'success'
                                    });
                                }
                            });

                            console.log(result);
                        }
                        else {
                            return res.send(400);
                        }


                    }
                });
            }
            catch (err) {
                console.log('Can`t execute change password API');
            }
        }
    });
};