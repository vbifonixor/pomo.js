var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('compass-importer');
var connect = require('gulp-connect');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

gulp.task('connect', function () {
	connect.server({
		root: '',
		livereload: true
	});
});


gulp.task('sass', function () {
	gulp.src('src/scss/**/*.scss')
		.pipe(sass({
			importer: compass,
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('src/css'))
		.pipe(connect.reload());
});

gulp.task('csso', function () {
	gulp.src('src/css/*.css')
		.pipe(gulp.dest('app/css'))
		.pipe(connect.reload());
})

gulp.task('html', function () {
	gulp.src('./*.html')
		.pipe(connect.reload());
});

gulp.task('images', function () {
	gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('app/img/'))
		.pipe(connect.reload());
})

gulp.task('js', function () {
	gulp.src('src/js/*.js')
//		.pipe(uglify())
		.pipe(gulp.dest('app/js/'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['src/scss/**/*.scss'], ['sass']);
	gulp.watch(['src/css/*.css'], ['csso']);
	gulp.watch(['src/js/**/*.js'], ['js']);
});


gulp.task('serve', ['connect', 'sass', 'csso', 'html', 'js', 'watch']);
gulp.task('default', ['sass', 'csso', 'images', 'js']);

gulp.watch();