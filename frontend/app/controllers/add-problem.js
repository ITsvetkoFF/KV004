define(['./module'],function (controllers){
    'use strict';
    controllers.controller('addProblemCtrl', function ($scope){
        $scope.showStep_1 = true;

        function allHidden() {
            $scope.showStep_1 = false;
            $scope.showStep_2 = false;
            $scope.showStep_3 = false;
        }

        //**********Misha's script*************

        $scope.showFirst = function () {
            allHidden();
            $scope.showStep_1 = true;
        };

        $scope.showSecond = function () {
            allHidden();
            $scope.showStep_2 = true;
        };

        $scope.showThird = function () {
            allHidden();
            $scope.showStep_3 = true;
        };

        //*************************************

        $scope.nextButton_Step1 = function () {
            $scope.showStep_1 = false;
            $scope.showStep_2 = true;
        };


        $scope.nextButton_Step2 = function () {

            $scope.showStep_2 = false;
            $scope.showStep_3 = true;
        };

        $scope.backButton_Step2 = function () {

            $scope.showStep_2 = false;
            $scope.showStep_1 = true;
        };

        $scope.nextButton_Step3 = function () {

            $scope.showStep_2 = false;
        };

        $scope.backButton_Step3 = function () {

            $scope.showStep_2 = true;
            $scope.showStep_3 = false;
        };

        $scope.showRegFormButtonClick = function () {
            $scope.showRegForm = true;
        };

        $scope.dropzoneConfig = {
            'options':{autoProcessQueue:false,
                url:'/api/problempost',
                method:"POST",
                uploadMultiple:true,
                maxFilesize:10,
                parallelUploads:10,
                thumbnailWidth:100,
                thumbnailHeight:100,
                clickable:"#previews",
                previewsContainer:"#previews"
            }
        }


    });
});
