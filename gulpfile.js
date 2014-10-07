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
			    template = blockpath + block.id + '.' + pref.extension.template,
			    jsondata = './' + blockpath + block.id + '.' + pref.extension.data,
			    markup = block.id + '.' + pref.extension.markup;

			gulp.src(template)
				.pipe($.expectFile({ checkRealFile: true }, template))
				.pipe($.data(function(file) {
					return require(jsondata);
				}))
				.pipe($.jade({
					pretty: true
				}))
				.on('error', function(event) {
					console.log(
						'error', event
					);
				})
				.pipe($.rename(markup))
				.pipe(gulp.dest(blockpath));
		});
	}
};

gulp.task('default', process);
