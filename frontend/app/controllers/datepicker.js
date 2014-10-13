define(['./module'],function(controllers){
	'use strict';
	controllers.controller('datePicker',['$scope','$rootScope','todayTime', function ($scope,$rootScope, todayTime){
		$scope.todayTime = todayTime;

		$scope.clear = function () {
			$scope.dt = null;
		};

		$scope.toggleMin = function() {
			$scope.minDate = new Date("2014-02-18 00:00:00");
		};
		$scope.toggleMin();

		$scope.open = function($event, which) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which]= true;
		};

		$scope.formDataToday = new Date();

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1,
			showWeeks: 'false'
		};

		$scope.datepickers = {
	        dt: false,
	        dtSecond: false
	    }

		$scope.format = 'dd-MMMM-yyyy';
		$scope.texts = {
			close: 'Закрити',
			clear: 'Очистити',
			today: 'Сьогодні'
		}
	}]);
});