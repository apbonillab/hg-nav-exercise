module.exports = function (grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'public/styles/site.css': 'sass/site.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass']);
};