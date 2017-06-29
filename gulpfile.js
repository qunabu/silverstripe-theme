var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var svgo = require('gulp-svgo');
var livereload = require('gulp-livereload');

var SASS_FILES = './sass/**/*.scss';
var JS_FILES = ['javascript/{,**/}*.js', '!javascript/{,**/}*.min.js'];

var FILES_TO_RELOAD = [
  '../../mysite/{,**/}*.*',
  'javascript/{,**/}*.js', '!javascript/{,**/}*.min.js',
  'templates/{,**/}*.ss',
  'images/**'
]

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


gulp.task('minify-js', function() {
    return gulp.src('dist/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task('minify-css', function() {
    return gulp.src('dist/style.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('svgo', function() {
    return gulp.src('images/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('images/svgo'));
});


///DEVELOPMENT

gulp.task('dev-watch', ['sass'], function() {
  livereload.listen();
  gulp.watch(SASS_FILES, ['sass']);
  gulp.watch(FILES_TO_RELOAD).on('change', function(e) { console.log(e); livereload.reload() });
});

//gulp.task('default', ['dev-compile', 'dev-watch']);
gulp.task('default', ['dev-watch']);


//PRODUCTION

/** tasks for production */