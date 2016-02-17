'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');


// var sass = require('gulp-sass');
//     autoprefixer = require('gulp-autoprefixer');
//     minifyCSS = require('gulp-minify-css');
//     rename = require('gulp-rename');

// gulp.task('sass', function(){
//   gulp.src('./scss/style.scss')
//   .pipe(sass())
//    .pipe(autoprefixer({
//      browsers: ['last 2 versions']
//    }))
//   .pipe(minifyCSS())
//   .pipe(rename('style.min.css'))
//   .pipe(gulp.dest('./build/css'));
//   });


gulp.task('compile-react', function() {
	return gulp.src('main.jsx')
	  .pipe(plumber())
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(browserify({
			insertGlobals: true,
			debug: true
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('browser-sync', ['compile-react'], function() {

	browserSync.init({
		server: './'
	});


	// gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch(['main.jsx'], ['compile-react']);
	gulp.watch(['main.js', 'index.html']).on('change', browserSync.reload);
	// './build/css/style.min.css'
});

gulp.task('default', ['browser-sync']);
