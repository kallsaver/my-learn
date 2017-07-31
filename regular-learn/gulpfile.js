var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var plumber     = require('gulp-plumber');

var baseDir = './';
var current = 'views/001.html';

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
    	server: {
    		// 当前目录
            baseDir : baseDir + current,
        },
        notify : false
    });

    gulp.watch( baseDir + 'less/*.less', ['less']);
    gulp.watch( baseDir + 'css/*.css').on('change', browserSync.reload);
    gulp.watch( baseDir +　'*.html').on('change', browserSync.reload);

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

