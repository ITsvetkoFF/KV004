define(['./module'], function (controllers) {

    'use strict';

    controllers.controller('AdminUserCtrl', ['$scope', '$rootScope', 'ProblemService', '$location', '$window', 'ipCookie', 'UserService', '$modal', '$log', function ($scope,$rootScope, ProblemService, $location, $window, ipCookie, UserService, $modal, $log) {

        $scope.isLoggedIn = UserService.isLoggedIn;
        $scope.isAdministrator = UserService.isAdministrator;
        $scope.name = ipCookie('userName');
        $scope.surname = ipCookie('userSurname');
        $scope.userId = ipCookie('id');
        

        /**--- Getting reg usr problems ---*/
        $scope.getUserProblems = function(userId) {
            ProblemService.getUserProblemsFromDb(userId)
                .success(function (data) {
                    $scope.dataUserProblems = data;

            })
                .error(function (data, status, headers, config) {
                    throw error;
                });


        }

        if($scope.userId) {
            $scope.getUserProblems($scope.userId);
        }
        /*******************************/

        /*******--- Login form ---******/
        $scope.postLogIn = function () {
            var data = {};
            data.email = document.login.email.value;
            data.password = document.login.password.value;

            UserService.logIn(data.email, data.password).success(function (userData) {
                $scope.successLogIn(userData);
                $scope.getUserProblems($scope.userId);
                $window.location.href="/";
            }).error(function (status, data) {
                console.log(status);
                console.log(data);
            });
        };
        /*******************************/

        /*****--- The main part of facebook authorization ---*****/
        FB.init({
            appId: '615883928521055',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.1'
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

        function statusChangeCallback(response) {

           // console.log(response);

            if (response.status === 'connected') {
                FB.api('/me', function(response) {

                    UserService.logIn(response.email, response.id).success(function(userData) {

                        $scope.successLogIn(userData);

                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);

                        UserService.register(response.first_name, response.last_name, response.email, response.id).success(function(userData) {

                            $scope.successLogIn(userData);

                        }).error(function(status, data) {
                            console.log(status);
                            console.log(data);
                        });

                    });
                });

            } else if (response.status === 'not_authorized') {
                document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
            }
        }

        /*********************************************************/


        /*****--- The main part of vkontakte authorization ---*****/

        /**********************************************************/

        // This function is called after success login procedure
        $rootScope.successLogIn = function(userData) {

            ipCookie('userName', userData.name, {expires: 10});
            ipCookie('userSurname', userData.surname, {expires: 10});
            ipCookie('userRole', userData.role, {expires: 10});
            ipCookie('token', userData.token, {expires: 10});
            ipCookie('id', userData.id, {expires: 10});
            ipCookie('userEmail', userData.email, {expires:10});

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
            ipCookie.remove('userEmail');

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
                $scope.successLogIn(userData);
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.register = function register(username, surname, email, password, cnfPassword) {

            //and here must be validation!

            UserService.register(username, surname, email, password).success(function(userData) {
                $scope.successLogIn(userData);
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.logOut = function logOut() {
            successLogOut();
            $rootScope.$broadcast('Update',"");
            $window.location.href="/";
            FB.logout(function(response) {
                console.log(response);
            });
            
        }

        $scope.changePassword = function() {
            console.log('change password called');
            var modalInstance = $modal.open({
                templateUrl: 'app/templates/changePassword.html',
                controller: 'changePasswordCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.resetPassword = function() {
            console.log('reset password called');
            var modalInstance = $modal.open({
                templateUrl: 'app/templates/resetPassword.html',
                controller: 'resetPasswordCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }]);
});
