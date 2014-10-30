define(['./module'],function(controllers){
    'use strict';

    controllers.controller('mainCtrl',['$scope','$rootScope','$modal', '$log','UserService', '$location','ResourceService', 'adminToShowProblemService' ,function($scope,$rootScope,$modal, $log,UserService,$location,ResourceService, adminToShowProblemService){
         $scope.showSlider=false;
        $scope.uploadRightSide = false;

        //TODO: rename everthing in code swipHide() to hideRight()
        $scope.swipeHideRight = function(){
            if(window.innerWidth<=1000){
                console.log(window.innerWidth);
                $scope.swipeHide();
            }

        }
        
        $rootScope.$broadcast('Update',"");
        $scope.swipeHide = function(params){
            if(params=="dropzone"){
                        $rootScope.$broadcast('Update',"");
            
            }else{
                if (UserService.getSaveChangeStatus()) {
                    window.location.href = "#/map";
                    $rootScope.$broadcast('Update', "");
                }
            }
        };

        $scope.$on('$routeChangeSuccess', function(event, next) { 
            if ($rootScope.tempMarker)
                $rootScope.geoJson.removeLayer($rootScope.tempMarker);
        });

       // $scope.showRigthSide = "_hide";
        $rootScope.getTitles = function() {
            ResourceService.getTitlesFromDb()
            .success(function (data) {
                $rootScope.data = data;
            });
                    $scope.deleteResource = function(Id,Title){
        //modal window
                var text = 'Будь ласка, підтвердіть видалення ресурсу\n "' + Title+ '"';
                var approveCaption = 'Видалити ресурс';
                var cancelCaption = 'Скасувати';
                adminToShowProblemService.showModalMessage(text, 'sm',approveCaption, cancelCaption).then(
                    function () {
                    ResourceService.deleteResource(Id)
                           .success(function() {
                    $rootScope.getTitles();
                    });
                    },
                    function () {
                        return true;
                    });
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
        $scope.showRegForm = $scope.open;

        $scope.$location = function () {
            return $location.path();
        }

        $scope.$watch($scope.$location, function (newValue, oldValue){
            if (newValue != "/problem/addProblem") {
                $rootScope.style = function () {
                    return { 
                        'height': 'calc(100%-52px);'
                    };
                };
            };
        });

    }]);
});
