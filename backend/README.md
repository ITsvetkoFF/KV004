API
===
User's API:
-----------

+ app.get('/problems', routes.getProblems) - get all moderated problems in brief (id, title, coordinates, type);

+ app.get('/problems/:id', routes.getProblemId) - get detailed problem description (all information from tables 'Problems', 'Activities', 'Photos') by its id;

+ app.get('/users/:idUser', routes.getUserId) - get all user's problems in brief (id, title, coordinates, type) by user's id;

+ app.get('/activities/:idUser', routes.getUserActivity) - get user's activity list by user's id;

+ app.post('/problempost', routes.postProblem) - post new problem;

+ app.post('/vote', routes.postVote) - vote for problem;

+ app.post('/login', routes.logIn) - log in (email and password are required). User's id, name, surname, role and secret token will be returned;

+ app.get('/logout', routes.logOut) - log out; 

+ app.post('/register', routes.register) - register (name, surname, email, password are required). User's id, name, surname, role and secret token will be returned;

Admin's API:
------------

+ app.get('/not_approved', routes.notApprovedProblems) - get all problems which are not approved in brief (id, title);

+ app.delete('/problem', routes.deleteProblem) - delete problem by its id (all information from tables 'Problems', 'Activities', 'Photos');

+ app.delete('/user', routes.deleteUser) - delete user by user's id (only from 'Users');

+ app.delete('/comment', routes.deleteComment) - delete comment by comment's id;

+ app.delete('/photo', routes.deletePhoto) - delete photo by photo's id;

+ app.put('/edit', routes.editProblem) - edit problem (update all fields) by its id;

