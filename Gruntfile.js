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
		*	@module uglify
		*	Minify the JavaScript files
		**/
		uglify: {
			options: { mangle: true, sourceMap: true },
			dist: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: ['*.js', '**/*.js'],
					dest: 'dist/js/',
					ext: '.min.js'
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
		*	@module copy
		*	Copy config & fonts files to dist
		**/
		copy: {
			main: {
				files: [{
					expand: true, 
					flatten: true, 
					cwd: 'src',
					src: ['browserconfig.xml', 'site.webmanifest', 'tile.png', 'tile-wide.png', 'icon.png', 'favicon.png', 'apple-touch-icon.png'], 
					dest: 'dist',
					filter: 'isFile'
				},{
					expand: true,
					cwd: 'src/fonts',
					src: ['**'], 
					dest: 'dist/fonts/'
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
			scripts: {
				files: ['src/js/*.js', 'src/js/**/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: true,
					spawn: false,
				},
			},
			css: {
				files: ['src/scss/*.scss', 'src/scss/**/*.scss', 'src/scss/**/**/*.scss'],
				tasks: ['sass', 'csscomb', 'cssmin'],
				options: {
					livereload: true,
					spawn: false,
				},
			},
			jade: {
				files: ['src/*.jade'],
				tasks: ['jade', 'prettify'],
				options: {
					livereload: true,
					spawn: false,
				},
			},
			copy: {
				files: ['src/browserconfig.xml', 'src/site.webmanifest'],
				tasks: ['copy'],
				options: {
					livereload: true,
					spawn: false,
				},
			}
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
		'uglify',
		'imagemin',
		'copy',
		'connect',
		'watch',
	]);
};