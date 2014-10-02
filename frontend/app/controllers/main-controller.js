define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',['$scope','$rootScope', '$http' ,function($scope,$rootScope, $http){
        $scope.showSlider=false;
        console.log('MainCTRL has loaded');
        $scope.$on('$routeChangeStart', function(next, current) { 
            console.log('routing was changed');
                        
            if ($rootScope.tempMarker)
                $rootScope.geoJson.removeLayer($rootScope.tempMarker);
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
        $rootScope.$on("Update", function(event, message) {
            $scope.messageLog=$rootScope.messageLog;


            if ($scope.showRigthSide != message&&message!=undefined){
                $scope.showRigthSide = message;
            }
        });
        $rootScope.$on('showSlider',function(event,message){
            $scope.showSlider = message;
        });

    }]);
});
