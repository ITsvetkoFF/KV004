module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        copy:{
            html: {
                src: './index.html', dest: 'dist/index.html'
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: 'dist',
                    src: [
                        'images/**/*',
                        'style/fonts/*',
                        'photos/**/*'
                    ]
                },
                    {
                    expand: true,
                    cwd: '.',
                    dest: 'dist',
                    src: ['bower_components/requirejs/*.js','bower_components/requirejs-domready/*.js']
                }]
            }

        },

        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },


        usemin: {
            html: ['dist/index.html']

        },
        /*
        bower: {
            'bower.json': {
                rjsConfig: 'app/main.js',
                options: {
                    exclude: ['facebook']
                }
            }
        },*/
        bower: {
            install: {
                options: {
                    targetDir: "./bower_components",
                    copy: false

            }

            }
        },

        requirejs: {
            dist: {
                options: {
                    dir: '.tmp/scripts/',
                    modules: [{
                        name: 'main'
                    }],
                    preserveLicenseComments: false,
                    removeCombined: true,
                    baseUrl: 'app',
                    mainConfigFile: 'app/main.js',
                    optimize: 'uglify2',
                    uglify2: {
                        mangle: false
                    }
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/{,*/}*'

                    ]
                }]
            }

        },
        concat:

        {
            options: {

            },
            dist: {
                src: ['.tmp/scripts/main.js'],
                dest: 'dist/app/main.js'
            }
        },

        html2js: {
            options: {

                        base: 'app',
                        module: 'app.templates',
                        singleModule: true,
                        useStrict: true,
                        htmlmin: {
                            collapseBooleanAttributes: true,
                            collapseWhitespace: true,
                            removeAttributeQuotes: true,
                            removeComments: true,
                            removeEmptyAttributes: true,
                            removeRedundantAttributes: true,
                            removeScriptTypeAttributes: true,
                            removeStyleLinkTypeAttributes: true
                        }
                    },


            main: {
                src: ['app/**/*.html'],
                dest: '.tmp/concat/scripts/templates.js'
            }
        },
        html2js_templating: {
            default_options: {
                options: {
                },
                files: {
                    "tmp/default_options.js": "app/templates/*.html"
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/templates',
                    src: ['*.html', '/{,*/}*.html'],
                    dest: 'dist/app/templates'
                }]
            }
        },

        preprocess : {
            options: {
                inline: true,
                context : {
                    DEBUG: false
                }
            },
            html : {
                src : [
                    'index.html'

                ]
            },
            js : {
                src: '.tmp/concat/scripts/*.js'
            }
        }





    });

    grunt.registerTask('default',[
        'clean',
        'bower',
        'copy:html',

        'copy:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin',
        'html2js',
        'html2js_templating',
        'requirejs',
        'concat',
        'htmlmin',
        'preprocess:js',  // Remove DEBUG code from production builds
        'preprocess:html'


    ]);


}