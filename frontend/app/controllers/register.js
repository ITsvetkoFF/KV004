define(['./module'],function(controllers){
    'use strict';
    controllers.controller('registerCtrl', ['$scope','$rootScope','$modal', '$log','$http','$modalInstance' ,function ($scope,$rootScope,  $modal, $log,$http,$modalInstance){

        $scope.submitForm = function(isValid) {

            var data = {};
            data.first_name = document.registerForm.first_name.value;
            data.last_name = document.registerForm.last_name.value;
            data.email = document.registerForm.email.value;
            data.password = document.registerForm.password.value;

            // check to make sure the form is completely valid
            if (isValid  && ($scope.user.password == $scope.user.password_second)) {

                 $http.post('api/register', data).success(function(data, status, headers, config) {

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