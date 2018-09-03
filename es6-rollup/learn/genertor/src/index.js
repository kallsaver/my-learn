
import { isNative } from '../../../util/util.js';

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