var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var svgo = require('gulp-svgo');
var webpackStream = require('webpack-stream');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var export_sass = require('node-sass-export');
var browserSync = require('browser-sync');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


var SASS_FILES = ['sass/**/*.scss'];
var JS_ES6_FILES = ['javascript/src/{,**/}*.js'];
var JS_DEST = 'javascript/build';

var FILES_TO_RELOAD = [ //only js in lib folder
  '../../mysite/{,**/}*.*',
  'javascript/build/{,**/}*.js',
  'templates/{,**/}*.ss',
  'images/**'
];

gulp.task('sass', [], function() {
  return gulp.src(SASS_FILES)
    .pipe(sourcemaps.init())
    .pipe(sass(
      {
        functions: export_sass('.')
      }
    ).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});


gulp.task('minify-css', function() {
  return gulp.src('css/layout.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('layout.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('compress-images', function() {
  return gulp.src(['images/**/*', '!images/**/*.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest('images'));
});

gulp.task('compress-assets', function() {
  return gulp.src(['../../assets/**/*.{png,gif,jpg,jpeg}'])
    .pipe(imagemin())
    .pipe(gulp.dest('images'));
});

gulp.task('svgo', function() {
  return gulp.src('images/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('images/svgo'));
});


gulp.task('es6', function() {
  return gulp.src('javascript/es6/entry.js')
    .pipe(webpackStream({
      entry: ['babel-polyfill','./javascript/src/index.js'],
      output: {
        filename: 'bundle.js'
      },
      compact: false,
      devtool: 'eval', // 'source-map' in production !!
      module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query:
            {
              presets:[['es2015', {cacheDirectory:true}]]
            }
          }
        ]
      }

    }).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); this.emit('end'); })
  ).pipe(gulp.dest('javascript/build/'));

});

gulp.task('live-scripts', function() {
  return gulp.src('javascript/es6/entry.js')
    .pipe(webpackStream({
      entry: ['babel-polyfill','./javascript/src/index.js'],
      output: {
        filename: 'bundle.min.js'
      },
      plugins: [
        new UglifyJsPlugin()
      ],
      compact: true,
      devtool: 'source-map', // 'source-map' in production !!
      module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query:
            {
              presets:[['es2015', {cacheDirectory:true}]]
            }
          }
        ]
      }

    }).on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); this.emit('end'); })
  )  
  .pipe(gulp.dest('javascript/build/'));
});

gulp.task('dev-watch', ['sass'], function() {
  gulp.watch(SASS_FILES, ['sass']);
  gulp.watch(JS_ES6_FILES, ['es6']);  
  gulp.watch(FILES_TO_RELOAD).on('change', function(e) { console.log(e); browserSync.reload(); });
  
  browserSync.init({
    proxy: "localhost:3000",
    port:3001
  });



});

// DEV TASK
gulp.task('default', ['dev-watch']);

// LIVE TASK
gulp.task('deploy-live', ['live-scripts', 'minify-css', 'compress-images']);

