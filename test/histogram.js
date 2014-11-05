var should = require('should');
var Histogram = require('../histogram');

describe('Histogram', function () {
    var histogram;
    before(function () {
        histogram = new Histogram();
    })

    describe('Instantiation', function () {
        it('should be empty', function () {
            histogram.should.be.an.instanceOf(Histogram);
            histogram.should.be.ok;
            histogram.isEmpty().should.be.true;
        });
        it('should be in configuration mode', function () {
            histogram.configurationMode().should.be.true;
            histogram.runtimeMode().should.be.false;
        });
    });

    describe('Initialization', function () {
        it('should not allow to switch to runtime without at least one interval added', function () {
            (function () {
                histogram.start();
            }).should.throw();
        })
        it('should allow add intervals only in config mode', function () {
            (function () {
                histogram.addBound(1);
            }).should.not.throw();
        });
        it('should allow to configure bounds', function () {
            histogram.addBound(2);
        });
        it('should allow chain bound initialization', function () {
            histogram.addBound(5).addBound(10);
        });
        it('provides with ranges conbines from bounds', function () {
            histogram.ranges().should.be.equal([
                {name: '< 1', lo: undefined, hi: 1},
                {name: '1 - 2', lo: 1, hi: 2},
                {name: '2 - 5', lo: 2, hi: 5},
                {name: '5 - 10', lo: 5, hi: 10},
                {name: '10 >', lo: 10, hi: undefined}
            ]);
        });
        it('should allow clone histogram with configuration', function () {
            var clone = histogram.clone();
            clone.should.be.an.instanceOf(Histogram);
            clone.should.be.ok;
            clone.ranges().should.be.equal(histogram.ranges());
        })
    });

    describe('Runtime', function () {
        it('should ');
    });
});