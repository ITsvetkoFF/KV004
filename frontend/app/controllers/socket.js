define(['./module'],function(controllers){
    'use strict';
    ////////////



    controllers.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter,$rootScope,$interval,$http) {
        $rootScope.$broadcast('Update',"");
        $scope.deleteItem="clear";

        $scope.currentItemNews=-1;
        $scope.messageLogHide="_hide";
        $scope.nickName = $scope.name;
        var i = 0;

        //$scope.messageLogHide = "";
        var repeat = function () {
            console.log(i);
            for (var j = 0; j < $scope.messageLogs.length; j++) {
                if ($scope.messageLogs[j]) {
                    $scope.messageLogs[j].show = "none";
                }
            }
            console.log($scope.messageLogs);
            if ($scope.messageLogs[i]) {
                $scope.messageLogs[i].show = "block";

                i++;
                if (i >= $scope.messageLogs.length) {
                    i = 0;
                    console.log("reverse");
                }
            }

        }
        $scope.messageLogs = [];
        var responce = $http.post('/api/getNews',{});
        responce.success(function(data,status,headers,config){
            $scope.messageLogs=data.news;
            for(var i=0;i<$scope.messageLogs.length;i++){
                $scope.messageLogs[i].show="none";

            }
            if($scope.messageLogs[0]){$scope.showNewsContainer=false;}

        });
        responce.error(function(data,status,headers,config){
            throw error;
        });


        $scope.interval = $interval(repeat, 5000);
        $scope.sendMessage = function(message) {

            console.log("$scope.message"+$scope.message+"message"+message);

            $log.debug('sending message', message);
            chatSocket.emit('message', $scope.nickName, message);
            if(isNaN(message)) {

                var responce = $http.post('/api/postNews', {news: message});
                responce.success(function (data, status, headers, config) {


                });
                responce.error(function (data, status, headers, config) {
                    throw error;
                });
            }



            $scope.message = '';
        };

        $scope.$on('socket:broadcast', function(event, data) {


            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function() {
                //$scope.messageLog = messageFormatter(new Date(), data.source, data.payload) + $scope.messageLog;
                var news={};
                $scope.message = '';
                if(!isNaN(data.payload)){
                    console.log("!is nun");
                    console.log($scope.messageLogs[data.payload-1].Content);
                    console.log(data.payload-1);
                    var responce = $http.post('/api/clearOneNews', {content:$scope.messageLogs[data.payload-1].Content});
                    responce.success(function (data, status, headers, config) {


                    });
                    responce.error(function (data, status, headers, config) {
                        throw error;
                    });
                    $scope.messageLogs.splice(data.payload-1,1);
                }else {
                    if (data.payload == "clear") {


                        $scope.messageLogs = [];
                        var responce = $http.post('/api/clearNews', {});
                        responce.success(function (data, status, headers, config) {


                        });
                        responce.error(function (data, status, headers, config) {
                            throw error;
                        });


                    } else {
                        console.log("is NUNNUNUNUN");
                        news.show = "none";
                        news.Content = data.payload;

                        $scope.messageLogs.push(news);

                    }
                }



            });
        });
    });

    ///////////



});