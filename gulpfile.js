'use strict';

// Module dependencies
const gulp        = require('gulp'),
      browserSync = require('browser-sync'),
      reload      = browserSync.reload,
	  nodemon     = require('gulp-nodemon'),
	  sourcemaps  = require('gulp-sourcemaps'),
	  sass        = require('gulp-sass'),
	  sassGlob    = require('gulp-sass-glob'),
	  uglify      = require('gulp-uglify'),
	  rename      = require('gulp-rename'),
	  browserify  = require('browserify'),
	  babelify    = require('babelify'),
	  source      = require('vinyl-source-stream'),
	  buffer	  = require('vinyl-buffer');


/////////////////////
// - BrowserSync
/////////////////////
gulp.task('browser-sync', ['nodemon'], () =>  {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*.js", "public/**/*.css", "src/views/**/*.ejs"],
        browser: "google chrome",
        port: 7000,
	});
});

// Restart server
gulp.task('nodemon', (cb) => {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', () => {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
    })
    .on('restart', () => {
        setTimeout(function() {
			reload({stream: false});
		}, 2000);
    })
});


/////////////////
// - SCSS/CSS
/////////////////
const SCSS_SRC  = 'src/build/scss/**/*.scss';
const SCSS_DEST = 'public/css';

gulp.task('build-scss', function() {
    return gulp.src(SCSS_SRC)
		.pipe(sourcemaps.init())
			.pipe(sassGlob())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(SCSS_DEST));
});

// Detect changes in SCSS
gulp.task('watch-scss', () => {
    gulp.watch(SCSS_SRC, ['build-scss']);
})


/////////////////////////
// - BABEL + Browserify
/////////////////////////
const JS_SRC  = 'src/build/js/**/*.js';
const JS_DEST = 'public/js/' 
 
gulp.task('build-es6', () => {
	console.log('building js files');
	return browserify({entries: 'src/build/js/app.js', debug: true})
		.transform("babelify", { presets: ["env"] })
		.bundle()
		.pipe(source('bundle.min.js'))
        .pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(JS_DEST));
});

// Detect changes in JS
gulp.task('watch-es6', () => {
    gulp.watch(JS_SRC, ['build-es6']);
})



// - Reload browser on file save
gulp.task('default', ['browser-sync','build-scss', 'watch-scss', 'build-es6', 'watch-es6']);