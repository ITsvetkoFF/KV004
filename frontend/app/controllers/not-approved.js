define(['./module'],function (controllers) {
    'use strict';
    controllers.controller('notApprovedCtrl', ['$scope', '$rootScope', 'UserService', 'adminToShowProblemService', function ($scope, $rootScope, UserService, adminToShowProblemService) {
        $scope.isAdministrator = UserService.isAdministrator;

        if ($scope.isAdministrator()) {
            adminToShowProblemService.getNotApprovedProblem(function (notApproved) {
                $scope.notApproved = notApproved;
                if (adminToShowProblemService.getNotApprovedProblemListQty()) {
                    $scope.showProblem($scope.notApproved[0]);
                }
            });

        }

        $scope.showProblem = function (problem) {

            adminToShowProblemService.showScopeNotApprovedProblemFromList(problem);
        };

        $scope.editProblem = function (problem) {
            window.location.href = "#/problem/showProblem/" + problem.Id;
        };

        $scope.approveProblem = function (problem) {
            if (UserService.getSaveChangeStatus()) {
                $scope.notApproved = adminToShowProblemService.deleteNotApprovedProblemFromList(problem);
                adminToShowProblemService.approveNotApprovedProblem(problem).then(function () {
                    if (adminToShowProblemService.getNotApprovedProblemListQty()) {
                        adminToShowProblemService.showScopeNotApprovedProblemFromList($scope.notApproved[0]);
                    } else {
                        $scope.swipeHide();
                        adminToShowProblemService.redirectToMap('#/map');
                        
                    }
                })
            }
        };

        $scope.deleteProblem = function (problem) {
            if (UserService.getSaveChangeStatus()) {
                $scope.notApproved = adminToShowProblemService.deleteNotApprovedProblemFromList(problem);
                adminToShowProblemService.deleteNotApprovedProblemDB(problem).then(function () {
                    if (adminToShowProblemService.getNotApprovedProblemListQty()) {
                        adminToShowProblemService.showScopeNotApprovedProblemFromList($scope.notApproved[0]);
                    } else {
                         $scope.swipeHide();
                        adminToShowProblemService.redirectToMap('#/map');
                       
                    }
                })
            }
        };


    }]);
});
