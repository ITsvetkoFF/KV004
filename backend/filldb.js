var mysql = require('mysql'),
    crypto = require('crypto'),
    secret = require('./config/secret');
var resources = [{}, {}, {}, {}, {}];
for (var i = 0; i < resources.length; i++) {
    resources[i].content = [];
};
var fs = require('fs');
resources[0].content.push(fs.readFileSync('resourses/about.html', 'utf-8'));
resources[1].content.push(fs.readFileSync('resourses/cleaning.html', 'utf-8'));
resources[2].content.push(fs.readFileSync('resourses/removing.html', 'utf-8'));
resources[3].content.push(fs.readFileSync('resourses/stopping-exploitation.html', 'utf-8'));
resources[4].content.push(fs.readFileSync('resourses/stopping-trade.html', 'utf-8'));

resources[0].title = 'Про проект';
resources[1].title = 'Як організувати прибирання в парку';
resources[2].title = 'Як добитись ліквідації незаконного звалища?';
resources[3].title = 'Як зупинити комерційну експлуатацію тварин?';
resources[4].title = 'Торгують первоцвітами - телефонуй: "102-187!"';

resources[0].alias = 'about';
resources[1].alias = 'cleaning';
resources[2].alias = 'removing';
resources[3].alias = 'stopping-exploitation';
resources[4].alias = 'stopping-trade';

resources[0].isResource = 0;
resources[1].isResource = 1;
resources[2].isResource = 1;
resources[3].isResource = 1;
resources[4].isResource = 1;

var problemTypes = ['проблеми лісів', 'сміттєзвалища', 'незаконна забудова', 'проблеми водойм', 'загрози біорізноманіттю', 'браконьєрство', 'інші проблеми'],
    userRoles = ['administrator', 'user'],
    userNames = ['admin', 'name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7', 'name8', 'name9'],
    userEmails = ['admin@.com', 'name1@.com', 'name2@.com', 'name3@.com', 'name4@.com', 'name5@.com', 'name6@.com', 'name7@.com', 'name8@.com', 'name9@.com'],
    passwords = ['admin', '12345678'],
    activityTypes = ['addProblem', 'editProblem', 'voteForProblem', 'postPhoto', 'postComment'];

var i;

var probs = JSON.parse(fs.readFileSync('problems.json', 'utf-8'));

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
        connection.query('INSERT INTO ProblemTypes SET ?', { type: problemTypes[i] });
    }
}

function fillUserRoles() {
    for (i = 0; i < userRoles.length; i++) {
        connection.query('INSERT INTO UserRoles SET ?', {
            id: i + 1,
            role: userRoles[i]
        });
    }
}

function fillResources() {
    for (var i = 0; i < resources.length; i++) {
        var data = {
            Title: resources[i].title,
            Content: resources[i].content,
            Alias: resources[i].alias,
            IsResource: resources[1].isResource
        };
        connection.query("INSERT INTO Resources SET ?", data, function (err, rows, fields) {
            if (err) throw err;
        });
    };
}

function fillUsers() {
    connection.query('INSERT INTO Users SET ?', {
        name: userNames[0],
        password: crypto.createHmac('sha1', secret.secretToken).update(passwords[0]).digest("hex"),
        email: userEmails[0],
        userRoles_Id: 1
    });
    for (i = 1; i < userNames.length; i++) {
        connection.query('INSERT INTO Users SET ?', {
            name: userNames[i],
            password: crypto.createHmac('sha1', secret.secretToken).update(passwords[1]).digest("hex"),
            email: userEmails[i],
            userRoles_Id: 2
        });
    }
}




function fillActivityTypes() {
    for (var i = 0; i < activityTypes.length; i++) {
        connection.query('INSERT INTO ActivityTypes SET ?', { name: activityTypes[i] });
    }
}

function fillProblemsActivities() {
    for (var i = 0, j = 0, len = probs.length; i < len; i++) {

        if (!probs[i].lat || !probs[i].probType || (probs[i].probStatus === null) || !probs[i].lon) {
        }
        else {
            j++;
            if (probs[i].probStatus == 'Нова') probs[i].probStatus = 0;
            else if (probs[i].probStatus == 'Вирішена') probs[i].probStatus = 1;

            if (probs[i].probType == 'Проблеми лісів') probs[i].probType = 1;
            else if (probs[i].probType == 'Сміттєзвалища') probs[i].probType = 2;
            else if (probs[i].probType == 'Незаконна забудова') probs[i].probType = 3;
            else if (probs[i].probType == 'Проблеми водойм') probs[i].probType = 4;
            else if (probs[i].probType == 'Загрози біорізноманіттю') probs[i].probType = 5;
            else if (probs[i].probType == 'Браконьєрство') probs[i].probType = 6;
            else if (probs[i].probType == 'Інші проблеми') probs[i].probType = 7;

            

            if (probs[i].content) {
                probs[i].content = probs[i].content.replace(/'/g, "\\'");
                probs[i].title = probs[i].title.replace(/'/g, "\\'");
            }
 
 var content = probs[i].content.split("\n\n")[0];
 var proposal = probs[i].content.split("\n\n")[1];


 var data = {
                Title: probs[i].title,
                Content: content,
                Proposal: proposal,
                Severity: probs[i].severity,
                Moderation: 1,
                Votes: probs[i].votes,
                Latitude: probs[i].lat,
                Longtitude: probs[i].lon,
                Status: probs[i].probStatus,
                ProblemTypes_Id: probs[i].probType
            };
            connection.query("INSERT INTO Problems SET ?", data, function (err, rows, fields) {
                if (err) throw err;
            });
            var data = {
                Date: new Date(probs[i].created * 1000).toISOString().slice(0, 19).replace('T', ' '),
                ActivityTypes_Id: 1,
                users_Id: 2,
                Problems_Id: j,
                Content:JSON.stringify({
                    Content:"Проблему додано анонімно",
                    userName:"(Анонім)"
                })
            }

            connection.query("INSERT INTO Activities SET ?", data, function (err, rows, fields) {
                if (err) throw err;
            });
        };
    };
};
fillResources()
fillProblemTypes();
fillUserRoles();
fillUsers();
fillActivityTypes();
fillProblemsActivities();

console.log('database filled');
connection.end();




