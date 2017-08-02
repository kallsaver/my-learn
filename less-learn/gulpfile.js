var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var plumber     = require('gulp-plumber');
var webserver   = require('gulp-webserver');

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {
	
	gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));

    gulp.watch( '**/css/*.less', ['less']);

});


gulp.task('less',function(){
  return gulp.src('**/css/*.less')
        .pipe(plumber({
          errorHandler : function(error){
            console.log(error.message);
            this.emit('end');
          }
        }))
        .pipe(less())
        .pipe(gulp.dest(''));
});

gulp.task('default', ['serve']);

