var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    wrap = require('gulp-wrap'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

gulp.task('scripts', buildJs);
gulp.task('components', buildComponents);

function buildComponents()
{
    return gulp.src('app/views/**/*.scss')
    .pipe(wrap('//<%= file.path.replace(/^.*[\\\/]/, "") %>\n<%= contents %>'))
    .pipe(concat('components.scss'))
    .pipe(gulp.dest('app/stylesheets'));
}

function buildJs()
{
    return gulp.src('javascript/**/*.js')
    .pipe(wrap('//<%= file.path.replace(/^.*[\\\/]/, "") %>\n<%= contents %>'))
    .pipe(concat('doublejump.js'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify().on('error', ignoreError))
    .pipe(gulp.dest('public/javascripts'));
}

gulp.task('watch', ['scripts', 'components'], function() {

  // Watch .js files
  gulp.watch('javascript/**/*.js', ['scripts']);
  gulp.watch('app/views/**/*.scss', ['components']);
});

function ignoreError(e)
{
    gutil.log(e);
    this.emit('end');
}

gulp.task('server', ['watch'], function() {

    gulp.src('').pipe( shell(['mongod &']) );
    gulp.src('').pipe( shell(['padrino s']) );
});

gulp.task('down', function() {
    gulp.src('').pipe( shell(['killall mongod']) );
});

gulp.task('deploy', function() {
    gulp.src('').pipe( shell(['padrino rake deploy']) );
});

