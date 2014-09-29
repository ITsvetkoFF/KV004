define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',['$scope','$rootScope', '$http' ,function($scope,$rootScope, $http){
        
        console.log('MainCTRL has loaded');
        $scope.$on('$routeChangeStart', function(next, current) { 
            console.log('routing was changed');
            console.log($rootScope.tempMarker);
            if ($rootScope.tempMarker)
                $rootScope.tempMarker.setOpacity(0);
        });

        $scope.showRigthSide = "_hide";
        $scope.getTitles = function() {
            $http({ method: 'GET', url: 'api/getTitles' }).success(function (data) {
                $scope.data = data;
            });
            $scope.deleteResource = function(Id) {
                $http.delete('/api/deleteResource/' + Id)
            };
        };
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
