define(['./module'], function(controllers){
    'use strict';
    controllers.controller('showProblemCtrl', function ($scope,$routeParams,$http){
        var res=$http.get("api/problems/"+$routeParams.problemID);

        res.success(function(data,status,headers,config){

            $scope.data=data[0][0];
            $scope.photos=data[1];

        });
        res.error(function(err){
            throw err;
        });

    });

});