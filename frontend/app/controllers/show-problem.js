define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl',['$scope','$routeParams','$http','ipCookie','$rootScope','$modal','adminToShowProblemService','$window','UserService', function ($scope,$routeParams,$http,ipCookie,$rootScope,$modal,adminToShowProblemService,$window, UserService){


        adminToShowProblemService.setEditStatus($scope.isAdministrator());
        $scope.editStatusClass = adminToShowProblemService.getEditStatus(3);
        $scope.delStatus = adminToShowProblemService.getEditStatus(0);
        if(adminToShowProblemService.getNotApprovedProblemListQty () != 0){
            $scope.addStatus = adminToShowProblemService.getEditStatus(2);
        }else{
            $scope.addStatus = adminToShowProblemService.getEditStatus(3);
        }

        $rootScope.$broadcast('Update',"_problem");
        $rootScope.$emit('showSlider','false');
        $scope.showSlider = false;
        $scope.showSliderFunc = function(){
            $rootScope.$emit('showSlider','true');
            $rootScope.$emit('get');
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
        var problem ='';
        var problemModerationStatus = '';
        var tempContent = '';
        //get problem info
            var res=$http.get("api/problems/"+$routeParams.problemID);



        res.success(function (data, status, headers, config) {
            $scope.problem = data[0][0];
            problem = data[0][0];
            userID = data[2][0].Users_Id;
            problemID = parseInt(data[0][0].Id);
            $scope.problem.Severity = parseInt(data[0][0].Severity) || 1;
            $scope.problem.Content = data[0][0].Content || 'опис відсутній';
            $scope.problem.Title = data[0][0].Title || 'назва відсутня';
            $scope.problem.CreatedDate = data[2][0].Date;
            $scope.photos = data[1];
            $rootScope.photos = $scope.photos;
            $scope.problem.Status = data[0][0].Status?"Вирішина":"Актуальна";
            $scope.checked = data[0][0].Status?1:0;
            problemModerationStatus = data[0][0].Moderation ;
            $scope.problem.Votes = data[0][0].Votes;
            var tempUser = JSON.parse(data[2][0].Content);
            $scope.problem.userName = tempUser.userName;

            $scope.$watch('problem.Status', function(newValue, oldValue) {
                if(newValue != oldValue ) {
                    $scope.editStatusClass =  adminToShowProblemService.getEditStatus(1);
                    $scope.problem.Status = newValue;
                    UserService.setSaveChangeStatus(false);
                }
            });
            $scope.$watch('problem.Title', function(newValue, oldValue) {
                if(newValue != oldValue ){
                    $scope.editStatusClass =  adminToShowProblemService.getEditStatus(1);
                    $scope.problem.Title = newValue;
                    UserService.setSaveChangeStatus(false);
                }
            });
            $scope.$watch('problem.Severity', function(newValue, oldValue) {
                if(newValue != oldValue ) {
                    $scope.editStatusClass =  adminToShowProblemService.getEditStatus(1);
                    $scope.problem.Severity = newValue;
                    UserService.setSaveChangeStatus(false);

                }
            });
            $scope.$watch('problem.Content', function(newValue, oldValue) {
                if(newValue != oldValue && UserService.getSaveChangeStatus() == true) {
                    $scope.$parent.problem.Content = newValue;
                    UserService.setSaveChangeStatus(false);
                    console.log('apply');
                    $scope.$parent.editStatusClass =  adminToShowProblemService.getEditStatus(1);
                }
            });
            $scope.$watch('problem.Proposal', function(newValue, oldValue) {
                if(newValue != oldValue && UserService.getSaveChangeStatus() == true) {
                    $scope.$parent.problem.Proposal = newValue;
                    UserService.setSaveChangeStatus(false);
                    console.log('apply');
                    $scope.$parent.editStatusClass =  adminToShowProblemService.getEditStatus(1);
                }
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
                acceptedFiles:'.jpg,.jpeg',
                dictFileTooBig: "Файл великого розміру ({{filesize}}MB). Максимальний розмір файлу: {{maxFilesize}}MB.", 
     
  
                dictInvalidFileType:"Невірний формат файлу. Допустимі формати : jpg,jpeg",
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
                $scope.problem.Votes++;
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

        //if user did not submit changes
        $rootScope.$on('$locationChangeStart', function(event) {
            if (!UserService.getSaveChangeStatus()) {
                event.preventDefault();
            }
        });

        //save changes to db
        $scope.saveChangestoDb = function() {
            adminToShowProblemService.saveChangestoDbProblemDescription(problem, $scope.problem.Severity, $scope.problem.Content,$scope.problem.Proposal,$scope.problem.Title, $scope.checked)
                .then(function() {
                    adminToShowProblemService.showScopeNotApprovedProblemFromList(problem);
                    $scope.editStatusClass = adminToShowProblemService.getEditStatus(3);
                    UserService.setSaveChangeStatus(true);
                });
        };

        //addproblemtoDB
        $scope.addProblemToDB = function(){
            if(UserService.getSaveChangeStatus()){
                $scope.notApproved = adminToShowProblemService.deleteNotApprovedProblemFromList(problem);
                adminToShowProblemService.approveNotApprovedProblem(problem).then(function(){
                    if(adminToShowProblemService.getNotApprovedProblemListQty()){
                        adminToShowProblemService.showScopeNotApprovedProblemFromList($scope.notApproved[0]);
                    } else {
                        adminToShowProblemService.redirectToMap();
                    }
                })
            }
        }

        //delete problem from DB
        $scope.deleteProblemFromDb = function(){
            $scope.open('sm') ;
        };

        //modal window
        $scope.open = function (size) {

            var modalInstance = $modal.open({
                template:'<div class="modal-header">'+
                    '<h3 class="modal-title">Увага</h3>'+
                    '</div>'+
                    '<div class="modal-body">'+
                    'Будь ласка, підтвердіть видалення проблеми'+
                    '</div>' +
                    ' <div class="modal-footer">'+
                    '<button class="btn btn-primary" ng-click="ok()">OK</button>'+
                    '<button class="btn btn-warning1" ng-click="cancel()">Cancel</button>'+
                    '</div>',
                controller: 'ModalInstanceCtrl',
                size: size
            });

            modalInstance.result.then(
                function () {
                    if($scope.isAdministrator()){
                        if(problemModerationStatus) {
                            adminToShowProblemService.deleteNotApprovedProblemDB(problem).then(function() {
                                window.location.href="#/map";
                                $scope.swipeHide();
                                $rootScope.getProblemsAndPlaceMarkers();
                            })
                        } else {
                            if(UserService.getSaveChangeStatus()){
                                $scope.notApproved = adminToShowProblemService.deleteNotApprovedProblemFromList(problem);
                                adminToShowProblemService.deleteNotApprovedProblemDB(problem).then(function() {
                                    if(adminToShowProblemService.getNotApprovedProblemListQty()){
                                        adminToShowProblemService.showScopeNotApprovedProblemFromList($scope.notApproved[0]);
                                    } else {

                                        adminToShowProblemService.redirectToMap();//window.location.href='#/map';

                                    }
                                })
                            }
                        }
                    }
                },
                function(){
                    return true;
                }
            );
        };
    }]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
        controllers.controller('ModalInstanceCtrl', function ($scope,$rootScope, $modalInstance) {

            $scope.ok = function () {
                $modalInstance.close('ok');
                $rootScope.$broadcast("Update","");
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        });

});
