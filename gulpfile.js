var gulp = require('gulp')
require('engulped')(gulp)

gulp.task('default',['build','test'])
gulp.task('run', ['build','test'], function() {
  require('./dist/')
})

gulp.task('run-client', ['build','test'], function() {
  new require('./dist/client')
})

gulp.task('run-one-client', ['build','test'], function() {
  new require('./dist/connectOne')
})

gulp.task('run-one-server', ['build','test'], function() {
  new require('./dist/serveOne')
})

gulp.task('run-server', ['build','test'], function() {
  new require('./dist/server')
})
