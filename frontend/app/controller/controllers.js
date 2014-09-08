var mapControllers = angular.module('mapControllers', []);

mapControllers.controller('mapLoadCtrl', ['$scope',
  function ($scope) {
      var map = L.map('map-content').setView([50.45, 30.52], 7);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var marker = L.marker([50.45, 30.52]);
      marker.addTo(map);
  }]);

mapControllers.controller('addProblemCtrl', ['$scope',
  function ($scope) {
  }]);

mapControllers.controller('showProblemCtrl', ['$scope',
  function ($scope) {

  }]);

mapControllers.controller('showAdminPageCtrl', ['$scope',
  function ($scope) {
      $(".b-container__right-side").css("display", "block");
      $(".b-container__right-side").css("width", "50%");
  }]);
