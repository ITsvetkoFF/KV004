angular.module('routEx',['ngRoute', 'ngAnimate']).
    config(function($routeProvider){
            $routeProvider.
            when('/',{controller:'problemsCtrl'}).
            when('/problem/:id',{templateUrl:'problem.html', controller:'viewController'}).
            when('/about',{templateUrl:'about.html', controller:'addController'}).
            otherwise({redirectTo:'/'})
        }).
        controller('problemsCtrl',['$scope','$http',function($scope,$http){
            $http.get('http://ecomap.org/api/problems').success(function(data){
                probs=data;
                for(var i =0, len = probs.length; i<len; i++) {
                    probs[i].created = new Date(probs[i].created*1000).toISOString();
                }
                $scope.fprobs=probs;
            })
        }]).
        controller('viewController',['$scope','$routeParams',function($scope, $routeParams){
            if (!!$routeParams.id) {
           $scope.i=$scope.fprobs[$routeParams.id];
       }
        }])
