define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl',['$scope','$routeParams','ProblemService','ipCookie','$rootScope','$modal','adminToShowProblemService','$window','UserService','ActivityService','$route', function ($scope,$routeParams,ProblemService,ipCookie,$rootScope,$modal,adminToShowProblemService,$window, UserService,ActivityService,$route){
        $scope.isAdministrator = UserService.isAdministrator;

        if($scope.uploadRightSide){
            $route.reload();
        }
        $scope.fileSizeLeft = 20;
        $scope.fileCountLeft = 10;
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
        var userID;
        var problemID;
        var problem;
        var activity;
        var tempStatus;
        var problemModerationStatus;
        var tempContent = '';
        //get problem info
        ProblemService.getProblemByIdFromDb($routeParams.problemID).success(function (data) {
            if(data.error) {
                $rootScope.$broadcast('Update',"_hide");
                window.location.href="#/map";
            } else {
                problem = data[0][0];
                $scope.problem =  problem;
                $scope.problem.Coordinates = {
                    lat: data[0][0].Latitude,
                    lng: data[0][0].Longtitude
                };
                activity = data[2][0];
                userID =activity.Users_Id;
                problemID = parseInt(problem.Id);
                $scope.problem.Severity = parseInt(problem.Severity) || 1;
                $scope.problem.Content = problem.Content || 'опис відсутній';
                $scope.problem.Title = problem.Title || 'назва відсутня';
                $scope.problem.CreatedDate =activity.Date;
                $scope.photos = data[1];
                $scope.path = "images/markers/" + problem.ProblemTypes_Id + ".png";
                 var width = $scope.getWindowDimensions();
                if (width < 1000) {
                    $rootScope.map.panToOffset($scope.problem.Coordinates, 0, 90, 0, 0);
                }else{
                    $rootScope.map.panToOffset($scope.problem.Coordinates, 0, 0, 600 ,0);
                }
                $rootScope.photos = $scope.photos;
                $scope.checkedbox = problem.Status?1:0;
                problemModerationStatus = problem.Moderation ;
                $scope.problem.Votes = problem.Votes;
                var tempUser = JSON.parse(activity.Content);
                $scope.problem.userName = tempUser.userName;
                $scope.problem.Proposal = problem.Proposal;

                $scope.activities = data[2].reverse();
                for(var i=0;i<$scope.activities.length;i++){
                    if($scope.activities[i].userId!=1) {
                        $scope.activities[i].Content = JSON.parse($scope.activities[i].Content);
                    }
                }
                $scope.$watch('checkedbox', function(newValue, oldValue) {
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
                        $scope.problem.Content = newValue;
                        UserService.setSaveChangeStatus(false);
                        $scope.editStatusClass =  adminToShowProblemService.getEditStatus(1);
                    }
                });
                $scope.$watch('problem.Proposal', function(newValue, oldValue) {
                    if(newValue != oldValue && UserService.getSaveChangeStatus() == true) {
                        $scope.problem.Proposal = newValue;
                        UserService.setSaveChangeStatus(false);
                        $scope.editStatusClass =  adminToShowProblemService.getEditStatus(1);
                    }
                });
            }
        })
            .error(function (data, status, headers, config) {
                throw error;
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
               // dictFileTooBig: "Файл великого розміру ({{filesize}}MB). Максимальний розмір файлу: {{maxFilesize}}MB.",


                //dictInvalidFileType:"Невірний формат файлу. Допустимі формати : jpg,jpeg",
                clickable:".previews,.dropFieldForShowProblem",

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

        $scope.addOneVote = function(){
            ActivityService.addVoteToDbAndToCookie($routeParams.problemID,$scope.userId,$scope.name,$scope.surname).then(function(){
              $scope.problem.Votes++;
              $scope.disableVoteButton=true;
            });
        };
        $scope.deletePhoto = function(index){
            ProblemService.deletePhotoFromdb($scope.photos[index].Link)
                .success(function (data, status, headers, config) {
                    var tempArray=[];
                   for(var i =0;i<$scope.photos.length;i++)
                   {
                       if(i!=index){
                           tempArray.push($scope.photos[i]);

                       }
                   }
                    $scope.photos = tempArray;
                    console.log($scope.photos);
                })
                .error(function (data, status, headers, config) {
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

        };

        //show message over the Severity rating
        $rootScope.isReadonly = $scope.isAdministrator()?false:true;
        $scope.showStatus = false;

        var severityMessage = {
            1:'Локальна проблема (стосується будинку/двору)',
            2:'Середня проблема (стосується кількох будинків/дворів)',
            3:'Велика проблема (охоплює цілий район або місто / впливає на екологію)',
            4:'Дуже велика проблема (охоплює область або велике місто / значно впливає на екологію)',
            5:'Всеукраїнська проблема (може вплинути на всю країну / глобальна проблема)'
        };

        $scope.showMessageOverRating = function(rate){
            $scope.severityMessage = severityMessage[rate];
            $scope.showStatus = true;
            $scope.value = rate;
        };
        $scope.resetRating = function (rate){
            $scope.showStatus = false;
            $scope.value = problem.Severity;
        }
        //hide popup message for user
        $scope.hideSeverityLabel = function(){
            $scope.severityMessage = "";
            $scope.showStatus = false;
        };
        
        
        //if user did not submit changes
        $scope.$on('$locationChangeStart', function(event,next) {
            if (!UserService.getSaveChangeStatus()) {
                event.preventDefault();
                var text = 'Будь ласка, підтвердіть зміни';
                var approveCaption = 'Зберігти зміни';
                var cancelCaption = 'Скасувати';
                adminToShowProblemService.showModalMessage(text, 'sm', approveCaption, cancelCaption).then(
                    function () {
                        adminToShowProblemService.saveChangestoDbProblemDescription(problem, $scope.problem.Severity, $scope.problem.Content, $scope.problem.Proposal, $scope.problem.Title, $scope.checkedbox)
                            .then(function () {
                                adminToShowProblemService.showScopeNotApprovedProblemFromList(problem);
                                $scope.editStatusClass = adminToShowProblemService.getEditStatus(3);
                                UserService.setSaveChangeStatus(true);
                                adminToShowProblemService.redirectToMap(next);
                            });
                    },
                    function () {
                    }
                )
            }
        });

        //save changes to db
        $scope.saveChangestoDb = function() {
            adminToShowProblemService.saveChangestoDbProblemDescription(problem, $scope.problem.Severity, $scope.problem.Content,$scope.problem.Proposal,$scope.problem.Title, $scope.checkedbox)
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
                        adminToShowProblemService.redirectToMap('#/map');
                        $scope.swipeHide();
                    }
                })
            }
        }

        //delete problem from DB
        $scope.deleteProblemFromDb = function(){
        //modal window
                var text = 'Будь ласка, підтвердіть видалення проблеми';
                var approveCaption = 'Видалити проблему';
                var cancelCaption = 'Скасувати';
                adminToShowProblemService.showModalMessage(text, 'sm',approveCaption, cancelCaption).then(
                    function () {
                        if ($scope.isAdministrator()) {
                            if (problemModerationStatus) {
                                adminToShowProblemService.deleteNotApprovedProblemDB(problem).then(function () {
                                    window.location.href = "#/map";
                                    $scope.swipeHide();
                                    $rootScope.getProblemsAndPlaceMarkers();
                                })
                            } else {
                                if (UserService.getSaveChangeStatus()) {
                                    $scope.notApproved = adminToShowProblemService.deleteNotApprovedProblemFromList(problem);
                                    adminToShowProblemService.deleteNotApprovedProblemDB(problem).then(function () {
                                        if (adminToShowProblemService.getNotApprovedProblemListQty()) {
                                            adminToShowProblemService.showScopeNotApprovedProblemFromList($scope.notApproved[0]);
                                        } else {
                                            adminToShowProblemService.redirectToMap('#/map');
                                            $scope.swipeHide();

                                        }
                                    })
                                }
                            }
                        }
                    },
                    function () {
                        return true;
                    }
                );
        };
    }]);

});
