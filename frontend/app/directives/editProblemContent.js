define(['./module'],function(directives){
    directives.directive('editproblemcontent',function(){
        return {
            restrict: 'AE',
            scope: {
               value: '='
            },
            template: '<span ng-click="edit()" ng-bind-html = "tempValue"></span><textarea  ng-model="tempValue" wrap="hard"  rows="20"></textarea>',
            controller: function($scope,UserService){
                $scope.isAdministrator = UserService.isAdministrator;
            },
            link: function ( $scope, element, attrs ) {
                // Let's get a reference to the input element, as we'll want to reference it.
                var inputElement = angular.element( element.children()[1] );

                // This directive should have a set class so we can style it.
                element.addClass( 'editproblemcontent');

                // Initially, we're not editing.
                $scope.editing = false;

                $scope.$watch('value', function() {
                    $scope.tempValue = $scope.value;
                });

                // ng-click handler to activate edit-in-place
                $scope.edit = function () {
                    if ($scope.isAdministrator()){
                        $scope.editing = true;

               // We control display through a class on the directive itself. See the CSS.
                        element.addClass( 'active' );

                        // And we must focus the element.
                        // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
                        // we have to reference the first element in the array.
                        inputElement[0].focus();
                    }else{
                        element.addClass('cursorUser');
                    }
                };

                // When we leave the input, we're done editing.
                var onEdit = function() {
                    $scope.$apply(function() {
                        $scope.editing = false;
                        $scope.value = $scope.tempValue;
                        element.removeClass('active');
                    });
                };

                // When we leave the input, we're done editing.
                inputElement.prop( 'onblur', onEdit);
            }
        };
    });
});