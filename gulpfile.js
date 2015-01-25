var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

clean = require('gulp-clean');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var bundler = watchify(browserify('./app/index.js', watchify.args));
// add any other browserify options or transforms here
//bundler.transform('brfs');

gulp.task('js', jsbundle); // so you can run `gulp js` to build the file
bundler.on('update', jsbundle); // on any dep update, runs the bundler

function jsbundle() {
	return bundler.bundle()
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		// optional, remove if you dont want sourcemaps
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
		.pipe(sourcemaps.write('./')) // writes .map file
		//
		.pipe(gulp.dest('./dev'));
}

var htmlFiles = ['app/index.html']
	gulp.task('html', function(){
		// the base option sets the relative root for the set of files,
		// preserving the folder structure
		gulp.src(htmlFiles, { base: './app' })
			.pipe(gulp.dest('dev/'));


	});
gulp.task('watch-html', function(){

	gulp.watch("app/**/*.html", ['html', 'bs-reload']);
})

gulp.task('bs-reload', function () {
	browserSync.reload();
});


// watch files for changes and reload
gulp.task('serve', ['js2', 'watch-html'], function() {
	browserSync({
		server: {
			baseDir: 'dev'
		}
	});


	gulp.watch(['dev/**/*'], {cwd: 'dev'}, reload);
});

var appBundler = watchify(browserify(['./app'], watchify.args));
appBundler.on('update',  function(){ createBundle({ bundle: appBundler, name:'bundle.js', dest: './dev'})});

var vbBundler = watchify(browserify(['./app/vibratular'], watchify.args));
vbBundler.on('update', function(){ createBundle({bundle: vbBundler, name:'vibratular.js', dest: './dev'})});

var bundlers = [{ bundle: appBundler, name:'bundle.js', dest: './dev'},
	{ bundle: vbBundler, name:'bundle.js', dest: './dev' }];

function createBundle(bundler) {
	return (function() {
		console.log('Attempting Update');
		bundler.bundle.bundle()
			// log errors if they happen
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(source(bundler.name))
			// optional, remove if you dont want sourcemaps
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
			.pipe(sourcemaps.write('./')) // writes .map file
			//
			.pipe(gulp.dest(bundler.dest));
		browserSync.reload();
	})();
};
gulp.task('js2', function(){
	bundlers.forEach(function(bundler){
		createBundle(bundler);
	});

});
