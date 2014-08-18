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
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'enviromap',
    }
);


connection.connect();
var queryString = "insert into ProblemTypes (ProbType) values ('Проблеми лісів'), ('Сміттєзвалища'), ('Незаконна забудова'), ('Проблеми водойм'), ('Загрози біорізноманіттю'),  ('Браконьєрство'), ('Інші проблеми');";

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post Titles: ', rows[i].post_title);
    }
});

var queryString = "insert into ProblemStatus (ProbStatus) values ('Нова'), ('В процесі'), ('Вирішена');";

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post Titles: ', rows[i].post_title);
    }
});
for (var i=0, len=probs.length; i<len; i++) {
if (probs[i].probStatus == 'Нова') probs[i].probStatus = 1;
else if (probs[i].probStatus == 'В процесі') probs[i].probStatus = 2;
else if (probs[i].probStatus == 'Вирішена') probs[i].probStatus = 3;

if (probs[i].probType == 'Проблеми лісів') probs[i].probType = 1;
else if (probs[i].probType == 'Сміттєзвалища') probs[i].probType = 2;
else if (probs[i].probType == 'Незаконна забудова') probs[i].probType = 3;
else if (probs[i].probType == 'Проблеми водойм') probs[i].probType = 4;
else if (probs[i].probType == 'Загрози біорізноманіттю') probs[i].probType = 5;
else if (probs[i].probType == 'Браконьєрство') probs[i].probType = 6;
else if (probs[i].probType == 'Інші проблеми') probs[i].probType = 7;

if (probs[i].content) {
probs[i].content = probs[i].content.replace(/'/g,"\\'");
probs[i].title = probs[i].title.replace(/'/g,"\\'");
};

if ( (probs[i].probType) && (probs[i].probStatus) ) {
var queryString = "insert into Problems (Title, Content, Severity, Moderation, Lat, Lon, ProblemStatus_Id, ProblemTypes_Id) values (" + "\'" +  probs[i].title + "\'"+ "," + "\'"+ probs[i].content + "\'"+ "," + probs[i].severity + "," + probs[i].moderation + "," + probs[i].lat + "," + probs[i].lon + "," + probs[i].probStatus + "," + probs[i].probType +");";

connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post Titles: ', rows[i].post_title);
    }
});
};
};
connection.end();
