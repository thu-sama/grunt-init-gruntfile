/*
 * grunt-inti-gruntfile
 * https://gruntjs.com/
 *
 * Forked by thu_sama
 */

/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Complete Gruntfile.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
  'you will most likely need to edit the generated Gruntfile.js file before ' +
  'running grunt. _If you run grunt after generating the Gruntfile, and ' +
  'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
  ], function(err, props) {

    // Find the first `preferred` item existing in `arr`.
    function prefer(arr, preferred) {
      for (var i = 0; i < preferred.length; i++) {
        if (arr.indexOf(preferred[i]) !== -1) {
          return preferred[i];
        }
      }
      return preferred[0];
    }

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({filter: 'isDirectory'}, '*').map(function(d) { return d.slice(0, -1); });
    props.lib_dir = prefer(dirs, ['lib', 'src']);
    props.test_dir = prefer(dirs, ['test', 'tests', 'unit', 'spec']);

    // Maybe this should be extended to support more libraries. Patches welcome!
    props.jquery = grunt.file.expand({filter: 'isFile'}, '**/jquery*.js').length > 0;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);


    // If is package_json true, generate package.json
    var devDependencies = {
      "grunt": "latest",
      "grunt-autopolyfiller": "latest",
      "grunt-autoprefixer": "latest",
      "grunt-browser-sync": "latest",
      "grunt-concurrent": "latest",
      "grunt-contrib-clean": "latest",
      "grunt-contrib-concat": "latest",
      "grunt-contrib-csslint": "latest",
      "grunt-contrib-cssmin": "latest",
      "grunt-contrib-htmlmin": "latest",
      "grunt-contrib-jshint": "latest",
      "grunt-contrib-qunit": "latest",
      "grunt-contrib-sass": "latest",
      "grunt-contrib-uglify": "latest",
      "grunt-contrib-watch": "latest",
      "grunt-csscomb": "latest",
      "grunt-jsbeautifier": "latest",
      "grunt-modernizr": "latest",
      "grunt-uncss": "latest",
      "grunt-w3c-html-validation": "latest",
      "load-grunt-tasks": "latest"
    };

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      node_version: 'latest',
      devDependencies: devDependencies
    });

    // All done!
    done();
  });

};
