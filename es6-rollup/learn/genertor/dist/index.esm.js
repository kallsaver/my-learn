function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

//import 'babel-polyfill';

function* gernerator() {
    yield 'first';
    yield 'second';
    return 'ending';
}

console.log('isNative', isNative(gernerator));

var step = gernerator();

console.log(step.next());

console.log(step.next());

console.log(step.next());
