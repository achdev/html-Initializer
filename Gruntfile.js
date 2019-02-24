/**
 * HTML Initializer's Gruntfile
 *
 * Grunt Task Runner configuration
 * @author Anouar CHARIJ <m.charij.anouar@gmail.com>
 * @version 1.0.1
 */
module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Project Meta
    meta: {
      src: {
        dir: 'src',
        pug: 'src/pug',
        sass: 'src/scss',
        js: 'src/js',
        img: 'src/img',
        fonts: 'src/fonts'
      },
      dist: {
        dir: 'dist',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/img',
        fonts: 'dist/fonts'
      }
    },
    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: [{
          expand: true,
          cwd: '<%= meta.src.dir %>/',
          src: '*.pug',
          dest: '<%= meta.dist.dir %>/',
          ext: '.html'
        }]
      }
    },
    prettify: {
      options: {
        config: '.prettifyrc'
      },
      files: {
        expand: true,
        cwd: '<%= meta.dist.dir %>/',
        ext: '.html',
        src: ['*.html'],
        dest: '<%= meta.dist.dir %>/'
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc.js'
      },
      target: ['<%= meta.src.js %>/*.js']
    },
    sass: {
      options: {
        sourcemap: 'inline',
        noCache: false,
        update: false,
        style: 'compressed'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= meta.src.sass %>/',
          src: ['*.scss', '**/*.scss', '**/**/*.scss'],
          dest: '<%= meta.dist.css %>/',
          ext: '.min.css'
        }]
      }
    },
    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      dynamic_mappings: {
        expand: true,
        cwd: '<%= meta.dist.css %>/',
        src: '*.min.css',
        dest: '<%= meta.dist.css %>/',
        ext: '.min.css'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      dist: {
        files: [{
          cwd: '<%= meta.dist.css %>/',
          src: '*.min.css',
          dest: '<%= meta.dist.css %>/',
          ext: '.min.css'
        }]
      },
    },
    uglify: {
      options: {
        mangle: true,
        sourceMap: {
          includeSources: true
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= meta.src.js %>',
          src: ['*.js', '**/*.js'],
          dest: '<%= meta.dist.js %>',
          ext: '.min.js'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= meta.src.dir %>/',
          src: ['*.{png,ico,jpg,jpeg,gif}'],
          dest: '<%= meta.dist.dir %>/',
        }, {
          expand: true,
          cwd: '<%= meta.src.img %>',
          src: ['*.{png,ico,jpg,jpeg,gif}'],
          dest: '<%= meta.dist.img %>',
        }]
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= meta.src.dir %>',
          src: ['.htaccess', 'browserconfig.xml', 'site.webmanifest', 'tile.png', 'tile-wide.png', 'icon.png', 'favicon.ico', 'apple-touch-icon.png', 'humans.txt', 'robots.txt'],
          dest: '<%= meta.dist.dir %>',
          filter: 'isFile'
        }, {
          expand: true,
          cwd: '<%= meta.src.fonts %>',
          src: ['**'],
          dest: '<%= meta.dist.fonts %>',
        }]
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 3000,
          base: '<%= meta.dist.dir %>/',
          livereload: true,
          open: true,
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= meta.src.js %>/*.js', '<%= meta.src.js %>/**/*.js'],
        tasks: ['uglify'],
        options: {
          livereload: true,
          spawn: false,
        },
      },
      css: {
        files: ['<%= meta.src.sass %>/*.scss', '<%= meta.src.sass %>/**/*.scss', '<%= meta.src.sass %>/**/**/*.scss'],
        tasks: ['sass', 'csscomb', 'cssmin'],
        options: {
          livereload: true,
          spawn: false,
        },
      },
      pug: {
        files: ['<%= meta.src.dir %>/*.pug'],
        tasks: ['pug', 'prettify'],
        options: {
          livereload: true,
          spawn: false,
        },
      },
      copy: {
        files: ['<%= meta.src.dir %>/browserconfig.xml', '<%= meta.src.dir %>/site.webmanifest'],
        tasks: ['copy'],
        options: {
          livereload: true,
          spawn: false,
        },
      }
    },
  });

  // Register tasks
  grunt.registerTask('server', [
    'pug',
    'prettify',
    'sass',
    'csscomb',
    'autoprefixer',
    'eslint',
    'uglify',
    'imagemin',
    'copy',
    'connect',
    'watch',
  ]);

  // Register tasks
  grunt.registerTask('build', [
    'pug',
    'prettify',
    'sass',
    'csscomb',
    'uglify',
    'imagemin',
    'copy'
  ]);
};
