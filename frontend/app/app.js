/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-route',
    'angular-mocks',
    'angular-cookie',
    'ngResource',
    'ngSanitize',
    'socket',
    'facebook',
    'dropzone',
    './controllers/index',
    './directives/index',
    //'./filters/index',
    './services/index',
    'textAngular',
    //'ngSanitize',
    'textAngularSetup'
], function (angular) {
    'use strict';

    return angular.module('app', [

        'app.controllers',
        'app.directives',
        //'app.filters',
        'app.services',
        'ngRoute',
        'ipCookie',
        'ngResource',
        'ngSanitize',
        'textAngular',
        'textAngularSetup',
       'btford.socket-io'
    ]).value('nickName', 'anonymous');;
});
