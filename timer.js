/**
 * Created by mavy on 11/4/2014.
 */
function Timer(startup){
    if(startup){
        this.start();
    }
}

Timer.prototype.start = function(point){
    this.elapsed = null;
    if(point){
        this.started = point;
    }else {
        this.started = process.hrtime();
    }
}

Timer.prototype.stop = function(print){
    if(!this.elapsed){
        this.elapsed = process.hrtime(this.started);
        if(print){
            this.print();
        }
    }
}

Timer.prototype.print = function(){
    if(this.elapsed){
        console.info("Execution time: %ds %dms", this.elapsed[0], this.elapsed[1]/1000000);
    }
}

Timer.prototype.getMsElapsed = function(){
    if(this.elapsed){
        return this.elapsed[1]/1000000;
    }
}

Timer.prototype.nanoSecondsSpent = function(startTime, finishTime){
    return finishTime[1]-startTime[1];
}

Timer.prototype.msSpent = function(startTime, finishTime){
    return (finishTime[1]-startTime[1])/1000000;
}

Timer.prototype.nanoSeconds = function(){
    return this.elapsed[0]*1e9 + this.elapsed[1];
}

Timer.prototype.microSeconds = function(){
    return this.elapsed[0]*1e6 + this.elapsed[1]/1000000;
}


module.exports = Timer;