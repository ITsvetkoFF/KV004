define(['./module'],function(services) {
    'use strict';


    services.factory('adminToShowProblemService', function($http, $modal, $rootScope) {
        var notApproved = undefined;
        var notApprovedProblemListQty = 0;
        var adminMode = false;
        var editStatus = {
            "false":{
              0:"btn-editStatus",
              1:"btn-editStatus",
              2:"btn-editStatus",
              3:"btn-editStatus"
            },
            "true":{
                0:"btn-danger",
                1:"btn-warning",
                2:"btn-success",
                3:"btn-editStatus"
            }
        };
        var currentEditStatus = '';
        return {
            getNotApprovedProblem:function(getNotApproved){
                $http({ method: 'GET', url: '/api/not_approved' })
                    .success (function (data) {
                        notApproved = data;
                        adminMode = true;
                        notApprovedProblemListQty = notApproved?notApproved.length:0;
                        getNotApproved(notApproved);
                    });
            },

            deleteNotApprovedProblemDB:function(problem){
                return $http({ method: 'DELETE', url: '/api/problem/'+problem.Id })
                    .success (function (data) {
                    });
            },

            deleteNotApprovedProblemFromList:function(problem){
                    for (var i = 0; i < notApproved.length; i++) {
                        if (problem.Id == notApproved[i].Id) {
                            notApproved.splice(i, 1);
                            notApprovedProblemListQty = notApproved.length;
                            return notApproved;
                        }
                    }
                notApproved = undefined;
                notApprovedProblemListQty = 0;
                return notApproved;

            },

            approveNotApprovedProblem:function(problem){
                return $http({ method: 'POST', url: '/api/approve/'+problem.Id });
            },

            showScopeNotApprovedProblemFromList: function(problem){

                window.location.href='#/problem/showProblem/'+problem.Id;
            },

            getNotApprovedProblemListQty: function (){
                if (notApprovedProblemListQty != 0) {
                    return true;
                }else {
                    return false;
                }
            },
            setEditStatus: function(status){
                currentEditStatus = editStatus[status];
            },

            getEditStatus: function(status){
                return currentEditStatus[status];
            },

             saveChangestoDbProblemDescription: function(problem,severity,content,proposal,title,problemDecided){
                 return $http.put('/api/editProblem/' + problem.Id, {Title: title, Content: content,Proposal:proposal, Severity: severity, ProblemStatus: problemDecided})
             },

           redirectToMap: function(location){
                window.location.href=location;
            },

            showModalMessage: function(text, size,approveCaption, cancelCaption){
                var modalWindowScope = $rootScope.$new(),
                    modalInstance;

                modalWindowScope.text = text;
                modalWindowScope.approveCaption = approveCaption;
                modalWindowScope.cancelCaption = cancelCaption;

                modalWindowScope.ok = function () {
                    modalInstance.close('ok');
                };

                modalWindowScope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };

                modalInstance = $modal.open({
                    template: '<div class="modal-header">' +
                        '<h3 class="modal-title">Увага</h3>' +
                        '</div>' +
                        '<div class="modal-body">{{ text }}</div>' +
                        ' <div class="modal-footer">' +
                        '<button class="btn btn-warning"  ng-click="ok()">{{approveCaption}} </button>' +
                        '<button class="btn btn-danger" ng-click="cancel()">{{cancelCaption}}</button>' +
                        '</div>',
                    size: size,
                    scope: modalWindowScope
                });

                return modalInstance.result;
            },

            alertAddProblemSuccessAnonim: function (size){
                var modalWindowScope = $rootScope.$new(),
                                        modalInstance;

                $rootScope.closeAlert = function() {
                    modalInstance.close(console.log('alert closed'));
                };

                $rootScope.alerts = [{ type: 'success', msg: 'Ви не зареєстрований користувач, тому проблема спочатку пройде модерацію і потім буде додана на карту.' }];

                modalInstance = $modal.open({
                    template: '<alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</alert>',
                    size: size,
                    scope: modalWindowScope
                });

                return modalInstance.result;
            }
        }
    });


});
