const exec = require('child_process').exec;

var gs = 'gswin64c'

exec(`${gs} -sDEVICE=pngmonod -dBATCH -dSAFER -dNOPAUSE -dDownScaleFactor=3 -r1200 -q -sPAPERSIZE=a4 -sOutputFile=p%03d.png ./test/test.pdf`, (err) => {
  console.log(err);
  process.exit(0);
});
