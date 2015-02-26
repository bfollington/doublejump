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
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    glob = require('glob');

gulp.task('scripts', buildJs);
gulp.task('components', buildComponents);
gulp.task('componentsJs', buildComponentsJs);

function buildComponentsJs()
{
    return gulp.src('app/views/**/*.js')
    .pipe(wrap('//<%= file.path.replace(/^.*[\\\/]/, "") %>\n<%= contents %>'))
    .pipe(concat('components.js'))
    .pipe(gulp.dest('javascript'));
}

function buildComponents()
{
    return gulp.src('app/views/**/*.scss')
    .pipe(wrap('//<%= file.path.replace(/^.*[\\\/]/, "") %>\n<%= contents %>'))
    .pipe(concat('components.scss'))
    .pipe(gulp.dest('app/stylesheets'));
}

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return version + '.' + name + '.' + 'min';
};

function buildJs()
{

    var bundler = browserify({
        entries: ['./javascript/app.js'],
        paths: ['./node_modules', './javascript', './app/views'],
        debug: true
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(gulp.dest('./public/javascripts/'))
            // Add transformation tasks to the pipeline here.
            //.pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/javascripts/'));
    };

    return bundle();
}

gulp.task('watch', ['scripts', 'components'], function() {

  // Watch .js files
  gulp.watch('javascript/**/*.js', ['scripts']);
  gulp.watch('app/views/**/*.scss', ['components']);
  //gulp.watch('app/views/**/*.js', ['componentsJs']);
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

