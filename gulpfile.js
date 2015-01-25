var gulp = require('gulp')
require('engulped')(gulp)
require('6to5/register')

//run tests, then require file
function defineRunTask(name,deps){
  if(deps === undefined)
    deps = ['test']

  gulp.task('run-'+name,deps,function(){
    //many of these are command line programs
    //and we need to push off the gulp job name
    process.argv.shift()

    require('./lib/'+name)
  })
}


gulp.task('default',['build','test'])
defineRunTask('jack-connect')
defineRunTask('jack-make')
defineRunTask('serveOne')
defineRunTask('connectOne')
