define(['./module'],function(controllers){
    'use strict';
    controllers.controller('statsCtrl',['$scope','$rootScope','$http','StatisticService', function($scope, $rootScope, $http,StatisticService){
       $rootScope.$broadcast('Update', '_full');
       StatisticService.getStatistic4()
           .success(function(data) {
               $scope.mostPopular = data[0];
               $scope.mostImportant = data[1];
               $scope.mostComment = data[2];

       })
           .error(function (data, status, headers, config) {
               throw error;
           });

       StatisticService.getStatistic3()
           .success(function(data) {
               $scope.votes = data[0][0].votes;
               $scope.problems = data[0][0].problems;
               $scope.comments = data[2][0].comments;
               $scope.photos = data[1][0].photos;
       })
           .error(function (data, status, headers, config) {
               throw error;
           });

       Date.prototype.addHours= function(h) {
       var copiedDate = new Date(this.getTime());
       copiedDate.setHours(copiedDate.getHours()+h);
       return copiedDate;
}

  $scope.chart = StatisticService.getChart;

  $scope.pie = function(val){
    for (var styles in $scope.style) {
      if ($scope.style[styles] == 'currentPeriod') $scope.style[styles] = undefined;
        }
        $scope.style[val] = 'currentPeriod';
      StatisticService.getPie(val);

  };
    }]);
});