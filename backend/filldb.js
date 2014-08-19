var mysql = require('mysql'),
    crypto = require('crypto'),
    problemStatus = ['нова', 'в процесі', 'вірішена'],
    problemType = ['проблеми лісів', 'сміттєзвалища', 'незаконна забудова', 'проблеми водойм', 'загрози біорізноманіттю', 'браконьєрство', 'інші проблеми'],
    title = ['problem1', 'problem2', 'problem3', 'problem4', 'problem5', 'problem6', 'problem7'],
    content = ['content1', 'content2', 'content3', 'content4', 'content5', 'content7', 'content8'],
    userNames = ['name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7', 'name8'],
    userEmails = ['name1@.com', 'name2@.com', 'name3@.com', 'name4@.com', 'name5@.com', 'name6@.com', 'name7@.com', 'name8@.com'],
    severity = [4, 3, 10, 2, 8, 9, 12],
    moderation = [true, false],
    votes = [15, 43, 21, 1, 76, 3, 0],
    lat = [12.65, 13.22, 1.12, 12.123, 7.16, 3.1234, 0.1],
    problemStatusId = [1, 2, 3],
    problemTypesId = [1, 2, 3, 4, 5, 6, 7],
    lon = [12.65, 13.22, 1.12, 12.123, 7.16, 3.1234, 0.1],
    activityType = ['like', 'photoPosted', 'commentPosted', 'problemAdded'],
    userId = [1, 2, 3, 4, 5, 6, 7, 8],
    contentStory = [],
    passwords = [100, 110, 120, 130, 140, 150, 160, 170, 180];

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'enviromap'
    });


function fillProblemStatus() {
    for (var i = 0; i < problemStatus.length; i++) {
        connection.query('INSERT INTO ProblemStatus SET ?', {probStatus: problemStatus[i]});
    }
}


function fillProblemTypes() {
    for (var i = 0; i < problemType.length; i++) {
        connection.query('INSERT INTO ProblemTypes SET ?', {probType: problemType[i]});
    }
}


function fillProblemAndActivityTable() {
    for (var i = 0; i < 50; i++) {
        var currentContent = content[randomIntInc(0, content.length)];
        contentStory.push(currentContent);
        connection.query('INSERT INTO Problems SET ?', {title: title[randomIntInc(0, title.length)],
            content: currentContent,
            severity: severity[randomIntInc(0, severity.length)],
            moderation: moderation[randomIntInc(0, moderation.length)],
            votes: votes[randomIntInc(0, votes.length)],
            lat: lat[randomIntInc(0, lat.length)],
            lon: lon[randomIntInc(0, lon.length)],
            problemStatus_Id: problemStatusId[randomIntInc(0, problemStatusId.length)],
            problemTypes_Id: problemTypesId[randomIntInc(0, problemTypesId.length)]
        });
    }

    for (var j = 1; j <= 50; j++) {
        connection.query('INSERT INTO Activities SET ?', {activityContent: contentStory[j - 1],
            problems_id: j,
            activityDate: new Date(),
            activityTypes_Id: 4,
            users_id: userId[randomIntInc(0, userId.length)]
        });
    }
}


function fillUsers() {
    for (var i = 0; i < userNames.length; i++) {
        connection.query('INSERT INTO Users SET ?', {
            name: userNames[i],
            password: crypto.createHmac('sha1', '33').update(new Buffer(passwords[i])).digest("hex"),
            email: userEmails[i]});
    }
}


function fillActivityType() {
    for (var i = 0; i < activityType.length; i++) {
        connection.query('INSERT INTO ActivityTypes SET ?', {activityName: activityType[i]});
    }
}

function filldb() {
    fillProblemStatus();
    fillProblemTypes();
    fillUsers();
    fillActivityType();
    fillProblemAndActivityTable();
}

filldb();
console.log('database filled');
