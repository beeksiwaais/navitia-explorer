var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
    return bower('./build/dist')
});

gulp.task('default', ['bower']);
