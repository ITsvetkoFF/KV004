define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('mapLoadCtrl', ['$scope','ProblemService', '$rootScope','UserService', '$routeParams','$route','$location','todayTime', '$timeout', 'windowWidth', function ($scope, ProblemService, $rootScope, UserService,  $routeParams, $route,$location, todayTime, $timeout, windowWidth) {
        $scope.isAdministrator = UserService.isAdministrator;
        $scope.getWindowDimensions = windowWidth.getWindowDimensions;

        $rootScope.$broadcast('Update',"");

        var tiles   = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            minZoom: 2,
            detectRetina: true,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        var geoJson = L.geoJson (ukraineBorders, {
            style: {
                opacity:     0,
                fillOpacity: 0
            }
        });
        var latlng  = L.latLng(50.00, 32.00);

        L.Map.prototype.panToOffset = function (latlng, offset, options) {
            var x = this.latLngToContainerPoint(latlng).x - offset[0];
            var y = this.latLngToContainerPoint(latlng).y - offset[1];
            var point = this.containerPointToLatLng([x, y]);
            return this.setView(point, this._zoom, { pan: options });
        };

        $scope.map     = L.map('map-content', {
            center: latlng,
            zoom: 7,
            minZoom: 6,
            maxBounds: L.latLngBounds( L.latLng(43, 19), L.latLng(53, 46) ),
            layers:[tiles, geoJson] //disabling geoJson because of blocking ukraine-zone on the map
        });
        $timeout($scope.map.invalidateSize.bind($scope.map),200);
        $rootScope.geoJson = geoJson; //forwarding geoJson object to $rooTscope
        var markers = L.markerClusterGroup();
        $scope.data = {};
        var markerIcon;

        $rootScope.getProblemsAndPlaceMarkers = function(){
            ProblemService.getAllProblemsFromDb()
                .success(function (data) {
                    $scope.data = data;
                    placeMarkers($scope.data);
            })
                .error(function (data, status, headers, config) {
                    throw error;
                });

        };
        $scope.getProblemsAndPlaceMarkers();

        $scope.locateUser = function() {
            navigator.geolocation.getCurrentPosition(getUserPosition);
            var width = $scope.getWindowDimensions();
            function getUserPosition(position) {
                var mapCenter = [
                    position.coords.latitude,
                    position.coords.longitude
                ];
                if (width < 1000) {
                    $scope.map.panToOffset(mapCenter, [0,90]);
                }else{
                    $scope.map.setView(mapCenter, 10);
                }
            }
        }

        function onMarkerClick(marker){
            if (UserService.getSaveChangeStatus()){
                $scope.uploadRightSide = false;
                window.location.href = "#/map";
                window.location.href="#/problem/showProblem/"+ this._id;
                var width = $scope.getWindowDimensions();
                if (width < 1000) {
                    $scope.map.setView(marker.latlng);
                }else{
                    $scope.map.panToOffset(marker.latlng, [-200,0]);
                }
                
            }

        }

        function placeMarkers(data) {
            markers.clearLayers();
            var newData = userSelectionFilterMarkers(data);
            angular.forEach(newData, function (location) {
                markerIcon = L.icon({
                    iconUrl : 'images/markers/'+location['ProblemTypes_Id']+ '.png',
                    iconAnchor: [25,79]
                });

                var marker = L.marker([location.Latitude, location.Longtitude], {icon: markerIcon});
                marker.on('click', onMarkerClick);
                marker._id = location['Id'];
                markers.addLayer(marker);
                $scope.map.addLayer(markers);
            });
            $scope.map.addLayer(markers);
        };

        function userSelectionFilterMarkers(data) {
            var tempData = [];
            for (var i = 0; i < data.length; i++) {
                var location = data[i];
                var problemTypeSelected = isSelected($scope.problemTypes, location.ProblemTypes_Id);
                var problemStatusSelected = isSelected($scope.problemStatuses, location.Status);
                if (problemTypeSelected && problemStatusSelected){
                    tempData.push(location);
                }
            };
            var newData = dateRange(tempData);
            return newData;
        };

        function isSelected(filtersArray, ProblemTypes_Id) {
            for (var i = 0; i < filtersArray.length; i++) {
                if (filtersArray[i].id == ProblemTypes_Id) {
                    return filtersArray[i].selected;
                }
            };
        };

        function dateRange (data) {
            var dateFrom = Date.parse(todayTime.formDataDt);
            var dateTill = Date.parse(todayTime.formDataDtSecond);
            var tempData = [];
            for (var i = 0; i < data.length; i++) {
                var location = data[i];
                var locationDate = Date.parse(location.Date);
                if (dateFrom < locationDate && locationDate < dateTill) {
                    tempData.push(location);
                };
            };
            var newData = tempData;
            return newData;
        }

        $scope.problemTypes = [
            {name: 'Проблеми лісів',            id: 1, selected: true},
            {name: 'Сміттєзвалища',             id: 2, selected: true},
            {name: 'Незаконна забудова',        id: 3, selected: true},
            {name: 'Проблеми водойм',           id: 4, selected: true},
            {name: 'Загрози біорізноманіттю',   id: 5, selected: true},
            {name: 'Браконьєрство',             id: 6, selected: true},
            {name: 'Інші проблеми',             id: 7, selected: true}
        ];

        $scope.problemStatuses = [
            {name: 'Нова',     id: 0, selected: true},
            {name: 'Вирішена', id: 1, selected: true}
        ];

        $scope.placeUserProblemsChecker;
        $scope.toggleSelection = function () {
            if($scope.placeUserProblemsChecker)
                placeMarkers($scope.dataUserProblems);
            else
                placeMarkers($scope.data);
        };

    }]);
});
