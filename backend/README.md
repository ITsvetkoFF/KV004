API
===
User's API:
-----------

+ app.get('/problems', routes.getProblems) - get all moderated problems in brief (id, title, coordinates, type and status);

+ app.get('/problems/:id', routes.getProblemId) - get detailed problem description (all information from tables 'Problems', 'Activities', 'Photos') by it's id;

+ app.get('/users/:idUser', routes.getUserId) - get user's name and surmane by id;

+ app.get('/api/usersProblem/:idUser', routes.getUserProblemsById) - get all user's problems in brief (id, title, coordinates, type and status) by user's id;

+ app.get('/api/activities/:idUser', routes.getUserActivity) - get all user's activity (id, type, description and id of related problem);

+ app.post('/api/problempost', routes.postProblem) - post new problem;

+ app.post('/api/vote', routes.postVote) - vote for problem;

+ app.get('/api/getTitles',routes.getTitles) - get title, id and alias of all resources;

+ app.get('/api/resources/:name',routes.getResource) -get all information about resource by it's id;

+ app.get('/activities/:idUser', routes.getUserActivity) - get user's activity list by user's id;

+ app.post('/api/photo/:id',routes.addNewPhotos) - add new photo to existing problem by problem's id;

+ app.post('/api/comment/:id',routes.addComment) - add new comment to problem by problem's id;

+ app.post('/api/login', routes.logIn) - log in (email and password are required). User's id, name, surname, role and secret token will be returned;

+ app.get('/api/logout', routes.logOut) - log out; 

+ app.post('/api/register', routes.register) - register (name, surname, email, password are required). User's id, name, surname, role and secret token will be returned;

Admin's API:
------------

+ app.get('/api/not_approved', routes.notApprovedProblems) - get all problems which are not approved in brief (id, title, coordinates, date of creation);

+ app.delete('/api/problem/:id', routes.deleteProblem) - delete problem by it's id (all information from tables 'Problems', 'Activities', 'Photos');

+ app.delete('/api/user/:id', routes.deleteUser) - delete user by user's id (only from 'Users');

+ app.delete('/api/activity/:id', routes.deleteComment) - delete comment by it's id;

+ app.delete('/api/photo/:id', routes.deletePhoto) - delete photo by photo's id;

+ app.put('/api/edit/:id', routes.editProblem) - edit problem (update all fields) by it's id;

+ app.post('/api/addResource', routes.addResource) - add new resource into header;

+ app.put('/api/editResource/:id', routes.editResource) - edit existing resource;

+ app.delete('/api/deleteResource/:id', routes.deleteResource) - delete resource by it's id;

+ app.post('/api/postNews',routes.postNews) - add message to the newsline;

+ app.post('/api/getNews',routes.getNews) - get all messages for newsline;

+ app.post('/api/clearNews',routes.clearNews) - delete all messages from newsline;

+ app.post('/api/clearOneNews',routes.clearOneNews) - delete one message from newsline;
