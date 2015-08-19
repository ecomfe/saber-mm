/**
 * @file Abstract spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var Abstract = require('saber-mm').Abstract;
    var inherits = require('saber-lang').inherits;

    describe('Abstract', function () {

        it('event support array', function () {
            var fn1 = jasmine.createSpy('fn');
            var fn2 = jasmine.createSpy('fn');
            var abs = new Abstract({
                events: {
                    hello: [fn1, fn2]
                }
            });

            abs.init();
            abs.emit('hello');
            expect(fn1).toHaveBeenCalled();
            expect(fn2).toHaveBeenCalled();
        });

        it('merge events', function () {
            var fn1 = jasmine.createSpy('fn');
            var fn2 = jasmine.createSpy('fn');

            function Sub(options) {
                Abstract.call(this, options);
            }

            Sub.prototype.events = {
                hello: fn1
            };

            inherits(Sub, Abstract);

            var sub = new Sub({
                events: {
                    hello: fn2
                }
            });

            sub.init();
            sub.emit('hello');
            expect(fn1).toHaveBeenCalled();
            expect(fn2).toHaveBeenCalled();
        });

    });

});
