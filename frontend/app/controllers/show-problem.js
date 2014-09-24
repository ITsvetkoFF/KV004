define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl', function ($scope,$routeParams,$http,ipCookie,$rootScope){
        $rootScope.$broadcast('Update',"");

        if(ipCookie('vote'+$routeParams.problemID)==true){
          
          $scope.disableVoteButton=true;
      }else{
          $scope.disableVoteButton=false;
      }  
        $scope.showDropField = false;
        $scope.showAddPhotoButton = true;
        var userID ='';
        //get problem info
            var res=$http.get("api/problems/"+$routeParams.problemID);

            res.success(function(data,status,headers,config){
                console.log(data);
                $scope.data=data[0][0];
               // $scope.userID = data[2][0].Users_Id;
                //$scope.severity = data[0][0].Severity;
                $scope.content = data[0][0].Content;
                //$scope.createdDate = data[2][0].Date;
                console.log('$scope.severity= ' + $scope.severity);
                $scope.photos=data[1];

                //get user info by UserID
                res = $http.get("api/users/"+userID);
                res.success(function(data,status,headers,config){
                    $scope.userName = angular.fromJson(data).json[0].Name;
                });
                //end get user info by UserID


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

            });
            responce.error(function(data,status,headers,config){
                throw error;
            });
        }

        $scope.addComment = function(comment) {
            console.log(comment);
            var data = {data: {userId: $scope.userId, userName: $scope.name, Content: comment}};
            var responce = $http.post('/api/comment/' + $routeParams.problemID, JSON.stringify(data));
            responce.success(function (data, status, headers, config) {


            });
            responce.error(function (data, status, headers, config) {
                throw error;
            });

        }
        $scope.icons=[];
        $scope.icons[1]="map-marker";
        $scope.icons[2]="pencil";
        $scope.icons[3]="heart";
        $scope.icons[4]="picture";
        $scope.icons[5]="comment";

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
    });





});