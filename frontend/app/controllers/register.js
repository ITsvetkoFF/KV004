/**
 * Created by taras on 01.10.14.
 */
define(['./module'],function(controllers){
    'use strict';
    controllers.controller('registerCtrl', ['$scope','$rootScope','$modal', '$log','$http','$modalInstance' ,function ($scope,$rootScope,  $modal, $log,$http,$modalInstance){
        console.log('registerCtrl is loaded');
        $scope.registerNewUser = function(){
            var data = {};
            data.first_name = document.registerForm.first_name.value;
            data.last_name = document.registerForm.last_name.value;
            data.email = document.registerForm.email.value;
            data.password = document.registerForm.password.value;

            $http.post('api/register', data);
            
            var mainModal = document.querySelector('.modal-content');
            var modal1 = document.querySelector('.modal-header');
            var modal2 = document.querySelector('.modal-body');
            mainModal.removeChild(modal1);
            mainModal.removeChild(modal2);
        };

        $scope.alerts = [];

        $scope.addAlert = function() {
            console.log($scope.alerts);
            $scope.alerts.push({type: 'success', msg: 'Ви успішно зареєструвались!'});
        };
        $scope.closeAlert = function(index) {
            $modalInstance.close(console.log('alert closed'));
        };

    }]);
});
