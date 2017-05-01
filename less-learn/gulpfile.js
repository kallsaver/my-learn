var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        serve: "./12modularity/index.html"
    });

    gulp.watch("12modularity/css/*.less", ['less']);
    gulp.watch("12modularity/css/*.css").on('change', browserSync.reload);
    gulp.watch("12modularity/*.html").on('change', browserSync.reload);

});


gulp.task('less', function() {
    return gulp.src("12modularity/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("12modularity/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

