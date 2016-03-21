module.exports = function (grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'public/styles/main.css': 'sass/main.scss'
				}
			}
		},
		watch: {
			files: ['sass/**/*.scss', 'public/js/**/*.js'],
			tasks: ['sass', 'jsdoc']
		},
		jsdoc : {
			dist : {
				src: ['public/js/**/*.js'],
				jsdoc: './node_modules/.bin/jsdoc',
				options: {
					private: true,
					destination: 'doc',
					showPrivate: true
				}
			}
		},
		karma: {
			unit: {
				configFile: 'tests/karma.conf.js'
			}
		},
		backstop: {
			setup: {
				options : {
					backstop_path: './bower_components/BackstopJS',
					test_path: './tests/backstop',
					setup: false,
						configure: true
				}
				},
				test: {
					options : {
						backstop_path: './bower_components/BackstopJS',
						test_path: './tests/backstop',
						create_references: false,
							run_tests: true
					}
				},
				reference: {
					options : {
						backstop_path: './bower_components/BackstopJS',
						test_path: './tests/backstop',
						create_references: true,
							run_tests: false
					}
				}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-backstop');

	grunt.registerTask('default', ['sass', 'jsdoc', 'watch']);
};