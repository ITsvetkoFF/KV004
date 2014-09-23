define(['./module'],function(controllers){
    'use strict';
    controllers.directive('notApproved', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/templates/notApproved.html'
        }
    });

    controllers.controller('notApprovedCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
        $http({ method: 'GET', url: '/api/not_approved' }).success (function (data) {
            // if (data = {}) {
            //     console.log("No new problems!");
            // };
            $scope.notApproved = data;
            $scope.showProblem($scope.notApproved[0]);
        });

        $scope.showProblem = function (problem){
            window.location.href="#/problem/showProblem/"+problem.Id;
            $rootScope.$broadcast('Update',"");
        }

        $scope.approveProblem = function (problem) {
            $http({ method: 'POST', url: '/api/approve/'+problem.Id }).success (function (data) {
                console.log("Problem with Id = "+problem.Id+" is approved!")
            });
        }

        $scope.editProblem = function (problem) {
            window.location.href="#/problem/showProblem/"+problem.Id;
            $rootScope.$broadcast('Update',"");
        }

        $scope.deleteProblem = function (problem) {
            $http({ method: 'DELETE', url: '/api/problem/'+problem.Id }).success (function (data) {
                console.log("Problem with Id = "+problem.Id+" is deleted!")
            });
        }
    }]);
});