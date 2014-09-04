var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (xhr.readyState == 4) {
        probs = JSON.parse(xhr.responseText);
    };
};
xhr.open('GET', 'http://ecomap.org/api/problems', false);
xhr.send(null);

var mysql = require('mysql');
var connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'Enviromap'
    }
);
var problemStatus = ['Нова', 'Вирішена'],
problemType = ['Проблеми лісів', 'Сміттєзвалища', 'Незаконна забудова', 'Проблеми водойм', 'Загрози біорізноманіттю', 'Браконьєрство', 'Інші проблеми'],
activityTypes = ['addProblem', 'editProblem', 'voteForProblem', 'postPhoto', 'postComment'];
connection.connect();
for (var i = 0; i < problemType.length; i++) {
        connection.query('INSERT INTO ProblemTypes SET ?', {Type: problemType[i]}, function(err, rows, fields) {
    if (err) throw err;
    });
};
for (var i = 0; i < activityTypes.length; i++) {
        connection.query('INSERT INTO ActivityTypes SET ?', {Name: activityTypes[i]}, function(err, rows, fields) {
    if (err) throw err;
    });
};

for (var i=0, len=probs.length; i<len; i++) {
if (probs[i].probStatus == 'Нова') probs[i].probStatus = 0;
else if (probs[i].probStatus == 'Вирішена') probs[i].probStatus = 1;

if (probs[i].probType == 'Проблеми лісів') probs[i].probType = 1;
else if (probs[i].probType == 'Сміттєзвалища') probs[i].probType = 2;
else if (probs[i].probType == 'Незаконна забудова') probs[i].probType = 3;
else if (probs[i].probType == 'Проблеми водойм') probs[i].probType = 4;
else if (probs[i].probType == 'Загрози біорізноманіттю') probs[i].probType = 5;
else if (probs[i].probType == 'Браконьєрство') probs[i].probType = 6;
else if (probs[i].probType == 'Інші проблеми') probs[i].probType = 7;

probs[i].created = new Date(probs[i].created*1000).toISOString();

if (probs[i].content) {
probs[i].content = probs[i].content.replace(/'/g,"\\'");
probs[i].title = probs[i].title.replace(/'/g,"\\'");
};

if (!probs[i].lat || !probs[i].lo) {
if (!probs[i].probType) probs[i].probType=7;
var data = {
Title : probs[i].title,
Content : probs[i].content,
Severity : probs[i].severity,
Moderation : 0,
Votes : probs[i].votes,
Latitude : probs[i].lat,
Longtitude : probs[i].lon,
Status : probs[i].probStatus,
ProblemTypes_Id : probs[i].probType
  };
connection.query("INSERT INTO Problems SET ?", data, function(err, rows, fields) {
    if (err) throw err;
    });
var data = {
Date : probs[i].created,
ActivityTypes_Id : 1,
Problems_Id : i+1,
  };
connection.query("INSERT INTO Activities SET ?", data, function(err, rows, fields) {
    if (err) throw err;
    });

};
};
connection.end();
