var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    serverDir = require('minimist')(process.argv.slice(2)).serverDir,
    node
;

gulp.task('server', function () {
  if (node) { node.kill() };
  console.log('\n Bouncing server..... \n');
  node = spawn('node', ['../' + serverDir + '/server.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default', function () {
  gulp.watch('../' + serverDir + '/*.js', ['server'])
});

process.on('exit', function () {
  if (node) { node.kill() }
})