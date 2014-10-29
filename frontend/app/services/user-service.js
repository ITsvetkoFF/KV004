define(['./module'], function (services) {
    'use strict';

        
    services.factory('UserService', function($http, ipCookie ) {
        var saveChangeStatus = true;
        return {
            logIn: function (email, password) {
                return $http.post('/api/login', {email: email, password: password});
            },

            logOut: function () {
                if (saveChangeStatus) {
                    return $http.get('/api/logout');
                }
            },

            register: function (username, surname, email, password) {
                return $http.post('/api/register', { first_name: username, last_name: surname, email: email, password: password });
            },

            isLoggedIn: function () {
                if (ipCookie('token')) {
                    return true;
                } else {
                    return false;
                }
            },

            isAdministrator: function () {
                if (ipCookie('userRole') == 'administrator') {
                    return true;
                } else {
                    return false;
                }
            },
            setSaveChangeStatus: function (status) {
                saveChangeStatus = status;
            },
            getSaveChangeStatus: function () {
                return saveChangeStatus;
            },
            changePassword: function (dataPassword) {
                return $http.post('api/changePassword',dataPassword);

            },
            resetPassword: function (data) {
                return  $http.post('api/resetPassword', data);


            }
        }

        });


});





