"use strict";

var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat'),
    build = require("bens-gulp-build-tools/build"),
    style = require("bens-gulp-build-tools/style"),
    script = require("bens-gulp-build-tools/script"),
    _static = require("bens-gulp-build-tools/static"),
    lr = require("gulp-livereload");

var babelify = require('babelify');
var reactify = require('reactify');

gulp.task('scripts', buildJs);
gulp.task('sass', buildSass);
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
        transforms: [
            babelify.configure({ loose: ["es6.modules"], "optional": [ "es7.decorators", "es7.asyncFunctions" ] }),
            reactify
        ],
        sourcemaps: true
    });

    lr.changed("/javascripts/app_bundle.js");
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

    lr.changed("/javascripts/app.js");
}










var COMPONENT_SCSS_GLOBS = ['app/views/**/*.scss', 'javascript/**/*.scss'];

function buildComponents()
{
    build.log("styles", "Concatting component styles");
    return gulp.src(COMPONENT_SCSS_GLOBS)
    .pipe(wrap('//<%= file.path.replace(/^.*[\\\/]/, "") %>\n<%= contents %>'))
    .pipe(concat('components.scss'))
    .pipe(gulp.dest('app/stylesheets'));
}

function buildSass() {
    style.sass('./app/stylesheets/**/*.scss', './public/stylesheets', {
        entries: ["./app/stylesheets/application.scss"],
        autoprefix: {
            browsers: ['last 10 versions', 'ie 6', 'ie 7', 'ie 8'],
            cascade: false
        },
        watch: true,
        compress: false,
        sourcemaps: true
    });
}

gulp.task('lib-css', function() {
    _static.copy(["node_modules/react-select/dist/default.css"], "public/stylesheets/", "Lib CSS");
});











var LR_JS = ["public/javascripts/app.js", "public/javascripts/app_bundle.js"];
var LR_CSS = "public/stylesheets/application.css";

gulp.task('watch', ['lib-css', 'scripts', 'components', 'sass'], function() {

  // Watch .js files
  lr({ start: true });
  gulp.watch(LR_JS, ["livereload-js"]);
  gulp.watch(LR_CSS, ["livereload-css"]);
  gulp.watch(['javascript/**/*.js', 'app/views/**/*.js'], ['scripts']);
  gulp.watch(COMPONENT_SCSS_GLOBS, ['components']);

});

gulp.task("livereload-js", function() {
    lr.changed("/javascripts/app_bundle.js");
});

gulp.task("livereload-css", function() {
    lr.changed("/stylesheets/application.css");
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

