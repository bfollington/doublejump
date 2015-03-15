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
    watchify = require('watchify'),
    es6ify = require('es6ify'),
    reactify = require('reactify'),
    buffer = require('vinyl-buffer'),
    glob = require('glob'),
    babelify = require('babelify');

gulp.task('scripts', buildJs);
gulp.task('components', buildComponents);
gulp.task('componentsJs', buildComponentsJs);

var jsxFiles = 'javascript/jsx/**/*.jsx';

// deprecated
var requireFiles = './node_modules/react/react.js';

gulp.task('react', function(callback) {
    compileReact(true, callback);
});

function compileReact(watch, callback) {
    gutil.log('Starting browserify');

    var entryFile = './javascript/jsx/app.jsx';
    es6ify.traceurOverrides = {experimental: true};

    var bundler;
    if (watch) {
        bundler = watchify(entryFile);
    } else {
        bundler = browserify(entryFile);
    }

    bundler.on('package', function (file) { console.info("=> Processing", file) });
    //bundler.require(requireFiles);
    bundler.transform(babelify);
    //bundler.transform(es6ify.configure(/.jsx/));
    bundler.transform(reactify);

    var rebundle = function () {
        var stream = bundler.bundle({ debug: true});

        console.log("--> Starting bundle...\n===");

        stream.on('end', function (err) {
            console.log("===\n--> Finished bundle!");
        });

        stream.on('error', function (err) { console.error(err) });
        stream = stream.pipe(source(entryFile));
        stream.pipe(rename('reactBundle.js'));
        stream.pipe(gulp.dest('./public/javascripts/'));
        // stream.pipe(sourcemaps.write('./'));
        // stream.pipe(gulp.dest('./public/javascripts/'));


    }

    bundler.on('update', rebundle);
    rebundle();
}

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
            .pipe(gulp.dest('./public/javascripts/'))
            .on('error', ignoreError);
    };

    return bundle();
}

gulp.task('watch', ['scripts', 'components', 'react'], function() {

  // Watch .js files
  gulp.watch(['javascript/**/*.js', 'app/views/**/*.js'], ['scripts']);
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

