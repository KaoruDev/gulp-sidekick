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
  connect.server({
    root: staticDir,
    livereload: true
  });

  gulp.watch(['../' + staticDir + '/*.html'], ['static:html']);
  gulp.watch(['../' + staticDir + '/*.css'], ['static:html']);
  gulp.watch(['../' + staticDir + '/*.js'], ['static:html']);
});

gulp.task('static:html', function () {
  gulp.src('../' + staticDir + '/*.html')
    .pipe(connect.reload());
});

process.on('exit', function () {
  if (node) { node.kill() }
});