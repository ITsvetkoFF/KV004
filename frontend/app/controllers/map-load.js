define(['./module'], function (controllers) {
    'use strict';
    controllers.directive('problemFilters', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/templates/filters.html'
        }
    });
    controllers.controller('mapLoadCtrl', ['$scope','$http', function ($scope, $http) {
    	
		var map = L.map('map-content');
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

         var marker_icon;
        //var tiles   = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
		navigator.geolocation.getCurrentPosition(getUserPosition);
		//var map     = L.map('map-content', {maxZoom: 18, tiles:[tiles]);
		var markers = L.markerClusterGroup();
        $scope.data = {};

        $http({ method: 'GET', url: 'http://ita-kv.tk:8090/api/problems' }).success(function (data) {
            $scope.data = data;
            placeMarkers($scope.data);
        });

        function getUserPosition(position) {
            var mapCenter = [
                position.coords.latitude,
                position.coords.longitude
            ];
            map.setView(mapCenter, 10);
        }

        function placeMarkers(data) {
            markers.clearLayers();
            var newData = userSelectionFilterMarkers(data);
            angular.forEach(newData, function (location) {
            	switch (location['ProblemTypes_Id']) {
				    case 1:                                    
				        marker_icon = L.icon({
				            iconUrl: 'images/markers/deforestation_icon.png'
				        });
				        break;
				    case 2:
				        marker_icon = L.icon({
				            iconUrl: 'images/markers/waste_icon.png'
				        });
				        break;
				    case 3:                                    
				        marker_icon = L.icon({
				            iconUrl: 'images/markers/construction_icon.png'
				        });
				        break;
				    case 4:                                    
				        marker_icon = L.icon({
				            iconUrl: 'images/markers/water_icon.png'
				        });
				        break;
				    case 5:                                    
				        marker_icon = L.icon({
				            iconUrl: 'images/markers/biodiversity_icon_2.png'
				        });
				        break;
				    case 6:                                    
				        marker_icon = L.icon({
				            iconUrl: 'images/markers/poaching_icon.png'
				        });
				        break;
				    case 7:                                    
				        marker_icon = L.icon({
				            iconUrl: 'images/markers/other_icon.png'
				        });
				        break;
				    default:
				        break;
				}; 

	        	var marker = L.marker([location.Latitude, location.Longtitude], {icon: marker_icon});
	        	marker.on('click', onMarkerClick);
	        	marker._id = location['Id'];
	        	markers.addLayer(marker);
                map.addLayer(markers);
            });
        };

        function onMarkerClick(){
        	window.location.href="/problem/showProblem/"+ this._id;
        }

        function userSelectionFilterMarkers(data) {
            var newData = [];
            for (var i = 0; i < data.length; i++) {
                var location = data[i];
    			var problemTypeSelected = isSelected($scope.problemTypes, location.ProblemTypes_Id);
    			var problemStatusSelected = isSelected($scope.problemStatuses, location.Status);
    			if (problemTypeSelected && problemStatusSelected){
    			    newData.push(location);
    			}
            };
            return newData;
    	};

        function isSelected(filtersArray, ProblemTypes_Id) {
            for (var i = 0; i < filtersArray.length; i++) {
                if (filtersArray[i].id == ProblemTypes_Id) {
                    return filtersArray[i].selected;
    			}
    		};
    		//return undefined;
    	};

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

		$scope.toggleSelection = function () {
		    placeMarkers($scope.data);
        };

    }]);
});
