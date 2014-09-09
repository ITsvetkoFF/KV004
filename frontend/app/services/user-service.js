define(['./module'], function (services) {
    'use strict';

        services.provider('$cookieStore', [function(){
        var self = this;
        self.defaultOptions = {};
        self.setDefaultOptions = function(options){
            self.defaultOptions = options;
        };

        self.$get = function(){
            return {
                get: function(name){
                    var jsonCookie = document.cookie.match(new RegExp(
                      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                    ));
                    return jsonCookie ? angular.fromJson(jsonCookie[1]) : undefined;
                },
                put: function(name, value, o){
                    options =  angular.extend(self.defaultOptions,o);
                    var expires = options.expires;

                    if (typeof expires == "number" && expires) {
                      var d = new Date();
                      d = new Date(d.getTime() + expires*1000*60);
                      expires = options.expires = d;
                    }
                    if (expires && expires.toUTCString) {
                        options.expires = expires.toUTCString();
                    }
                    value = angular.toJson(value);
                    var updatedCookie = name + "=" + value;

                    for(var propName in options) {
                      updatedCookie += "; " + propName;
                      var propValue = options[propName];
                      if (propValue !== true) {
                        updatedCookie += "=" + propValue;
                       }
                    }
                    document.cookie = updatedCookie;
                },
                remove: function(name){
                  this.put(name, "", { expires: -1 });
                  return null;
                }
            };
        };
    }]);

    services.config(['$cookieStoreProvider', function($cookieStoreProvider){
        $cookieStoreProvider.setDefaultOptions({
            path: '/', // Cookies should be available on all pages
            expires: 60 // Store cookies for an hour
        });
    }]);
    services.factory('UserService', function($http, $cookieStore) {
        console.log($cookieStore);
        return {
            logIn: function(email, password) {
                return $http.post('http://ita-kv.tk:8090' + '/api/login', {email: email, password: password});
            },

            logOut: function() {
                return $http.get('http://ita-kv.tk:8090' + '/api/logout');

            },

            register: function(username, surname, email, password) {
                return $http.post('http://ita-kv.tk:8090' + '/api/register', {username: username, surname: surname, email: email, password: password});

            },

            isLoggedIn: function() {
                if($cookieStore.get('token')) {
                    return true;
                } else {
                    return false;
                }
            },

            isAdministrator: function() {
                if($cookieStore.get('role')=='administrator') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    });


});





