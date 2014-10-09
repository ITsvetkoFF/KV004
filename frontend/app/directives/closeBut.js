define(['./module'],function(directives){
        directives.directive("closeButton", function($window) {
  return{
    restrict: "EA",
    template: '<a href="#/map" class="close">×</a>'
  };
});
});