/**
*	@author Anouar CHARIJ <m.charij.anouar@gmail.com>
*	Grunt Task Runner configuration
**/
module.exports = function(grunt) {
	/**
	*	Load all tasks
	**/
	require('load-grunt-tasks')(grunt);

	/**
	*	Grunt Configurations
	**/	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/**
		*	@module jade
		*	Compile JADE to HTML
		**/
		jade: {
			compile: {
				options: {
					pretty: true,
					data: { debug: true }
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: '*.jade',
					dest: 'dist/',
					ext: '.html'
				}]
			}
		},
		/**
		*	@module sass
		*	Compile SCSS to CSS
		**/
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'auto',
					noCache: false,
					update: true
				},
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['*.scss', '**/*.scss', '**/**/*.scss'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},
    });
    
    /**
    *	Register tasks
    **/
    grunt.registerTask('default', [
		'jade',
		'sass',
	]);
};