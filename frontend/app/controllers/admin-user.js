define(['./module'], function (controllers) {

    'use strict';
    controllers.controller('AdminUserCtrl', ['$scope', '$location', '$window', 'ipCookie', 'UserService', function ($scope, $location, $window, ipCookie, UserService) {

        $scope.isLoggedIn = UserService.isLoggedIn;
        $scope.isAdministrator = UserService.isAdministrator;
        //ipCookie('userName', 'LIZA');
        $scope.name = ipCookie('userName');
        //console.log(ipCookie('userName'));

        FB.init({
                appId      : '1458754107737788',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.1'
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });



        function statusChangeCallback(response) {

            console.log('statusChangeCallback');
            console.log(response);

            if (response.status === 'connected') {
                // Logged into your app and Facebook.

                FB.api('/me', function(response) {

                    UserService.logIn(response.email, response.id).success(function(userData) {

                        successLogIn(userData);

                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                        // This user has logged into our app first time,
                        // there is no his or her data in our DB,
                        // so we need to save it.
                        UserService.register(response.first_name, response.last_name, response.email, response.id).success(function(userData) {

                            successLogIn(userData);

                        }).error(function(status, data) {
                            console.log(status);
                            console.log(data);
                        });

                    });
                });

            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
            }
        }




        // This function is called after success login procedure
        function successLogIn(userData) {
            ipCookie('userName', userData.name, {expires: 10});
            ipCookie('userSurname', userData.surname, {expires: 10});
            ipCookie('userRole', userData.role, {expires: 10});
            ipCookie('token', userData.token, {expires: 10});
            ipCookie('id', userData.id, {expires: 10});

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
                //console.log(userData);
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


