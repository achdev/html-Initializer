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
		*	@module prettify
		*	Prettify HTML
		**/
		prettify: {
			options: {
				config: '.prettifyrc'
			},
			files: {
				expand: true,
				cwd: 'dist/',
				ext: '.html',
				src: ['*.html'],
				dest: 'dist/'
			}
		},
		/**
		*	@module sass
		*	Compile SCSS to CSS
		**/
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'auto',
					noCache: false,
					update: true
				},
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['*.scss', '**/*.scss', '**/**/*.scss'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},
		/**
		*	@module csscomb
		*	CSSComb Formatter
		**/
		csscomb: {
			options: { config: '.csscomb.json' },
			dynamic_mappings: {
				expand: true,
				cwd: 'dist/css',
				src: '*.min.css',
				dest: 'dist/css',
				ext: '.min.css'
			}
		},
		/**
		*	@module cssmin
		*	Minify the CSS files after the CSSComb
		**/
		cssmin: {
			options: { sourceMap: true },
			target: {
				files: [{
					expand: true,
					cwd: 'dist/css',
					src: '*.min.css',
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},
		/**
		*	@module imagemin
		*	Minify Images
		**/
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/', 
					src: ['*.{png,ico,jpg,jpeg,gif}'],
					dest: 'dist/'
				},{
					expand: true,
					cwd: 'src/img/', 
					src: ['*.{png,ico,jpg,jpeg,gif}'],
					dest: 'dist/img/'
				}]
			}
		},
		/**
		*	@module connect
		*	Livereload connect
		**/
		connect: {
			server: {
				options: {
					hostname: '*',
					port: 8000,
					base: 'dist/',
					livereload: true,
					open: true
				}
			}
		},
		/**
		*	@module watch
		*	Watchers	
		**/
		watch: {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				},
				livereload: true
			},
			files: {
				files: ['src/*.jade', 'src/scss/*.scss', 'src/scss/**/*.scss', 'src/scss/**/**/*.scss'],
				tasks: ['jade', 'prettify', 'sass', 'csscomb', 'cssmin']
			},
		}
    });
    
    /**
    *	Register tasks
    **/
    grunt.registerTask('default', [
		'jade',
		'prettify',
		'sass',
		'csscomb',
		'cssmin',
		'imagemin',
		'connect',
		'watch',
	]);
};