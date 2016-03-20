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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('default', ['sass', 'jsdoc', 'watch']);
};