define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',['$scope','$rootScope','$modal', '$log', '$http' ,function($scope,$rootScope,$modal, $log, $http){
        $scope.showSlider=false;
        
        $rootScope.$broadcast('Update',"");
        $scope.swipeHide = function(params){
            if(params=="dropzone"){
                        $rootScope.$broadcast('Update',"");
            
            }else{
                window.location.href="#/map";
                $rootScope.$broadcast('Update',"");
            }
        }
        $scope.$on('$routeChangeStart', function(next, current) { 
            if ($rootScope.tempMarker)
                $rootScope.geoJson.removeLayer($rootScope.tempMarker);
        });
       // $scope.showRigthSide = "_hide";
        $rootScope.getTitles = function() {
            $http({ method: 'GET', url: 'api/getTitles' }).success(function (data) {
                $rootScope.data = data;
            });
            $scope.deleteResource = function(Id) {
                $http.delete('/api/deleteResource/' + Id).success(function() {
                $rootScope.getTitles();
                })
            };
            $scope.editResource = function(Alias) {
                window.location.href="#/editResource/"+ Alias;
            }
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

        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'app/templates/register.html',
                controller: 'registerCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]);
});
