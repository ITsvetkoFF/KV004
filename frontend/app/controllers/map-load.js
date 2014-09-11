define(['./module'], function (controllers) {
    'use strict';
    controllers.directive('problemFilters', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/templates/filters.html'
        }
    });

    controllers.controller('mapLoadCtrl', ['$scope','$http', '$rootScope', function ($scope, $http, $rootScope) {
        
        var tiles   = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        	maxZoom: 16,
        	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        var geoJson = L.geoJson (ukraineBorders, {
        	style: {
        		opacity: 	 0,
        		fillOpacity: 0
        	},
        	onEachFeature: function (feature, layer) {
        		layer.on('contextmenu', function(e) {
        			alert("Замість цього повідомлення, буде відкриватися вікно 'Повідомити про проблему'");
        		});
        	}
        });
		var map     = L.map('map-content', {
			center: latlng, 
			zoom: 7, 
			layers:[tiles, geoJson]
		});

		var latlng 	= L.latLng(50.00, 32.00);
		var markers = L.markerClusterGroup();
        $scope.data = {};
        navigator.geolocation.getCurrentPosition(getUserPosition);
        var markerIcon;

        $http({ method: 'GET', url: 'api/problems' }).success(function (data) {
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

        function onMarkerClick(marker){
        	window.location.href="#/problem/showProblem/"+ this._id;
            $rootScope.$broadcast('Update',"");
    		map.panTo(marker.latlng);
        }

        function placeMarkers(data) {
            markers.clearLayers();
            var newData = userSelectionFilterMarkers(data);
            angular.forEach(newData, function (location) {
            	switch (location['ProblemTypes_Id']) {
				    case 1:                                    
				        markerIcon = L.icon({
				            iconUrl: 'images/markers/deforestation_icon.png',
				            iconAnchor: [25,79]
				        });
				        break;
				    case 2:
				        markerIcon = L.icon({
				            iconUrl: 'images/markers/waste_icon.png',
				            iconAnchor: [25,79]
				        });
				        break;
				    case 3:                                    
				        markerIcon = L.icon({
				            iconUrl: 'images/markers/construction_icon.png',
				            iconAnchor: [25,79]
				        });
				        break;
				    case 4:                                    
				        markerIcon = L.icon({
				            iconUrl: 'images/markers/water_icon.png',
				            iconAnchor: [25,79]
				        });
				        break;
				    case 5:                                    
				        markerIcon = L.icon({
				            iconUrl: 'images/markers/biodiversity_icon_2.png',
				            iconAnchor: [25,79]
				        });
				        break;
				    case 6:                                    
				        markerIcon = L.icon({
				            iconUrl: 'images/markers/poaching_icon.png',
				            iconAnchor: [25,79]
				        });
				        break;
				    case 7:                                    
				        markerIcon = L.icon({
				            iconUrl: 'images/markers/other_icon.png',
				            iconAnchor: [25,79]
				        });
				        break;
				    default:
				        break;
				}; 

	        	var marker = L.marker([location.Latitude, location.Longtitude], {icon: markerIcon});
	        	marker.on('click', onMarkerClick);
	        	marker._id = location['Id'];
	        	markers.addLayer(marker);
                map.addLayer(markers);
            });
        };

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
