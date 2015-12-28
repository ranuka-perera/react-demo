var gulp = require('gulp'),
    upload_gh = require('gulp-gh-pages');

// Deploy to github gh-pages branch.
gulp.task('deploy', function () {
    return gulp.src(['index.html', 'css/**/*', 'scripts/**/*', 'assets/**/*'], {base: './'})
        .pipe(upload_gh());
});