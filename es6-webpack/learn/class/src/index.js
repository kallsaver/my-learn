import a from './sub.js';

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

let p = new Rectangle(100, 200);

console.log(p);

export default {
    p
}