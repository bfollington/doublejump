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
    uglifyify = require('uglifyify'),
    buffer = require('vinyl-buffer'),
    glob = require('glob'),
    babelify = require('babelify');

gulp.task('scripts', buildJs);
gulp.task('components', buildComponents);
gulp.task('componentsJs', buildComponentsJs);

var jsxFiles = 'javascript/jsx/**/*.jsx';

// deprecated
var requireFiles = './node_modules/react/react.js';

var externalDeps = ['katex', 'page', 'dragula', 'marked', 'handlebars'];

gulp.task('js-deps', function() {
    var b = browserify();

    for (var i = 0; i < externalDeps.length; i++) {
        b.require(externalDeps[i])
    }

    return b.bundle()
        .pipe(source('deps_bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('js-app', ['js-deps'], function(callback) {
    compileReact(true, callback);
});

function compileReact(watch, callback) {
    gutil.log('Starting browserify');

    var entryFile = './javascript/jsx/app.jsx';
    // es6ify.traceurOverrides = {experimental: true};

    var b = browserify({ cache: {}, packageCache: {}, fullPaths: true, debug: true, entries: ['./javascript/jsx/app.jsx'], paths: ["./node_modules", "./javascript/jsx"] });
    var w = watchify(b);
    var bundler = w;

    bundler.on('log', gutil.log); // output build logs to terminal
    bundler.on('package', function (file) { console.info("=> Processing package", file.name) });
    bundler.on('file', function (file) { console.info("=> Processing file", file) });
    //bundler.require(requireFiles);

    for (var i = 0; i < externalDeps.length; i++) {
        b.external(externalDeps[i])
    }

    bundler.transform(babelify);
    // bundler.transform(reactify);

    var rebundle = function () {
        var stream = bundler.bundle();

        console.log("--> Starting bundle...\n===");

        stream.on('end', function (err) { console.log("===\n--> Finished bundle!"); })
        .on('error', function (err) {
            console.log(err.toString());
        })
        .pipe(source(entryFile))
        // .pipe(buffer())
        .pipe(rename('app_bundle.js'))
        // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
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

gulp.task('watch', ['scripts', 'components'], function() {

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

