define(['./module'], function (services) {
    'use strict';
    /**
     * - getResourceFromDb
     * - editResourceAndSaveToDb
     * - addResourceToDb
     * - getTitlesFromDb
     * - deleteResource
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
            },
            getTitlesFromDb:function() {
                return $http({ method: 'GET', url: 'api/getTitles' })
            },
            deleteResource:function(id){
                return $http.delete('/api/deleteResource/' + id);
            }




        }


    });

});