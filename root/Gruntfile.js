module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //SCSS  require Ruby and SASS
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/sass/',
          src: ['*.scss'],
          dest: 'dev/css/',
          ext: '.css'
        }]
      }
    },

    //Minify and Concat CSS (Afteruncss is for minifying file after using 'uncss')
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        src: ['dev/css/**/*.css'],
        dest: 'temp/css/style.min.css'
      },
      afteruncss: {
        src: ['dist/css/style.min.css'],
        dest: 'dist/css/style.min.css'
      }
    },

    //Autoprefix CSS
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 5%']
      },
      dist: {
        src: ['<%= cssmin.target.dest %>'],
        dest: 'dist/css/style.min.css'
      },
    },

    // Remove unused CSS across multiple files and ignore specific selectors 
    uncss: {
      dist: {
        // options: {
        //   ignore: ['#thisisID', '.thisisclass']
        // },
        files: {
          'dist/css/style.min.css': ['dist/index.html']
        }
      }
    },

    //Restructure CSS
    csscomb: {
      dynamic_mappings: {
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css'],
          dest: 'temp/css/resorted',
          ext: '.resorted.css'
      }
    },

    //Validate CSS
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['dist/css/**/*.css']
      }
    },

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS 			CSS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Concat JS
    concat: {
      options: {
        // banner: '<%= banner %>',
        // - add banner at the top. bigger file size mayb\e
        stripBanners: true
      },
      jstemp: {
        src: ['dev/js/**/*.js'],
        dest: 'temp/js/script.js'
      }
    },

    //Minify JS
    uglify: {
      options: {
        // banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.jstemp.dest %>',
        dest: 'dist/js/script.min.js'
      }
    },

    //Polyfill    Require Git
    autopolyfiller: {
      for_all_browsers: {
          files: {
              'temp/js/polyfilled/polyfilledscript.js': ['dist/js/**/*.js']
          }
      }
    },

    //Check Javascript Errors
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        node:true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['dist/js/**/*.js']
      }
    },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    // watch: {
    //   gruntfile: {
    //     files: '<%= jshint.gruntfile.src %>',
    //     tasks: ['jshint:gruntfile']
    //   },
    //   lib_test: {
    //     files: '<%= jshint.lib_test.src %>',
    //     tasks: ['jshint:lib_test', 'qunit']
    //   }
    // },

    //Restrucutre JS
    jsbeautifier: {
	    files: ["dist/js/*.js"]
		},

		//Check Browser can whether use Awsome Feature or not
		modernizr: {
		  dist: {
		    // "dest" : "build/modernizr-custom.js",
		    "parseFiles": true,
			  "customTests": [],
			  "devFile": "/dev/js/urlreroute.js",
			  "outputFile": "/temp/js/test.js",
			  "tests": [
			    "audio",
			    "customevent",
			    "emoji",
			    "flash",
			    "forcetouch",
			    "gamepad",
			    "geolocation"
			  ],
			  "extensibility": [
			    "setClasses"
			  ],
			  "uglify": true
		  }
		},




		

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS 				JS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Minify HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,  //checked="checked" -? checked
          // removeAttributeQuotes: false,     //id="id" -> id=id //set true for maximum minifying
          removeRedundantAttributes: true,  //input type="text" -> nothing //remove default attributes
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          // removeOptionalTags: false,        //for example <head> <body> tags
          // removeEmptyElements: false,
          keepClosingSlash: true, 					//Close tags????
          // caseSensitive: false, 						//Might be useful in angular
          minifyJS: true,										//minify inscript JS using UglifyJS
          minifyCSS: true,									//minify inscript CSS using clean-css
          minifyURLs: true,									//minify URL using relateurl
          ignoreCustomComments: [],         // [/dog/] regex like this
          // ignoreCustomFragments: [], 				//fragments like php 		//not wokring somehow
          // maxLineLength: 4,							//broken too
          // customAttrAssign: [],							//might be useful in Angular
          // customAttrSurround: [],						//don't know what's this
          quoteCharacter: '\"',							//type of quote for attribute
        },
        files: {
          'dist/index.html': 'dev/index.html'
          // 'dist/test.html': 'dev/test.html',
        }
      }
    },

    //HTML W3C validation
    validation: {
	    options: {
	        // reset: grunt.option('reset') || false,
	        stoponerror: false,
	        // remotePath: 'http://decodize.com/',
	        // remoteFiles: ['html/moving-from-wordpress-to-octopress/',
	        //               'css/site-preloading-methods/'], //or 
	        // remoteFiles: 'validation-files.json', // JSON file contains array of page paths. 
	        relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'], //ignores these errors 
	        generateReport: true,
	        errorHTMLRootDir: "w3cErrorFolder",
	        useTimeStamp: true,
	        // errorTemplate: "w3c_validation_error_Template.html"
	    },
	    files: {
	        src: ['dev/index.html',
	              '!dev/404.html']
	    }
		},

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML 			HTML
////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////General		General		General		General		General		General		General		General		General		General		General
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Clean Temp folder
    clean: {
      temp: ["temp"],
      sass: ["dev/css/*.map"]
    },

    //Watch Tasks
    watch: {
      sass: {
        files: ['dev/sass/**/*.scss'],
        tasks: ['sass', 'clean:sass', 'cssmin:target', 'autoprefixer', 'uncss', 'cssmin:afteruncss'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['<%= cssmin.target.src %>'],
        tasks: ['cssmin:target', 'autoprefixer', 'uncss', 'cssmin:afteruncss'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ['<%= concat.jstemp.src %>'],
        tasks: ['concat' , 'uglify'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['dev/*.html'],
        tasks: ['htmlmin', 'autoprefixer', 'uncss', 'cssmin:afteruncss'],
        options: {
          spawn: false,
        },
      }
    },

    //Concurrent Tasks
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ["watch:sass", "watch:css", "watch:js", "watch:html"]
      }
    },

    //Reload Browser when file is saved
    browserSync: {
      bsFiles: {
          src : 'dist/**/*.*'
      },
      options: {
        watchTask: true,
        // -do watch task after this
        server: {
            baseDir: "dist/",
            index: "index.html"
        }
        // proxy: "localhost"
        // - setting proxy
      }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////General		General		General		General		General		General		General		General		General		General		General
////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  });

  // These plugins provide necessary tasks.

  // Default task.
  grunt.registerTask('default', ['browserSync', 'concurrent']);
  // grunt.registerTask('default', ['concurrent']);

};
