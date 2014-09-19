define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',['$scope','$rootScope',function($scope,$rootScope){

        $scope.showRigthSide = "_hide";

        $scope.addProblem = function () {
            $scope.showRigthSide = "";
        };
        $scope.rightSidePointerClick = function () {
            $scope.showRigthSide = "_hide";
        };
        $scope.hideDiv = function() {
            $rootScope.$broadcast('Update', '_hide');
        };
        $rootScope.$on("Update", function(event, message) {
            if ($scope.showRigthSide != message){
            $scope.showRigthSide = message;
        }
        });

    }]);
});
