/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define(['angular','angular-route','ngAnimate','ngTouch','angular-mocks','angular-cookie','ngResource','ngSanitize','socket','facebook', 'd3', 'dropzone','./controllers/index','./directives/index','./services/index','textAngular','textAngularSetup','angular-bootstrap-tpls','angular-carousel','ngLocale','app.templates'], function (angular) {
    'use strict';
    return angular.module('app', ['app.controllers','app.directives','app.services','ngAnimate', 'ngTouch','ngRoute','ipCookie','ngResource','ngSanitize','textAngular','textAngularSetup','btford.socket-io','ui.bootstrap','angular-carousel','ngLocale','app.templates']);
});
