var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var svgo = require('gulp-svgo');
var livereload = require('gulp-livereload');
var webpackStream = require('webpack-stream');
var sort = require('gulp-sort');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var SASS_FILES = './sass/**/*.scss';
var JS_FILES = ['javascript/lib/{,**/}*.js', '!javascript/lib/{,**/}*.min.js'];
var JS_ES6_FILES = ['javascript/es6/{,**/}*.js', '!javascript/es6/{,**/}*.min.js'];
var JS_DEST = 'javascript/live';

var FILES_TO_RELOAD = [ //only js in lib folder
  '../../mysite/{,**/}*.*',
  'javascript/lib/{,**/}*.js', '!javascript/lib/{,**/}*.min.js',
  'templates/{,**/}*.ss',
  'images/**'
]

/** TODO
 * 1. task to minify images
 */

gulp.task('sass', [], function() {
  return gulp.src(SASS_FILES)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(livereload())
});


gulp.task('minify-css', function() {
  return gulp.src('css/layout.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('layout.min.css'))
    .pipe(gulp.dest('css'))
});

gulp.task('svgo', function() {
  return gulp.src('images/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('images/svgo'));
});


gulp.task('es6', function() {
  return gulp.src('javascript/es6/entry.js')
    .pipe(webpackStream({
      output: {
        filename: 'Z_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js?$/,
            loader: "babel-loader",
            query:
            {
              presets:['es2015']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('javascript/lib/'))
});

gulp.task('live-scripts', function() {
  return gulp.src(JS_FILES)
    .pipe(sort())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(JS_DEST))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(JS_DEST));
});

gulp.task('dev-watch', ['sass'], function() {
  livereload.listen();
  gulp.watch(SASS_FILES, ['sass']);
  gulp.watch(JS_ES6_FILES, ['es6']);
  gulp.watch(FILES_TO_RELOAD).on('change', function(e) { console.log(e); livereload.reload() });
});

// DEV TASK
gulp.task('default', ['dev-watch']);

// LIVE TASK
gulp.task('deploy-live', ['es6', 'live-scripts', 'sass', 'minify-css']);