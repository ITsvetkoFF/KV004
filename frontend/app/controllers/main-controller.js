define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',function($scope){

        $scope.showRigthSide="_hide";
        $scope.addProblem = function(){
            $scope.showRigthSide="";

        }
        $scope.rightSidePointerClick = function(){
            $scope.showRigthSide="_hide";
        }

    });
});