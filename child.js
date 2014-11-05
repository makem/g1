/**
 * Created by mavy on 11/4/2014.
 */

console.log('child process started');
var Timer = require('./timer');
var timer = new Timer();
process.on('message',function(m){
    var time = process.hrtime();
   //console.log('Message have been received:', m, ' of time ',time);
   //console.log('Time to send message, ms:',timer.msSpent(m.time,time));
    process.send(m);
});
process.stdin.resume();

