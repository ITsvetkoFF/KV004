define(['./module'],function(controllers){
    'use strict';

    controllers.controller('SocketCtrl', function ($log, $scope, SocketService,$rootScope,$interval,$http,ipCookie) {
        $rootScope.$broadcast('Update',"_problem");
        $rootScope.$emit('showSlider','false');
        $scope.deleteItem="clear";
        $scope.message="";
        $scope.currentItemNews=-1;
        $scope.messageLogHide="_hide";
        $scope.nickName = $scope.name;
        var i = 0;
        $scope.messageLogs = [];

        SocketService.getNewsFromDb(updateScopeAfterGettingNews);
        function updateScopeAfterGettingNews(data){
            $scope.messageLogs=data.news;
            for(var i=0;i<$scope.messageLogs.length;i++){
                $scope.messageLogs[i].show="none";
            }
            if($scope.messageLogs[0]){$scope.showNewsContainer=false;}

        }

        $scope.sendMessage = function(message) {
            console.log(message);
            console.log($scope.message);
            if($scope.message==""&& message<0||  message==$scope.message&& !isNaN(message)|| $scope.message==undefined && message<0) {
                alert("Повідомлення не може состояти ліше із ціфр або бути пустим!");
                $scope.placeHolder = "Напишіть тут текст повідомлення...";
            }
            else{
                $log.debug('sending message', message);
                SocketService.socket.emit('message', ipCookie('token'), message);
                if (isNaN(message)) {
                    SocketService.addNewsToDb(message);
                }
                $scope.message = '';
            }
        };
        $scope.$on('socket:broadcast', function(event, data) {
            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function() {
                var news={};
                $scope.message = '';
                if(!isNaN(data.payload)){
                    SocketService.deleteOneNewsItem($scope.messageLogs[data.payload-1].Content).then(function(){
                        $scope.messageLogs.splice(data.payload - 1, 1);
                    });

                }else {
                      if(data.payload.trigger!=true) {
                        news.show = "none";
                        news.Content = data.payload;

                        $scope.messageLogs.push(news);

                    }
                }
            });
        });
    });
});