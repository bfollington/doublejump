"use strict";

var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat'),
    script = require("gulp-build-tools/script"),
    _static = require("gulp-build-tools/static");

gulp.task('scripts', buildJs);
gulp.task('components', buildComponents);
gulp.task('componentsJs', buildComponentsJs);

var externalDeps = ['katex', 'page', 'dragula', 'marked', 'handlebars', 'react', 'react-select'];




gulp.task('js-deps', function() {
    script.bundle({
        paths: [],
        watch: true,
        dest_filename: "deps_bundle.js",
        dest_folder: "./public/javascripts/",
        compress: true,
        include_dependencies: externalDeps
    });
});

gulp.task('js-app', ['js-deps'], function(callback) {

    script.bundle({
        paths: ["./node_modules", "./javascript/jsx"],
        entries: ['./javascript/jsx/app.jsx'],
        watch: true,
        dest_filename: "app_bundle.js",
        dest_folder: "./public/javascripts/",
        compress: false,
        reference_dependies: externalDeps,
        babel: true,
        reactify: true
    });

    //compileReact(true, callback);
});










function buildComponentsJs()
{
    return gulp.src('app/views/**/*.js')
    .pipe(wrap('//<%= file.path.replace(/^.*[\\\/]/, "") %>\n<%= contents %>'))
    .pipe(concat('components.js'))
    .pipe(gulp.dest('javascript'));
}
function buildJs()
{
    script.bundle({
        paths: ['./node_modules', './javascript', './app/views'],
        entries: ['./javascript/app.js'],
        dest_filename: "bundle.js",
        dest_folder: "./public/javascripts/",

    });
}












function buildComponents()
{
    return gulp.src('app/views/**/*.scss')
    .pipe(wrap('//<%= file.path.replace(/^.*[\\\/]/, "") %>\n<%= contents %>'))
    .pipe(concat('components.scss'))
    .pipe(gulp.dest('app/stylesheets'));
}

gulp.task('lib-css', function() {
    _static.copy(["node_modules/react-select/dist/default.css"], "public/stylesheets/", "Lib CSS");
});













gulp.task('watch', ['lib-css', 'scripts', 'components'], function() {

  // Watch .js files
  gulp.watch(['javascript/**/*.js', 'app/views/**/*.js'], ['scripts']);
  gulp.watch('app/views/**/*.scss', ['components']);
  //gulp.watch('app/views/**/*.js', ['componentsJs']);
});











gulp.task('server', ['up', 'watch', 'js-app'], function() {

});

gulp.task('up', function() {

    gulp.src('').pipe( shell(['mongod &']) );
    gulp.src('').pipe( shell(['padrino s']) );
});

gulp.task('down', function() {
    gulp.src('').pipe( shell(['killall mongod']) );
});

gulp.task('deploy', function() {
    gulp.src('').pipe( shell(['padrino rake deploy']) );
});

