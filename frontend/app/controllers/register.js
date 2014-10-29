define(['./module'],function(controllers){
    'use strict';
    controllers.controller('registerCtrl', ['$scope','$rootScope','$modal', '$log','$http','$modalInstance', 'UserService' ,function ($scope,$rootScope,  $modal, $log,$http,$modalInstance, UserService){

        $scope.submitForm = function(isValid) {

            var data = {};
            data.first_name = document.registerForm.first_name.value;
            data.last_name = document.registerForm.last_name.value;
            data.email = document.registerForm.email.value;
            data.password = document.registerForm.password.value;
            var newUser = {};
            newUser.email = data.email;
            newUser.password = data.password;
            // check to make sure the form is completely valid
            if (isValid  && ($scope.user.password == $scope.user.password_second)) {
                UserService.register(data.first_name,data.last_name,data.email,data.password)
                .success(function(data, status, headers, config) {

                     UserService.logIn(newUser.email, newUser.password).success(function (userData) {
                         $rootScope.successLogIn(userData);

                     }).error(function (status, data) {
                         console.log(status);
                         console.log(data);
                     });
                     $scope.formHide = true;

                     $scope.alerts.push({type: 'success', msg: 'Ви успішно зареєструвались!'});
                 }).error(function(data, status, headers, config) {
                    if (status == 400)
                        $scope.wrongEmail = "Ваша пошта вже зайнята!";
                 });
            }
        };

        $scope.alerts = [];

        $scope.closeAlert = function() {
            $modalInstance.close(console.log('alert closed'));
        };

    }]);
});