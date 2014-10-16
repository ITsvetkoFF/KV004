define(['./module'],function(services) {
    'use strict';


    services.factory('adminToShowProblemService', function($http) {
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

            getNotApprovedProblemListQty: function (){ //checkScopeNotApprovedProblemList
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

             saveChangestoDbProblemDescription: function(problem,severity,content,title,problemDecided){
                 return $http.put('/api/editProblem/' + problem.Id, {Title: title, Content: content, Severity: severity, ProblemStatus: problemDecided})
             },

            redirectToMap: function(){
                window.location.href='#/map';
            }
        }
    });


});