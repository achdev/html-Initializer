/**
 * Grunt Task Runner configuration 
 * @author Anouar CHARIJ <m.charij.anouar@gmail.com>
 * @version 1.0.1
 */
module.exports = function(grunt) {
	/**
	 * Load all tasks
	 */
	require('load-grunt-tasks')(grunt);

	/**
	 * Grunt Configurations
	 */	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/**
		 * Compile JADE to HTML
		 * @module jade
		 */
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
		 * Prettify HTML
		 * @module prettify
		 */
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
		 * Compile SCSS to CSS
		 * @module sass
		 */
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
		 * CSSComb Formatter
		 * @module csscomb
		 */
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
		 * Minify the CSS files after the CSSComb
		 * @module cssmin
		 */
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
		 * Minify the JavaScript files
		 * @module uglify
		 */
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
		 * Minify Images
		 * @module imagemin
		 */
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
		 * Copy config & fonts files to dist
		 * @module copy
		 */
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
		 * Livereload connect
		 * @module connect
		 */
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
		 * Watchers	
		 * @module watch
		 */
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
	 * Register tasks
	 */
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