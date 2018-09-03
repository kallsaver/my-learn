(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var _marked = /*#__PURE__*/regeneratorRuntime.mark(gernerator);

//import 'babel-polyfill';

function gernerator() {
    return regeneratorRuntime.wrap(function gernerator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 'first';

                case 2:
                    _context.next = 4;
                    return 'second';

                case 4:
                    return _context.abrupt('return', 'ending');

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

console.log('isNative', isNative(gernerator));

var step = gernerator();

console.log(step.next());

console.log(step.next());

console.log(step.next());

})));
