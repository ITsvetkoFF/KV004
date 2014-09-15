define(['./module'], function (services) {
    'use strict';

        
    services.factory('UserService', function($http, ipCookie) {
        return {
            logIn: function (email, password) {
                return $http.post('http://localhost:8090' + '/api/login', {email: email, password: password});
            },

            logOut: function() {
                return $http.get('http://localhost:8090' + '/api/logout');

            },

            register: function (username, surname, email, password) {
                console.log(username);
                console.log(surname);
                console.log(email);
                console.log(password);

                return $http.post('http://localhost:8090' + '/api/register', {first_name: username,last_name: surname, email: email, password: password});

            },

            isLoggedIn: function() {
                if(ipCookie('token')) {
                    return true;
                } else {
                    return false;
                }
            },

            isAdministrator: function() {
                if(ipCookie('role')=='administrator') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    });


});





