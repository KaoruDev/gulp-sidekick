var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    connect = require('gulp-connect'),
    argv = require('minimist')(process.argv.slice(2)),
    serverDir = argv.serverDir,
    nodeFile = argv.nodeFile || 'server.js',
    staticDir = argv.staticDir,
    node
;

gulp.task('default', ['server'], function () {
  console.log("\n Starting up " + serverDir + '/' + nodeFile);
  gulp.watch('../' + serverDir + '/*.js', ['server'])
});

gulp.task('server', function () {
  if (node) {
    node.kill()
    console.log('\n Bouncing server..... \n');
  };

  node = spawn('node', [argv.debug? 'debug' : '', ('../' + serverDir + '/' + nodeFile)], {stdio: 'inherit'});

  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('static', function () {
  gulp.watch(['../' + staticDir + '/*.html'], ['html'])
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

process.on('exit', function () {
  if (node) { node.kill() }
});