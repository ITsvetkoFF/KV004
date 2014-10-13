define(['./module'],function(controllers){
    'use strict';
    ////////////



    controllers.controller('SocketUserCtrl', function ($log, $scope, chatSocket, messageFormatter,$rootScope,$interval,$http) {
        
        $scope.messageLogHide="_hide";
        $scope.showNewsContainer=false;
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
        var responce = $http.post('/api/getNews',{});
        responce.success(function(data,status,headers,config){
            $scope.messageLogs=data.news;
            for(var i=0;i<$scope.messageLogs.length;i++){
                $scope.messageLogs[i].show="none";
                $scope.allNews+=$scope.messageLogs[i].Content+". ";
            }
            if($scope.messageLogs[0]!=undefined){$scope.showNewsContainer=true;}

        });
        responce.error(function(data,status,headers,config){
            throw error;
        });


        $scope.interval = $interval(repeat, 5000);







        $scope.$on('socket:broadcast', function(event, data) {
            $scope.showNewsContainer=true;

            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function() {
                //$scope.messageLog = messageFormatter(new Date(), data.source, data.payload) + $scope.messageLog;
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
                    if (data.payload == "clear") {
                        $scope.messageLogs = [];
                        $scope.allNews = "";
                        $scope.showNewsContainer = false;

                    } else {
                        news.show = "none";
                        news.Content = data.payload;
                        $scope.allNews += data.payload + ". ";
                        $scope.messageLogs.push(news);
                        // $scope.messageLogs[$scope.messageLogs.length-1].show="none";
                        //console.log($scope.messageLog);
                        // $rootScope.messageLog=$scope.messageLogs;
                        // $rootScope.$broadcast('Update');
                        var i = 0;

                        //$scope.messageLogHide = "";
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
                    }

                }

            });
        });
    });

    ///////////



});
