var fork = require('child_process').fork;

var childPath = __dirname +'/child.js';
var child = fork(childPath);

console.log('Child path:', childPath);
console.log('Spawned child pid: ' + child.pid);

child.on('close', function (code, signal) {
    console.log('child process terminated due to receipt of signal '+signal);
});

var steps = 1;

var Timer = require('../../timer');
var outs = [];
var tm = 0;

child.on('message',function(m){
    var timer = new Timer();
    timer.start(m.time);
    timer.stop();
   outs.push(timer.getMsElapsed());
    tm++;
});

setInterval(function() {
    for (var i = 0; i < steps; i++) {
        var time = process.hrtime();
        var timer = new Timer(true);
        child.send({ i: i, time: time, obj:{name:"Ivan", lastName:"Hurrah", uid:12312312312312123,inc:{name:"internal"}}});
        timer.stop(true);
    }

},1000);

setInterval(function(){
    console.log('outs',outs);
    console.log('tm',tm);
},2000)
