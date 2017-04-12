var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var less        = require('gulp-less');


// Static Server + watching scss/html files
gulp.task('serve', ['sass','less'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/less/*.less", ['less']);
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    // app/**/*.js+app/*.js = 下面app下的任何js文件
    gulp.watch("app/**/*.js").on('change', browserSync.reload);
    gulp.watch("app/*.js").on('change', browserSync.reload);
    
    gulp.watch("app/*/*.html").on('change', browserSync.reload);
    gulp.watch("app/css/*.css").on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('less', function() {
    return gulp.src("app/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
