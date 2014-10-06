/* global require, console */
'use strict';

var gulp = require('gulp'),
    pref = require('./preferences.json'),
    path = require('path'),
    $ = require('gulp-load-plugins')();

var process = function() {
	var structure = require('./structure.json');

	if ('object' === typeof structure) {
		structure.blocks.forEach(function(block) {
			var blockpath = pref.dir.root + path.sep + block.id + path.sep,
			    template = blockpath + pref.names.template,
			    jsondata = blockpath + pref.names.data;

		    gulp.src(template)
		        .pipe($.expectFile({ checkRealFile: true }, template))
		        .pipe($.data(function(file, cb) {
					cb(require('.' + path.sep + jsondata));
				}))
		        .pipe($.jade({}))
		        .pipe(gulp.dest(blockpath));
		});
	}
};

gulp.task('default', process);
