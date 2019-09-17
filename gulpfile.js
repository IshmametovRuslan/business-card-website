'use strict';

let gulp         = require( 'gulp' );
let sass         = require( 'gulp-sass' );
let autoprefixer = require( 'gulp-autoprefixer' );
let csso         = require( 'gulp-csso' );
let sourcemaps   = require( 'gulp-sourcemaps' );
let bs           = require( 'browser-sync' ).create();
let image        = require( 'gulp-image' );

gulp.task( 'html', function () {
	return gulp.src( 'app/*.html' )
	           .pipe( gulp.dest( 'dist' ) )
	           .pipe( bs.reload( {
		           stream : true
	           } ) );
} );

gulp.task( 'scripts', function () {
	return gulp.src( [ 'app/js/scripts.js' ] )
	           .pipe( gulp.dest( 'dist/js' ) )
	           .pipe( bs.reload( {
		           stream : true
	           } ) );
} );

gulp.task( 'image', function () {
	gulp.src( 'app/img/**/*.+(png|jpg|jpeg|gif|svg)' )
	    .pipe( image() )
	    .pipe( gulp.dest( 'dist/img' ) )
	    .pipe( bs.reload( {
		    stream : true
	    } ) );
} );

gulp.task( 'sass', function () {
	return gulp.src( 'app/scss/**/*.+(sass|scss)' )
	           .pipe( sourcemaps.init() )
	           .pipe( sass( {} ) )
	           .pipe( autoprefixer( 'last 2 version' ) )
	           .pipe( csso( {} ) )
	           .pipe( sourcemaps.write() )
	           .pipe( gulp.dest( 'dist/css' ) )
	           .pipe( bs.reload( {
		           stream : true
	           } ) )
} );

gulp.task( 'watch', function () {
	gulp.watch( 'app/scss/**/*.+(sass|scss)', gulp.series( 'sass' ) );
	gulp.watch( 'app/js/**/*.js', gulp.series( 'scripts' ) );
	gulp.watch( 'app/*.html', gulp.series( 'html' ) );
	// другие ресурсы
} );

gulp.task( 'browserSync', function () {
	bs.init( {
		server : {
			baseDir : 'dist'
		},
	} )
} );

gulp.task( 'default', gulp.series(
	gulp.parallel( 'sass', 'html', 'scripts' ),
	gulp.parallel( 'watch', 'browserSync' ),
	gulp.parallel( 'image', 'browserSync' ),
) );