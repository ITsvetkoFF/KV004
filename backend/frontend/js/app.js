var app = angular.module('app', ['ngCookies']);


app.controller('AdminUserCtrl', ['$scope',  '$location', '$window', '$cookieStore', 'UserService', 'AuthenticationService',
    function AdminUserCtrl($scope, $location, $window, $cookieStore, UserService, AuthenticationService) {

        if($cookieStore.get('token')) {
            $scope.in = false;
            AuthenticationService.isLogged = true;

            $scope.userName = $cookieStore.get('userName');
            $scope.userSurname = $cookieStore.get('userSurname');
        } else {
            $scope.in = true;
        }


        $scope.logIn = function logIn(email, password) {

            if (email !== '' && password !== '') {
                //password = CryptoJS.SHA1(password).toString();
                UserService.logIn(email, password).success(function(userData) {
                    console.log(userData);
                    AuthenticationService.isLogged = true;
                    $cookieStore.put('userName', userData.name, {expires: 60});
                    $cookieStore.put('userSurname', userData.surname, {expires: 60});
                    $cookieStore.put('userRole', userData.role, {expires: 60});
                    $cookieStore.put('token', userData.token, {expires: 60});


                    $scope.userName =  userData.name;
                    $scope.userSurname = userData.surname;
                    $scope.in=false;




                }).error(function(status, data) {
                    $scope.loginErrorMsg = 'Wrong name or password!';
                    console.log(status);
                    console.log(data);

                });
            }
        }

        $scope.register = function register(username, surname, email, password, cnfPassword) {
            if (username == '' || surname == '' || email == '' || password == '' || cnfPassword == '') {
                $scope.registerErrorMsg = 'All fields are required!';
                return;
            }
            if (password !== cnfPassword) {
                $scope.registerErrorMsg = 'Passwords do not match!';
                return;
            }

            //password = CryptoJS.SHA1(password).toString();

            UserService.register(username, surname, email, password).success(function(userData) {

                AuthenticationService.isLogged = true;
                $cookieStore.put('userName', userData.name);
                $cookieStore.put('userSurname', userData.surname, {expires: 60} );
                $cookieStore.put('userRole', userData.role, {expires: 60} );
                $cookieStore.put('token', userData.token, {expires: 60} );


                $scope.userName =  userData.name;
                $scope.userSurname = userData.surname;
                $scope.in=false;

            }).error(function(status, data) {
                $scope.registerErrorMsg = 'Someone already has that e-mail. Try another!';
                console.log(status);
                console.log(data);

            });
        }



        $scope.logOut = function logOut() {


            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
            }

            if ($cookieStore.get('token')) {
                UserService.logOut().success(function() {
                    $scope.in = true;
                    $cookieStore.remove('token');
                    $cookieStore.remove('userName');
                    $cookieStore.remove('userSurname');
                    $cookieStore.remove('userRole');
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }

        }
    }

]);

app.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }
    return auth;
});


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



