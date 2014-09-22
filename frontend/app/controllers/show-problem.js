define(['./module' ], function(controllers  ){
    'use strict';
    controllers.controller('showProblemCtrl', function ($scope,$routeParams,$http){
        $scope.showDropField = false;
        $scope.showAddPhotoButton = true;
        var userID ='';
        //get problem info
            var res=$http.get("api/problems/"+$routeParams.problemID);

            res.success(function(data,status,headers,config){
                $scope.data=data[0][0];
                $scope.userID = data[2][0].Users_Id;
                $scope.severity = data[0][0].Severity;
                $scope.content = data[0][0].Content;
                $scope.createdDate = data[2][0].Date;
                console.log('$scope.severity= ' + $scope.severity);
                $scope.photos=data[1];

                //get user info by UserID
                res = $http.get("api/users/"+userID);
                res.success(function(data,status,headers,config){
                    $scope.userName = angular.fromJson(data).json[0].Name;
                });
                //end get user info by UserID

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
        };
        // Severity rate information

        // end severity rate



    });

});