'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    compass: {
      options: {
        config: 'config.rb'
      },
      dev: {
        options: {
          environment: 'development',
          config: 'config.rb'
        }
      },
      dist: {
        options: {
          environment: 'production',
          config: 'config.rb'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['javascript/{,**/}*.js', '!javascript/{,**/}*.min.js']
    },

    browserify: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'js/dev',
          dest: 'js/build',
          src: ['*.js']
        }],
        options: {
          transform: [["babelify", { "presets": ["es2015"] }]]
        }
      }
    },

    autopolyfiller: {
      for_all_browsers: {
        files: {
          'js/polyfill/polyfills.js': ['js/build/**/*.js'],
        }
      }
    },

    uglify: {
      dist: {
        options: {
          mangle: true,
          compress: {}
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'js/build',
          dest: 'js/build',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['sass/{,**/}*.{scss,sass}'],
        tasks: ['compass:dev'],
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
        files: ['js/{,**/}*.js', '!js/{,**/}*.min.js'],
        tasks: ['browserify', 'autopolyfiller', 'uglify:dist']
      },
      ss: {
        files:['templates/{,**/}*.ss']
      },
      mysite: {
        files:['../../mysite/{,**/}*.*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-autopolyfiller');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', [
    'browserify',
    'uglify:dist',
    'autopolyfiller',
    'compass:dist',
    'jshint'
  ]);

};
