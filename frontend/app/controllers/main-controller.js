define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',['$scope','$rootScope', '$http' ,function($scope,$rootScope, $http){
        $scope.showRigthSide = "_hide";

        $scope.hideDiv = function() {
            $scope.showRigthSide = "_hide";
        };
        $rootScope.$on("Update", function(event, message) {
            if ($scope.showRigthSide != message){
                $scope.showRigthSide = message;
            }
        });
    }]);
});
