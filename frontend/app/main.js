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
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'domReady': '../bower_components/requirejs-domready/domReady',
        'require': '../bower_components/requirejs/require',
        'facebook': 'https://connect.facebook.net/en_US/all'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'facebook' : {
            exports: 'FB'
        }
    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrap'
    ]
});
