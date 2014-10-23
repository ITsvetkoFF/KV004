define(['./module'],function(controllers){
    'use strict';
    ////////////



    controllers.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter,$rootScope,$interval,$http,ipCookie) {
        $rootScope.$broadcast('Update',"_problem");
        $rootScope.$emit('showSlider','false');
        $scope.deleteItem="clear";
        $scope.currentItemNews=-1;
        $scope.messageLogHide="_hide";
        $scope.nickName = $scope.name;
        var i = 0;
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



        $scope.sendMessage = function(message) {

            $log.debug('sending message', message);
            chatSocket.emit('message', ipCookie('token'), message);
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


                    } else if(data.payload.trigger!=true) {
                        news.show = "none";
                        news.Content = data.payload;

                        $scope.messageLogs.push(news);

                    }
                }
            });
        });
    });
});