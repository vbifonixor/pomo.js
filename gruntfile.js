module.exports = function(grunt) {	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					"js/script.js" : [ "js/dev/*.js" ]
				} // files
			} // my_target
		}, // uglify
		compass: {
			dev: {
				options: {
					config: "config.rb"
				} // options
			} // dev
		}, // compass
		watch: {
			options: { livereload: true },
			scripts: {
				files: [ "js/dev/*.js" ],
				tasks: [ "uglify" ]
			}, // scripts
			sass: {
				files: [ "sass/*.scss", "sass/partials/_*.scss" ],
				tasks: [ "compass:dev" ]
			}, // sass
			html: {
				files: [ "*.html" ]
			} // html
		} // watch
	}); // initConfig
	grunt.registerTask('default', 'watch');
} // exports