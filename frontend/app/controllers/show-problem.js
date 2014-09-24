define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl', function ($scope,$routeParams,$http,ipCookie) {

        if (ipCookie('vote' + $routeParams.problemID) == true) {

            $scope.disableVoteButton = true;
        } else {
            $scope.disableVoteButton = false;
        }
        $scope.showDropField = false;
        $scope.showAddPhotoButton = true;
        var userID = '';
        //get problem info
        var res = $http.get("api/problems/" + $routeParams.problemID);

        res.success(function (data, status, headers, config) {
            $scope.data = data[0][0];
            userID = data[2][0].Users_Id;
            $scope.severity = parseInt(data[0][0].Severity);
            $scope.content = data[0][0].Content;
            $scope.createdDate = data[2][0].Date;
            $scope.photos = data[1];
            $scope.status = data[0][0].Status ? 'Вирішена' : 'Активна';
            $scope.checked = !data[0][0].Status;
                console.log("$scope.checked=" + $scope.checked);
            $scope.votes = data[0][0].Votes;

            //get user info by UserID
            res = $http.get("api/users/" + userID);
            res.success(function (data, status, headers, config) {
                $scope.userName = angular.fromJson(data).json[0].Name;

            });
            //end get user info by UserID

        });
        res.error(function (err) {
            throw err;
        });
        //end get problem request info


        $scope.dropzoneConfig = {
            'options': {autoProcessQueue: false,
                url: '/api/photo/' + $routeParams.problemID,
                method: "POST",
                uploadMultiple: true,
                maxFilesize: 10,
                parallelUploads: 10,
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                clickable: ".previews,.b-details-body-problem-photo_add",
                previewsContainer: ".previews"
            }
        };
        $scope.showDrop = function () {
            if ($scope.showDropField == false) {
                $scope.showDropField = true;
                $scope.showAddPhotoButton = false;
            }
            else {
                $scope.showDropField = false;
            }
        };
        $scope.hideAddPhotoForm = function () {
            $scope.showDropField = false;
            $scope.showAddPhotoButton = true;
            //window.location.href="#/problem/showProblem/"+$routeParams.problemID;
        }
        $scope.addOneVote = function () {

            var responce = $http.post('/api/vote', {idProblem: $routeParams.problemID, userId: $scope.userId});
            responce.success(function (data, status, headers, config) {
                $scope.data.Votes++;
                ipCookie('vote' + $routeParams.problemID, true);
                $scope.disableVoteButton = true;

            });
            responce.error(function (data, status, headers, config) {
                throw error;
            });
        }

    });


});