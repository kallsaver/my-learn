import { isNative } from '../../../util/util.js';

console.log(isNative(Promise))

function* gen() {
    yield 'first';
    yield 'second';
    return 'ending';
}

console.log(isNative(gen));

let step = gen();

console.log(step.next())

export default {

}
