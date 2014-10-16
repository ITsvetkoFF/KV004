/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-route': '../bower_components/angular-route/angular-route',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'angular-cookie': '../bower_components/angular-cookie/angular-cookie',
        'domReady': '../bower_components/requirejs-domready/domReady',
        'require': '../bower_components/requirejs/require',
        'facebook': './js/facebook',

        'dropzone':'../bower_components/dropzone/downloads/dropzone',
    /* 'btford.socket-io': '../bower_components/btford.socket-io',*/
        'textAngular':'../bower_components/textAngular/src/textAngular',
        'ngSanitize':'../bower_components/textAngular/src/textAngular-sanitize',
        'textAngularSetup':'../bower_components/textAngular/src/textAngularSetup',
        'ngResource':  '../bower_components/angular-resource/angular-resource',
        'socket':'../bower_components/angular-socket-io/socket',
        'socket.io':'../bower_components/socket.io-client/dist/socket.io',
        'angular-bootstrap-tpls':'../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'ngTouch':'../bower_components/angular-touch/angular-touch',
        'ngAnimate':'../bower_components/angular-animate/angular-animate',
        'd3': '../bower_components/d3/d3',
        'angular-carousel':'../bower_components/angular-carousel/dist/angular-carousel',
        'ngLocale':'./js/angular-locale_uk-ua',
        'app.templates':'./templates/maintemplate'



    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-carousel':{
            deps: ['angular']
        },
        'socket.io': {
            exports: 'io',
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
         'ngSanitize': {
            deps: ['angular']
        },
         'ngResource': {
            deps: ['angular']
        },
        'ngTouch':{
            deps: ['angular']
        },
        'ngAnimate':{
            deps: ['angular']
        },
         'socket': {
            deps: ['socket.io']
        },

        'angular-mocks': {
            deps: ['angular']
        },
        'angular-cookie': {
            deps: ['angular']
        },
        'textAngularSetup': {
            deps: ['angular']
        },
        'textAngular': {
            deps: ['angular']
        },
        'angular-bootstrap-tpls':{
            deps: ['angular']
        },
        'facebook' : {
            exports: 'FB'
        },
        'ngLocale':{
            deps: ['angular']
        },
        'app.templates': {
            deps: ['angular']
        }

    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});
