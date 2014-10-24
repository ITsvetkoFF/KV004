module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
  // Project configuration.
grunt.initConfig({
    
    copy:{
	    html: {
	    	src: './index.html', dest: 'dist/index.html'
	    },
        dist: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: 'dist',
                    src: [
                        'images/**/*',
                        'style/fonts/*',
                    ]
                }],
        },
        leaflet: {
            src: '.tmp/concat/app/leaflet.js',
            dest:'dist/app/leaflet.js',
        },
        templates: {
            files: [{
                expand: true,
                flatten: true,
                dot: true,
                cwd: './',
                dest: 'dist/app/templates/',
                src: ['.tmp/scripts/templates/*'],
                    }]
        },
        jstemplates: {
            src: '.tmp/templates.js', dest: 'bower_components/templates.js'
        },
                    
    },
    
    uglify: {
    	options: {
        	mangle: false
    },
        requirejs: {
        	files: [{
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
    
    usemin:{
        html:['dist/index.html']
          },
    
    htmlmin: {                                     // Task
        dist: {                                    // Target
          options: {                               // Target options
            removeComments: true,
            collapseWhitespace: true
          },
          files: [{
            expand: true,
            src: ['app/**/*.html','*.html'],
            dest:'dist/',
          }]
        }
      },
    
    html2js: {
        options: {
            base: '.',
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
          src: ['app/templates/*.html'],
          dest: 'app/templates/maintemplate.js'
        },
    },
               
   requirejs: {
            generated: {
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
    concat: {
        dist: {
            src: ['.tmp/scripts/main.js'],
            dest: 'dist/app/main.js'
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
            },
            tmp: {
                 files: [{
                    dot: true,
                    src: '.tmp',
                 }]
                 }
        },
    bower: {
            install: {
                options: {
                    targetDir: "./bower_components",
                    copy: false
                        }
                    }
            },
    watch: {
        scripts: {
            files: 'app/templates/*.html',
            tasks: ['html2js'],
                options: {
                    debounceDelay: 250,
                },
        },
    },
    zip: {
        dist: {
              cwd: 'dist',
              src: ['dist/app/*.js',
                   'dist/bower_components/**/*.js',
                    'dist/style/css/main.css',
                    'dist/style/fonts/*.*',
                    'dist/images/*.*',
                    'dist/images/icons/*.*',
                    'dist/images/markers/*.*',
                    'dist/index.html',
                    
                   ],
              dest: 'dist/ecomap.zip'
        },

        
  },
  replace: {
      distOn: {
        src: ['../backend/config.js'],
        overwrite: true,                 
        replacements: [{
          from: "productionVersion = false",
          to: "productionVersion = true"
        }]
      },
    distOff: {
        src: ['../backend/config.js'],
        overwrite: true,                 
        replacements: [{
          from: "productionVersion = true",
          to: "productionVersion = false"
        }]
      },
    },
   //run this: grunt shell to start node api.js
    shell: {
        multiple: {
            command: [
                'cd ../backend',
                'node api',
            ].join('&&')
        }
    }
    
});
    

    // Default task(s). and build task
    grunt.registerTask('default', [
                      'bower',
                      'html2js',
                      'copy:html',
                      'copy:dist',
                      'uglify:requirejs',
                      'useminPrepare',
                      'concat:generated',
                      'cssmin:generated',
                      'requirejs:generated',
                      'concat',
                      'copy:leaflet',
                      'copy:jstemplates',
                      'usemin',
                      'clean:tmp',
                    ]);
    
    grunt.registerTask('dev', [
                      'bower',
                      'html2js',
                      'copy:html',
                      'copy:dist',
                      'uglify:requirejs',
                      'useminPrepare',
                      'concat:generated',
                      'cssmin:generated',
                      'requirejs:generated',
                      'concat',
                      'copy:leaflet',
                      'copy:jstemplates',
                      'usemin',
                      //'clean:tmp',
                      'watch'
                    ]);
    grunt.registerTask('distOn', ['replace:distOn']); //use grunt disOn to switch server path to dist
    grunt.registerTask('distOff', ['replace:distOff']); //use grunt distOff to switch server path to frontend
};
