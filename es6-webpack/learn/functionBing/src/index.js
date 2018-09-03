let obj = {
    fn() {
        console.log(this.name)
    },
    name: 'obj'
}


let relative = {
    name: 'relative'
}

obj.fn.bind(relative)();

//relative::obj.fn();
