var app = angular.module('app', ['ngCookies'],['ndSanitize']);


app.controller('AdminUserCtrl', ['$scope',  '$location', '$window', '$cookieStore', 'UserService',
    function AdminUserCtrl($scope, $location, $window, $cookieStore, UserService) {
        //
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1458754107737788',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.1'
            });

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.

            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });

        };

        // Load the SDK asynchronously

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        function statusChangeCallback(response) {

            console.log('statusChangeCallback');
            console.log(response);

            if (response.status === 'connected') {
                // Logged into your app and Facebook.

                FB.api('/me', function(response) {

                    UserService.logIn(response.email, response.id).success(function(userData) {

                        successLogIn(userData);

                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                        // This user has logged into our app first time,
                        // there is no his or her data in our DB,
                        // so we need to save it.
                        UserService.register(response.first_name, response.last_name, response.email, response.id).success(function(userData) {

                            successLogIn(userData);

                        }).error(function(status, data) {
                            console.log(status);
                            console.log(data);
                        });

                    });
                });

            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
            }
        }




        // This function is called after success login procedure
        function successLogIn(userData) {
            $cookieStore.put('userName', userData.name, {expires: 60});
            $cookieStore.put('userSurname', userData.surname, {expires: 60});
            $cookieStore.put('userRole', userData.role, {expires: 60});
            $cookieStore.put('token', userData.token, {expires: 60});

        }

        function successLogOut() {
            $cookieStore.remove('token');
            $cookieStore.remove('userName');
            $cookieStore.remove('userSurname');
            $cookieStore.remove('userRole');

        }



        $scope.isLoggedIn = UserService.isLoggedIn();
        $scope.isAdministrator = UserService.isAdministrator();

        $scope.logInFB = function logInFB() {
            FB.login(function(response) {

                    FB.getLoginStatus(function(response) {
                        statusChangeCallback(response);
                    });

                }, {
                    scope: 'publish_stream,email'
                });
        }


        $scope.logIn = function logIn(email, password) {

            //here must be validation!

            UserService.logIn(email, password).success(function(userData) {
                //console.log(userData);
                successLogIn(userData);

            }).error(function(status, data) {

                console.log(status);
                console.log(data);

            });
        }

        $scope.register = function register(username, surname, email, password, cnfPassword) {

            //and here must be validation!

            UserService.register(username, surname, email, password).success(function(userData) {

                successLogIn(userData);

            }).error(function(status, data) {

                console.log(status);
                console.log(data);

            });
        }



        $scope.logOut = function logOut() {

            successLogOut();
            FB.logout(function(response) {
                console.log(response);
            });

        }
    }

]);




app.factory('UserService', function($http) {
    return {
        logIn: function(email, password) {
            return $http.post('http://localhost:3000' + '/login', {email: email, password: password});
        },

        logOut: function() {
            return $http.get('http://localhost:3000' + '/logout');

        },

        register: function(username, surname, email, password) {
            return $http.post('http://localhost:3000' + '/register', {username: username, surname: surname, email: email, password: password});

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




app.provider('$cookieStore', [function(){
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

app.config(['$cookieStoreProvider', function($cookieStoreProvider){
    $cookieStoreProvider.setDefaultOptions({
        path: '/', // Cookies should be available on all pages
        expires: 60 // Store cookies for an hour
    });
}]);



