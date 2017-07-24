var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var plumber     = require('gulp-plumber');

var current = '08when/';

var dir = 'less-learn/';

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
    	server: {
    		// 当前目录
            baseDir : './' + current,
        },
        notify : false
    });

    gulp.watch( current + 'css/*.less', ['less']);
    gulp.watch( current + 'css/*.css').on('change', browserSync.reload);
    gulp.watch( current +　'*.html').on('change', browserSync.reload);

});


gulp.task('less', function() {
    return gulp.src( current + 'css/*.less' )
        .pipe(plumber({
            errorHandler : function(){
                this.emit('end');
            }
        }))
        .pipe(less())
        .on('error',function(err){
		    console.log('Error: ',err.message);
	    })
        .pipe(gulp.dest( current + 'css' ))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

