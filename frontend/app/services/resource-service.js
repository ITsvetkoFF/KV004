define(['./module'], function (services) {
    'use strict';
    /**
     * - getResourceFromDb
     * - editResourceAndSaveToDb
     * - addResourceToDb
     *
     */

    services.factory('ResourceService', function ($http, ipCookie) {
        return{
            getResourceFromDb:function(Alias){
                return $http.get('api/resources/' + Alias);

            },
            editResourceAndSaveToDb:function(Id,data){
                return $http.put('api/editResource/' + Id,data);
            },
            addResourceToDb:function(data){
                return $http.post('api/addResource', data);
            }

        }


    });

});