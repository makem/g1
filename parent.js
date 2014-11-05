var spawn = require('child_process').spawn;
var fork = require('child_process').fork;

var childPath = __dirname +'/child.js';
//var child = spawn('node',[childPath]);
var child = fork(childPath);

console.log('Child path:', childPath);
console.log('Spawned child pid: ' + child.pid);

child.on('close', function (code, signal) {
    console.log('child process terminated due to receipt of signal '+signal);
});

//child.stdout.setEncoding('utf8');
//var count = 0;
//child.stdout.on('data',function(data){
//    console.log('data:',data);
//    console.log('counter:',count++);
//});
//
//child.stdin.write("Hello client from Server");
var steps = 1;

function Logger(){

};

Logger.prototype.log = function(msg){
  console.log(msg);
};
var Timer = require('./timer');
var logger = new Logger();
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
        //child.stdin.write(i+' {name:"Ivan", lastName:"Hurrah", uid:12312312312312123,inc:{name:"internal"}}');
        var time = process.hrtime();
        //console.log('Sent message ', i, ' at', time);
        var timer = new Timer(true);
        child.send({ i: i, time: time, obj:{name:"Ivan", lastName:"Hurrah", uid:12312312312312123,inc:{name:"internal"}}});
        timer.stop(true);
    }

},1000);
setTimeout(function(){
    console.log('outs',outs);
    console.log('tm',tm);
},5000)
//setTimeout(function(){
//    console.log('total count:',count);
//},1000)
//child.stdin.end();