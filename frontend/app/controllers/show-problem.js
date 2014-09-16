define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl', function ($scope,$routeParams,$http){
        $scope.showDropField = false;
        $scope.showAddPhotoButton = true;

        var res=$http.get("api/problems/"+$routeParams.problemID);

        res.success(function(data,status,headers,config){

            $scope.data=data[0][0];
            $scope.photos=data[1];

        });
        res.error(function(err){
            throw err;
        });
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
        }
        $scope.showDrop = function(){
            if($scope.showDropField==false)
            {
               $scope.showDropField = true;
               $scope.showAddPhotoButton = false;
            }
            else{
                $scope.showDropField = false;
            }
        }
        $scope.hideAddPhotoForm = function(){
            $scope.showDropField = false;
            $scope.showAddPhotoButton = true;
            //window.location.href="#/problem/showProblem/"+$routeParams.problemID;
        }


    });

});