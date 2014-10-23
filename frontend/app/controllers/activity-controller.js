define(['./module'], function (controllers) {

    'use strict';

    controllers.controller('ActivityCtrl', ['$scope', '$rootScope', '$routeParams','$http', function ($scope,$rootScope, $routeParams,$http) {

        $scope.addComment = function(comment) {
            if(comment==""|| comment == undefined){
                alert("Неможливо відправити пусте повідомлення");
                return;
            }
            var data = {data: {userId: $scope.userId, userName: $scope.name, Content: comment}};
            var responce = $http.post('/api/comment/' + $routeParams.problemID, JSON.stringify(data));
            responce.success(function (data, status, headers, config) {
                $scope.activities = data[0].reverse();
                for(var i=0;i<$scope.activities.length;i++){
                    if($scope.activities[i].userId!=1) {
                        $scope.activities[i].Content = JSON.parse($scope.activities[i].Content);
                    }
                }

                $scope.commentContent="";


            });
            responce.error(function (data, status, headers, config) {
                throw error;
            });

        };
        $scope.deleteComment = function(id) {
            var responce = $http.delete('/api/activity/' + id);
            responce.success(function (data, status, headers, config) {
                for(var i=0;i<$scope.activities.length;i++){
                    if($scope.activities[i].Id==id) {
                        $scope.activities.splice(i,1);
                    }
                }

                $scope.commentContent="";
            });
            responce.error(function (data, status, headers, config) {
                throw error;
            });

        };
    }]);
});
