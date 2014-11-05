/**
 * Created by mavy on 11/4/2014.
 */

console.log('child process started');
var Timer = require('../../timer');
var timer = new Timer();
process.on('message',function(m){
    var time = process.hrtime();
    process.send(m);
});
process.stdin.resume();

