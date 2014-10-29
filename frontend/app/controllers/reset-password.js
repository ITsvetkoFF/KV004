define(['./module'],function(controllers){
    'use strict';
    controllers.controller('resetPasswordCtrl', ['$scope','$rootScope','$modal', '$log','$modalInstance', 'UserService','ipCookie' ,function ($scope,$rootScope,  $modal, $log,$modalInstance, UserService, ipCookie){

        $scope.submitForm = function(isValid) {
            var data = {};
            data.email = $scope.user.email;
            data.surname = $scope.user.surname;



            // check to make sure the form is completely valid
            if (isValid) {
                console.log($scope.user);
                UserService.resetPassword(data).success(function (data, status, headers, config) {
                    if($scope.alerts.length){
                        $scope.closeAlert(0,1);

                    }
                    $scope.formHide = true;
                    $scope.alerts.push({type: 'success', msg: 'Вам на пошту було вислано новий тимчасовий пароль!'});
                    console.log('success');

                }).error(function (data, status, headers, config) {
                        if(!$scope.alerts.length){
                            $scope.alerts.push({type: 'danger', msg: 'Пошта і прізвище не співпадають або такої пошти нема в базі даних!'});
                        }

                    });
            }

        };

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            if($scope.formHide)
                $modalInstance.close(console.log('alert closed'));
        };

    }]);
});
