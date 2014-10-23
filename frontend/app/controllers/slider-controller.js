define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('SlideCtrl', function ($scope,$rootScope) {


        $scope.hideSlider = function(){
            $rootScope.$emit('showSlider','false');
        }

        $rootScope.$on('get',function(event,message){


            $scope.slides = [];


            for(var i=0;i<$scope.photos.length;i++){


                $scope.slides.push({
                    image: 'photos/large/' + $scope.photos[i].Link,
                    text: $scope.photos[i].Description,
                    status: $scope.photos[i].Status
                })
            }

        });
    });
});
