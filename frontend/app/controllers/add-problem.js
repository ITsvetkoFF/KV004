define(['./module'],function (controllers){
    'use strict';
    controllers.controller('addProblemCtrl', function ($scope){
        $scope.showStep_1 = true;

        console.log("Add Problem Controller is loaded");

        //function that places marker on the map
        function getCoordinates(e) {

            console.log(e.latlng);                                             // logs into console clicked position !!!need to remove in production
            $scope.$apply(function(){$scope.latitude = e.latlng.lat;});        // binds lat value to the input on the form
            $scope.$apply(function(){$scope.longtitude = e.latlng.lng;});      // binds lng value to the input on the form

            $scope.geoJson.addLayer(L.marker([$scope.latitude, $scope.longtitude], // adding marker to the map
                    {/*icon: L.icon({                                          // commented, cause we dont have special mark for placing new Marker
                        iconUrl: 'images/markers/other_icon.png',
                        iconAnchor: [25,79]
                    })
                        ,*/ draggable: true
                    }).on('drag', function(e){console.log(e.target._latlng);   // onDrag listener for Marker that binds lat & lng values to the input on the form !!!need to remove in production console.logging
                        $scope.$apply(function(){$scope.latitude = e.target._latlng.lat;});
                        $scope.$apply(function(){$scope.longtitude = e.target._latlng.lng;});
                    })
            );
            $scope.clearGetCoordinatesListener();                              // disable onMapClickListener that binds eventListener "click" & function that places marker on the map
        }

        $scope.clearGetCoordinatesListener = function() {                      // function with disabling onMapClickListener functionality
            $scope.geoJson.off('click', getCoordinates);
        };

        $scope.geoJson.on('click', getCoordinates); // enable onMapClickListener that binds eventListener "click" & function that places marker on the map
        

        function allHidden() {
            $scope.showStep_1 = false;
            $scope.showStep_2 = false;
            $scope.showStep_3 = false;
        }

        //**********Misha's script*************

        $scope.showFirst = function () {
            allHidden();
            $scope.showStep_1 = true;
        };

        $scope.showSecond = function () {
            allHidden();
            $scope.showStep_2 = true;
        };

        $scope.showThird = function () {
            allHidden();
            $scope.showStep_3 = true;
        };

        //*************************************

        $scope.nextButton_Step1 = function () {
            $scope.showStep_1 = false;
            $scope.showStep_2 = true;
        };


        $scope.nextButton_Step2 = function () {

            $scope.showStep_2 = false;
            $scope.showStep_3 = true;
        };

        $scope.backButton_Step2 = function () {

            $scope.showStep_2 = false;
            $scope.showStep_1 = true;
        };

        $scope.nextButton_Step3 = function () {

            $scope.showStep_2 = false;
        };

        $scope.backButton_Step3 = function () {

            $scope.showStep_2 = true;
            $scope.showStep_3 = false;
        };

        $scope.showRegFormButtonClick = function () {
            $scope.showRegForm = true;
        };

        $scope.dropzoneConfig = {
            'options':{autoProcessQueue:false,
                url:'/api/problempost',
                method:"POST",
                uploadMultiple:true,
                maxFilesize:10,
                parallelUploads:10,
                thumbnailWidth:100,
                thumbnailHeight:100,
                clickable:".previews",
                previewsContainer:".previews"
            }
        }


    });
});