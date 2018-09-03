const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const babel = require('rollup-plugin-babel');
const cjs = require('rollup-plugin-commonjs');
const node = require('rollup-plugin-node-resolve');
const glob = require('glob-all');
const treeify = require('treeify');
const consola = require('consola');
const merge = require('merge');

// rollup对babel的支持是在plugins中一个个加
// rollup对babel-plugin-transform-runtime的支持

let deepClone = (source, target) => {
    return merge(true, source, target);
}

let tree = obj => {
    if (typeof obj !== 'object') {
        console.log(obj);
        return;
    }
    console.log(treeify.asTree(obj, true));
}

let files = glob.sync([
    'learn/**/src/index.js',      
]);


let builds = files.map((src) => {
    let dist = src.replace(/src/, 'dist');
    let file = {
        input: path.resolve(__dirname, src),
        output: {
            file: path.resolve(__dirname, dist),
            // 直接引入
            format: 'umd',
            // 'umd'模式是运行在浏览器上的,作为全局变量
            name: 'learn',
        },
        plugins: [
            node(),
            cjs(),
        ]
    };
    return file;
});

builds.forEach((config) => {
    tree(config.input)
    rollup.rollup({
        input: config.input,
        plugins: config.plugins.concat(babel({
            plugins: ['external-helpers'],
        }))
    }).then((bundle) => {
        bundle.write(config.output);

        let esmPath = config.output.file.replace(/(.*)\.js$/, '$1.esm.js')
        tree(esmPath)
        let esm = deepClone(config, {
            output: {
                file: esmPath,
                // 直接引入
                format: 'es',
            },
        });

        rollup.rollup({
            input: esm.input,
            plugins: esm.plugins
        }).then((bundle) => {
            bundle.write(esm.output);
        })
     
    });
});



