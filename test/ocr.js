const exec = require('child_process').exec;

var gs = 'gswin64'

exec(`${gs} -sDEVICE=pngmonod -dDownScaleFactor=3 -r1200 -q -sPAPERSIZE=a4 -sOutputFile=p%03d.png ./test/test.pdf`, (err) => {
  console.log(err);
  process.exit(0);
});
