/**
 * Created by taras on 01.10.14.
 */
define(['./module'],function(controllers){
    'use strict';
    controllers.controller('registerCtrl', ['$scope','$rootScope','$modal', '$log','$http','$modalInstance' ,function ($scope,$rootScope,  $modal, $log,$http,$modalInstance){
        $scope.registerNewUser = function(){
            var data = {};
            data.first_name = document.registerForm.first_name.value;
            data.last_name = document.registerForm.last_name.value;
            data.email = document.registerForm.email.value;
            data.password = document.registerForm.password.value;

            $http.post('api/register', data);
            $modalInstance.close(console.log('registered'));

        };



    }]);
});
