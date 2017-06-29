'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['sass/{,**/}*.{scss,sass}'],
        tasks: ['sass:dist','postcss'],
        options: {
          livereload: false
        }
      },
      registry: {
        files: ['*.info', '{,**}/*.{php,inc}'],
        tasks: ['shell'],
        options: {
          livereload: false
        }
      },
      images: {
        files: ['images/**']
      },
      css: {
        files: ['css/{,**/}*.css']
      },
      js: {
        files: ['javascript/{,**/}*.js', '!javascript/{,**/}*.min.js'],
        tasks: ['jshint', 'uglify:dev']
      },
      ss: {
        files:['templates/{,**/}*.ss']
      },
      mysite: {
        files:['../../mysite/{,**/}*.*']
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/editor.css': 'sass/editor.scss',
          'css/layout.css': 'sass/layout.scss',
          'css/typography.css': 'sass/typography.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps

        /*
        // or
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css/maps/' // ...to the specified directory
        },
        */

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['javascript/{,**/}*.js', '!javascript/{,**/}*.min.js']
    },

    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'javascript',
          dest: 'javascript',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      },
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'javascript',
          dest: 'javascript',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('load-grunt-tasks');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('default', ['sass']);

  grunt.registerTask('build', [
    'uglify:dist',
    'compass:dist',
    'jshint'
  ]);

};
