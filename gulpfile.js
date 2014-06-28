var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    argv = require('minimist')(process.argv.slice(2)),
    serverDir = argv.serverDir,
    nodeFile = argv.nodeFile || 'server.js',
    node
;

gulp.task('server', function () {
  if (node) {
    node.kill()
    console.log('\n Bouncing server..... \n');
  };
  node = spawn('node', ['../' + serverDir + '/' + nodeFile], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('default', function () {
  console.log("\n Starting up " + serverDir + '/' + nodeFile);
  gulp.run('server');
  gulp.watch('../' + serverDir + '/*.js', ['server'])
});

process.on('exit', function () {
  if (node) { node.kill() }
})