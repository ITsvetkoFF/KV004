define(['./module'],function(controllers){
    'use strict';
    ////////////

    controllers.controller('SocketUserCtrl', function ($log, $scope, SocketService,$rootScope,$interval,$http) {

        $scope.messageLogHide="_hide";
        $scope.trigger= true;
        $scope.showNewsContainer=true;
        $scope.allNews="";
        $scope.nickName = $scope.name;
        var i = 0;
        var repeat = function () {
            for (var j = 0; j < $scope.messageLogs.length; j++) {
                if ($scope.messageLogs[j]) {
                    $scope.messageLogs[j].show = "none";
                }
            }
            if ($scope.messageLogs[i]) {
                $scope.messageLogs[i].show = "block";

                i++;
                if (i >= $scope.messageLogs.length) {
                    i = 0;
                }
            }
        }
        $scope.messageLogs = [];
        $scope.messageChat =[];
        SocketService.getNewsFromDb(updateScopeAfterGettingNews);
        function updateScopeAfterGettingNews(data){
            $scope.messageLogs=data.news;
            for(var i=0;i<$scope.messageLogs.length;i++){
                $scope.messageLogs[i].show="none";
                $scope.allNews+=$scope.messageLogs[i].Content+". ";
            }
            if($scope.messageLogs[0]!=undefined){$scope.showNewsContainer=true;}
        }
        $scope.interval = $interval(repeat, 5000);
        $scope.$on('socket:broadcast', function(event, data) {
            $scope.showNewsContainer=true;

            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function() {
                var news={};
                if(!isNaN(data.payload)){
                    $scope.messageLogs.splice(data.payload-1,1);
                    $scope.allNews="";
                    for(var i=0;i<$scope.messageLogs.length;i++){

                        $scope.allNews+=$scope.messageLogs[i].Content+". ";
                    }
                    if($scope.allNews==""){
                        $scope.showNewsContainer = false;
                    }

                }else {

                        if (data.payload.trigger != true) {
                            $scope.trigger = true;
                            news.show = "none";
                            news.Content = data.payload;
                            $scope.allNews += data.payload + ". ";
                            $scope.messageLogs.push(news);
                            var i = 0;
                            var repeat = function () {
                                for (var j = 0; j < $scope.messageLogs.length; j++) {
                                    if ($scope.messageLogs[j]) {
                                        $scope.messageLogs[j].show = "none";
                                    }
                                }
                                if ($scope.messageLogs[i]) {
                                    $scope.messageLogs[i].show = "block";

                                    i++;
                                    if (i >= $scope.messageLogs.length) {
                                        i = 0;
                                    }
                                }

                            }
                            $interval.cancel($scope.interval);
                            $scope.interval = $interval(repeat, 5000);

                        }else if($scope.messageLogs.length<1){
                            $scope.messageChat = [];
                            var timeOfComment = data.payload.date.substring(0,10)+" "+data.payload.date.substring(11,19);
                            $scope.messageChat.push({problemID:data.payload.id,userName:data.payload.user,Content:data.payload.Content,date:timeOfComment});
                            $scope.trigger = false;
                            $scope.interval = $interval(repeat, 5000);


                        }
                    }



            });
        });
    });





});
