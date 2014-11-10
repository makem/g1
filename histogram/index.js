/**
 * Created by mavy on 11/5/2014.
 */
var _ = require('underscore');


module.exports = function Histogram() {

    const MODE_CONFIGURATION = 0;
    //const MODE_RUNTIME = 1;

    this.bounds = [];
    this.mode = MODE_CONFIGURATION;
    var _ranges = [];

    /**
     * Recalculates bounds range
     * @private
     */
    var _recalculateRanges = function(){
        var sortedBounds = _.sortBy(this.bounds);
        var ranges = [];
        for (var i = 0; i < sortedBounds.length; i++) {
            var bound = sortedBounds[i];
            if (!i) {
                ranges.push({name: '< ' + bound, lo: undefined, hi: bound});
            }
            if(i){
                var prevBound = sortedBounds[i-1];
                ranges.push({name: prevBound+' - '+bound, lo: prevBound, hi: bound});
            }
            if (i == sortedBounds.length-1) {
                ranges.push({name: bound + ' >', lo: bound, hi: undefined});
            }
        }
        _ranges = ranges;

    };

    this.getRanges = function(){
        return _ranges;
    };

    /**
     * Specify the histogram has no bounds added
     * @returns {boolean}
     */
    this.isEmpty = function(){
        return !this.bounds.length;
    };

    /**
     * Specify whether histogram in configuration mode
     * @returns {boolean}
     */
    this.configurationMode = function () {
        return this.mode == MODE_CONFIGURATION;
    };

    /**
     * Specify whether histogram in runtime mode
     * @returns {boolean}
     */
    this.runtimeMode = function () {
        return false;
    };

    /**
     * Add new bound during configuration mode, providing the value
     * @param value
     */
    this.addBound = function (value) {
        if (this.runtimeMode()) {
            throw new Error('Can not add new bound in runtime mode');
        }
        this.bounds.push(value);
        _recalculateRanges.call(this);
        return this;
    };

    this.start = function () {
        if (this.isEmpty()) {
            throw new Error('Could not start because no bounds are defined');
        }
    };

    this.clone = function(){
      var clone = new Histogram();
        _.each(this.bounds,function(b){
           clone.addBound(b);
        });
        return clone;
    };

    /**
     *
     */
    this.finish = function () {

    };

};