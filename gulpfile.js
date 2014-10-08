/* global require, console */
'use strict';

var gulp = require('gulp'),
    structure = require('./structure.json'),
    $ = require('gulp-load-plugins')();

var engine = {
	parse: function(branch) {
		if ('object' === typeof branch) {
			branch.block.forEach(function(block) {
				engine.process(block);

				if ('object' === typeof block.content) {
					engine.parse(block.content);
				}
			});
		}
	},

	process: function(block) {
		var pref = require('./preferences.json'),
		    path = require('path'),
		    dir = pref.dir.root + path.sep + block.name + path.sep,
		    basename = dir + block.name,
		    template = basename + '.' + pref.extension.template,
		    jsondata = '.' + path.sep + dir + block.name + '.' + pref.extension.data,
		    markup = block.name + '.' + pref.extension.markup;

			gulp.src(template)
				.pipe($.expectFile({ checkRealFile: true }, template))
				.pipe($.data(function(file) {
					return require(jsondata);
				}))
				.pipe($.jade({
					pretty: true
				}))
				.pipe($.rename(markup))
				.pipe(gulp.dest(dir));
	}
};

gulp.task('default', function() {
	engine.parse(structure);
});
