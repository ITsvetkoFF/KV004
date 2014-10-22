define(['./module'],function(controllers){
    'use strict';
    controllers.controller('changePasswordCtrl', ['$scope','$rootScope','$modal', '$log','$http','$modalInstance', 'UserService','ipCookie' ,function ($scope,$rootScope,  $modal, $log,$http,$modalInstance, UserService, ipCookie){
        console.log('change password called')

        $scope.submitForm = function(isValid) {
            var data = {};
            data.userId = ipCookie('id');
            data.old_password = document.changePasswordForm.old_password.value;
            data.new_password = document.changePasswordForm.new_password.value;
            data.new_password_second = document.changePasswordForm.new_password_second.value;

            
            // check to make sure the form is completely valid
            if (isValid  && ($scope.user.new_password == $scope.user.new_password_second)) {
                console.log('form is valid and passwords are equal');

                $http.post('api/changePassword', data).success(function(data, status, headers, config) {
                        $scope.formHide = true;
                        $scope.alerts.push({type: 'success', msg: 'Ви змінили пароль!'});
                }).error(function(data, status, headers, config) {
                    console.log('password did not changed' + status);
                    if (status == 400) {
                        $scope.wrongPassword = 'Ви ввели не правильний пароль!';
                    }
                });
            }
        };

        $scope.alerts = [];

        $scope.closeAlert = function() {
            $modalInstance.close(console.log('alert closed'));
        };

    }]);
});