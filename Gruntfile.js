module.exports = function (grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'public/styles/main.css': 'sass/main.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass']);
};