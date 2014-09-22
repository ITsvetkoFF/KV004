define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',['$scope','$rootScope',function($scope,$rootScope){

        $scope.showRigthSide = "";//"_hide";

        $scope.addProblem = function () {
            $scope.showRigthSide = "";
        };

        $scope.rightSidePointerClick = function () {
            $scope.showRigthSide = "";// "_hide";
        };

        $rootScope.$on("Update", function(event, message) {
            $scope.showRigthSide = message;
            $scope.$apply();
            console.log("Update");
        });

    }]);
});
