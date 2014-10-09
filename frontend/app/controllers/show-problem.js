define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl',['$scope','$routeParams','$http','ipCookie','$rootScope', function ($scope,$routeParams,$http,ipCookie,$rootScope){
        $rootScope.getProblemsAndPlaceMarkers();
        if (!$scope.isAdministrator()){
            $scope.editStatus = 'btn-editStatus';
            $scope.delStatus = 'btn-delete';
        } else {
            $scope.editStatus = 'btn-warning';
            $scope.delStatus = 'btn-danger';
        }

        $rootScope.$broadcast('Update',"_problem");
        $rootScope.$emit('showSlider','false');
        $scope.showSlider = false;
        $scope.showSliderFunc = function(){
            $rootScope.$emit('showSlider','true');
        }
        if(ipCookie('vote'+$routeParams.problemID)==true){
          
          $scope.disableVoteButton=true;
      }else{
          $scope.disableVoteButton=false;
      }  
        $scope.showDropField = false;
        $scope.showAddPhotoButton = true;
        var userID ='';
        var problemID = '';
        //get problem info
            var res=$http.get("api/problems/"+$routeParams.problemID);

        $scope.$watch('title', function(newValue, oldValue) {
            if (!oldValue) {
                return;
            }
            $scope.editStatus = 'btn-warning';
        });

        $scope.$watch('severity', function(newValue, oldValue) {
            if (!oldValue) {
                return;
            }
            $scope.editStatus = 'btn-warning';
        });
        $scope.$watch('content', function(newValue, oldValue) {
            if (!oldValue) {
                return;
            }
            $scope.$parent.editStatus = 'btn-warning';
            $scope.$parent.content = newValue;
        });


        res.success(function (data, status, headers, config) {
            $scope.data = data[0][0];
            userID = data[2][0].Users_Id;
            problemID = parseInt(data[0][0].Id);
            $scope.severity = parseInt(data[0][0].Severity);
            $scope.content = data[0][0].Content;
            $scope.title = data[0][0].Title;
            $scope.createdDate = data[2][0].Date;
            $scope.photos = data[1];
            $rootScope.photos = $scope.photos;
            $scope.status = data[0][0].Status ? 'Активна' : 'Вирішена';
            $scope.checked = data[0][0].Status;
                console.log("$scope.checked=" + $scope.checked);
            $scope.votes = data[0][0].Votes;

                //get user info by UserID
                res = $http.get("api/users/"+userID);
                res.success(function(data,status,headers,config){
                    $scope.userName = angular.fromJson(data).json[0].Name;
                });
                //end get user info by UserID

            $scope.$watch('status', function(newValue, oldValue) {
                if (!oldValue) {
                    return;
                }
                if (!$scope.isAdministrator()) {
                    $scope.editStatus = 'btn-editStatus';
                };

            });

            $scope.activities = data[2].reverse();
            for(var i=0;i<$scope.activities.length;i++){
                if($scope.activities[i].userId!=1) {
                    $scope.activities[i].Content = JSON.parse($scope.activities[i].Content);
                }
            }

        });
        res.error(function(err){
            throw err;
        });
        //end get problem request info


        $scope.dropzoneConfig = {
            'options':{autoProcessQueue:false,
                url:'/api/photo/'+$routeParams.problemID,
                method:"POST",
                uploadMultiple:true,
                maxFilesize:10,
                parallelUploads:10,
                thumbnailWidth:100,
                thumbnailHeight:100,
                clickable:".previews,.b-details-body-problem-photo_add",
                previewsContainer:".previews"
            }
        };
        $scope.showDrop = function(){
            if($scope.showDropField==false)
            {
                $scope.showDropField = true;
                $scope.showAddPhotoButton = false;
            }
            else{
                $scope.showDropField = false;
            }
        };
        $scope.hideAddPhotoForm = function(){
            $scope.showDropField = false;
            $scope.showAddPhotoButton = true;
            //window.location.href="#/problem/showProblem/"+$routeParams.problemID;
        }
        //activity
        $scope.addOneVote = function(){

            var responce = $http.post('/api/vote',{idProblem:$routeParams.problemID,userId:$scope.userId,userName:$scope.name});
            responce.success(function(data,status,headers,config){
                $scope.data.Votes++;
                ipCookie('vote'+$routeParams.problemID,true);
                $scope.disableVoteButton=true;
                window.location.href="#/problem/showProblem/"+$routeParams.problemID;


            });
            responce.error(function(data,status,headers,config){
                throw error;
            });
            window.location.href="#/problem/showProblem/"+$routeParams.problemID;
        }

        $scope.addComment = function(comment) {
            console.log(comment);
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

        }
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

        }
        $scope.icons=[];
        $scope.icons[1]="fa-map-marker";
        $scope.icons[2]="fa-pencil";
        $scope.icons[3]="fa-heart";
        $scope.icons[4]="fa-file-image-o";
        $scope.icons[5]="fa-weixin";


        $scope.checkpoint = [true,true,true,true,true,true];
        $scope.filterActivity = function(i){

            if($scope.checkpoint[i]==true){
                $scope.checkpoint[i]=false;
                $scope.x=0.3;

            }
            else{

                $scope.checkpoint[i]=true;

                $scope.x=0.7;

            }

        }

        //save changes to db
        $scope.saveChangestoDb = function(){
            var title = $scope.title;
            var severity = $scope.severity;
            var problemStatus = $scope.checked ?0:1;
            var content = $scope.content;
            $http.put('/api/editProblem/' + problemID, {Title: title, Content: content, Severity: severity, ProblemStatus: problemStatus})
                .success(function () {
                    console.log('Problem description with '+ problemID + 'updated');
                    $scope.editStatus = 'btn-editStatus';

                })
                .error(function (status, data) {
                    console.log(status);
                    console.log(data);
                });
        }

        //delete problem from DB
        $scope.deleteProblemFromDb = function(){
            $http.delete('/api/problem/' + problemID,{id:problemID} )
                .success(function () {
                    console.log('Problem with '+ problemID + 'has been deleted');
                    $rootScope.getProblemsAndPlaceMarkers();
                })
                .error(function (status, data) {
                    console.log(status);
                    console.log(data);
                });
        }

    }]);





});
