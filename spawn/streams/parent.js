var Timer = require ('../../timer');

var spawn = require('child_process').spawn;

var childPath = __dirname +'/child.js';



var child = spawn('node',[childPath]);
console.log('Child path:', childPath);
console.log('Spawned child pid: ' + child.pid);

child.on('close', function (code, signal) {
    console.log('child process terminated due to receipt of signal '+signal);
});
child.stdout.setEncoding('utf8');
var count = 0;

var timer = new Timer(true);
child.stdin.write("Test");
child.stdout.on('data',function(data){
    timer.stop(true);
    child.stdin.end();
});
