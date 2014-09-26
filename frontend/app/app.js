/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define(['angular','angular-route','angular-mocks','angular-cookie','ngResource','ngSanitize','socket','facebook','dropzone','./controllers/index','./directives/index','./services/index','textAngular','textAngularSetup','angular-bootstrap-tpls'], function (angular) {
    'use strict';
    return angular.module('app', ['app.controllers','app.directives','app.services','ngRoute','ipCookie','ngResource','ngSanitize','textAngular','textAngularSetup','btford.socket-io','ui.bootstrap']).value('nickName', 'anonymous');
});
