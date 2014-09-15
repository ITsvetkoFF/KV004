define(['./module'], function (controllers) {

    'use strict';
    controllers.controller('AdminUserCtrl', ['$scope', '$http', '$location', '$window', 'ipCookie', 'UserService', function ($scope, $http, $location, $window, ipCookie, UserService) {
        /*****--- Register form ---*****/
        $scope.registerClassAppendix = "_hide";

        $scope.showRegisterForm = function () {
            $scope.registerClassAppendix = "_show";
        }

        $scope.closeRegisterForm = function () {
            $scope.registerClassAppendix = "_hide";
        };

        $scope.postRegistrationForm = function () {
            var data = {};
            data.first_name = document.registerForm.first_name.value;
            data.last_name = document.registerForm.last_name.value;
            data.email = document.registerForm.email.value;
            data.password = document.registerForm.password.value;

            $http.post('http://ita-kv.tk:8090/api/register', data);
        };
        /*******************************/

        /*******--- Login form ---******/
        $scope.postLogIn = function () {
            var data = {};
            data.email = document.login.email.value;
            data.password = document.login.password.value;

            UserService.logIn(data.email, data.password).success(function (userData) {
                successLogIn(userData);
            }).error(function (status, data) {
                console.log(status);
                console.log(data);
            });
        };
        /*******************************/

        $scope.isLoggedIn = UserService.isLoggedIn;
        $scope.isAdministrator = UserService.isAdministrator;
        $scope.name = ipCookie('userName');
        $scope.surname = ipCookie('userSurname');

        /*****--- The main part of facebook authorization ---*****/
        FB.init({
            appId: '1458754107737788',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

        function statusChangeCallback(response) {

            console.log('statusChangeCallback');
            console.log(response);

            if (response.status === 'connected') {
                FB.api('/me', function(response) {

                    UserService.logIn(response.email, response.id).success(function(userData) {

                        successLogIn(userData);

                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);

                        UserService.register(response.first_name, response.last_name, response.email, response.id).success(function(userData) {

                            successLogIn(userData);

                        }).error(function(status, data) {
                            console.log(status);
                            console.log(data);
                        });

                    });
                });

            } else if (response.status === 'not_authorized') {
                document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
            } else {
                document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
            }
        }

        /*********************************************************/


        /*****--- The main part of vkontakte authorization ---*****/

        /**********************************************************/

        // This function is called after success login procedure
        function successLogIn(userData) {

            ipCookie('userName', userData.name, {expires: 10});
            ipCookie('userSurname', userData.surname, {expires: 10});
            ipCookie('userRole', userData.role, {expires: 10});
            ipCookie('token', userData.token, {expires: 10});
            ipCookie('id', userData.id, {expires: 10});


            $scope.name = ipCookie('userName');
            $scope.surname = ipCookie('userSurname');
            $scope.userId = ipCookie('id');
        }

        function successLogOut() {
            ipCookie.remove('token');
            ipCookie.remove('userName');
            ipCookie.remove('userSurname');
            ipCookie.remove('userRole');
            ipCookie.remove('id');

        }

        $scope.showFiltersVar = false;
        
        $scope.showFilters = function() {
            if($scope.showFiltersVar === true)
                $scope.showFiltersVar = false;
            else
                $scope.showFiltersVar = true;
        }

        $scope.logInFB = function logInFB() {
            FB.login(function(response) {

                    FB.getLoginStatus(function(response) {
                        statusChangeCallback(response);
                    });

                }, {
                    scope: 'publish_stream,email'
                });
        }

        $scope.logIn = function logIn(email, password) {

            //here must be validation!

            UserService.logIn(email, password).success(function(userData) {
                successLogIn(userData);
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.register = function register(username, surname, email, password, cnfPassword) {

            //and here must be validation!

            UserService.register(username, surname, email, password).success(function(userData) {
                successLogIn(userData);
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.logOut = function logOut() {
            successLogOut();
            FB.logout(function(response) {
                console.log(response);
            });
        }
    }]);
});


