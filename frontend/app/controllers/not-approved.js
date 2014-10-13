define(['./module'],function(controllers){
    'use strict';
    controllers.controller('notApprovedCtrl', ['$scope', '$http', '$rootScope', 'UserService', function($scope, $http, $rootScope, UserService){
        $scope.isAdministrator = UserService.isAdministrator;
        $scope.notApproved = [];
        $http({ method: 'GET', url: '/api/not_approved' }).success (function (data) {
            $scope.notApproved = data;
            if ($scope.notApproved.length != 0) {
                $scope.showProblem($scope.notApproved[0]);
            }
        });

        function deleteFromList(problem){
            for (var i = 0; i < $scope.notApproved.length; i++) {
                if (problem.Id == $scope.notApproved[i].Id) {
                    var index = $scope.notApproved.indexOf(problem);
                    $scope.notApproved.splice(index, 1);
                };
            };
            if ($scope.notApproved.length != 0) {
                $scope.showProblem($scope.notApproved[0]);
            }else{
                // $scope.hideDiv();
                window.location.href="#/map"
                window.location.reload();
            }
        }

        $scope.showProblem = function (problem){
            window.location.href="#/problem/showProblem/"+problem.Id;
            $rootScope.$broadcast('Update',"");
        }

        $scope.approveProblem = function (problem) {            
            $http({ method: 'POST', url: '/api/approve/'+problem.Id }).success (function (data) {
                deleteFromList(problem);
            });
        }

        $scope.editProblem = function (problem) {
            window.location.href="#/problem/showProblem/"+problem.Id;
            $rootScope.$broadcast('Update',"");
        }

        $scope.deleteProblem = function (problem) {
            $http({ method: 'DELETE', url: '/api/problem/'+problem.Id }).success (function (data) {
                deleteFromList(problem);
            });
        }
    }]);
});