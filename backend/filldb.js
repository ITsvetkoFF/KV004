var mysql = require('mysql'),
    crypto = require('crypto'),
    secret = require('./config/secret');


var problemTypes = ['проблеми лісів', 'сміттєзвалища', 'незаконна забудова', 'проблеми водойм', 'загрози біорізноманіттю', 'браконьєрство', 'інші проблеми'],
    userRoles = ['administrator', 'user'],
    
    amountOfProblems = 50;
    titles = ['problem1', 'problem2', 'problem3', 'problem4', 'problem5', 'problem6', 'problem7', 'problem8', 'problem9', 'problem10'],
    content = ['content1', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8','content9','content10'],
    moderation = [true, false],
    latitude = [50.4546600, 50.282, 50.12, 50.123, 50.176, 50.1234, 50.01],
    longtitude = [30.5238000, 50.22, 50.152, 50.1223, 50.16, 50.12034, 50.1],
    
    userNames = ['admin', 'name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7', 'name8', 'name9'],
    userEmails = ['admin@.com', 'name1@.com', 'name2@.com', 'name3@.com', 'name4@.com', 'name5@.com', 'name6@.com', 'name7@.com', 'name8@.com', 'name9@.com'],
    passwords = ['admin', '12345678'],
    
    
    activityTypes = ['addProblem', 'editProblem', 'voteForProblem', 'postPhoto', 'postComment'];

var i;
   
   

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'Enviromap'
    });



function fillProblemTypes() {
    for (i = 0; i < problemTypes.length; i++) {
        connection.query('INSERT INTO ProblemTypes SET ?', {type: problemTypes[i]});
    }
}

function fillUserRoles() {
    for (i = 0; i < userRoles.length; i++) {
        connection.query('INSERT INTO UserRoles SET ?', {
            id: i+1,
            role: userRoles[i]
        });
    }
}

function fillUsers() {
    connection.query('INSERT INTO Users SET ?', {
            name: userNames[0],
            password: crypto.createHmac('sha1', secret.secretToken).update(passwords[0]).digest("hex"),
            email: userEmails[0],
            userRoles_Id: 1});
    for (i = 1; i < userNames.length; i++) {
        connection.query('INSERT INTO Users SET ?', {
            name: userNames[i],
            password: crypto.createHmac('sha1', secret.secretToken).update(passwords[1]).digest("hex"),
            email: userEmails[i],
            userRoles_Id: 2});
    }
}
    
  


function fillActivityTypes() {
    for (var i = 0; i < activityTypes.length; i++) {
        connection.query('INSERT INTO ActivityTypes SET ?', {name: activityTypes[i]});
    }
}

function fillProblemsActivities() {
    for (i = 0; i < amountOfProblems; i++) {
        connection.query('INSERT INTO Problems SET ?', {
            title: titles[randomIntInc(0, titles.length)],
            content: content[randomIntInc(0, content.length)],
            severity: randomIntInc(1, 5),
            moderation: moderation[randomIntInc(0, moderation.length)],
            votes: randomIntInc(0, 100),
            latitude: latitude[randomIntInc(0, latitude.length)],
            longtitude: longtitude[randomIntInc(0, longtitude.length)],
            status: moderation[randomIntInc(0, moderation.length)],
            problemTypes_Id: randomIntInc(1, problemTypes.length)
        });
    }
    
    for (i = 0; i < amountOfProblems; i++) {
        connection.query('INSERT INTO Activities SET ?', {
            date: new Date(),
            activityTypes_Id: 1,
            users_Id: randomIntInc(1, userNames.length),
            problems_Id: i+1
            
        });
    }   
}

fillProblemTypes(); 
fillUserRoles();
fillUsers();
fillActivityTypes();
fillProblemsActivities();


console.log('database filled');
connection.end();
