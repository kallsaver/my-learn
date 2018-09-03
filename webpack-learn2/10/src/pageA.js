//import "./subPageA";
//import "./subPageB";
import * as _ from 'lodash';

var page = 'subPageA';

// 通过注释写生成的文件名...
// 有个坑点是import() import和括号之间不能带空格,否则报错
// 不推荐用import,容易报错,推荐用AMD的语法或者require.ensure
if (page == 'subPageA'){
    import(/* webpackChunkName: 'subPageA' */ './subPageA').then(function (subPageA) {
        console.log('加载完成subPageA.js');
        console.log(subPageA);
        console.log(_.join([1, 2], 3));
    });
}else {
    // 尽管page == subPageA,但是webpack还是把import里面的文件打包出来了
    import(/* webpackChunkName: 'subPageB' */ './subPageB').then(function (subPageB) {
        console.log('加载完成subPageA.js');
        console.log(subPageB);
    });
}

console.log('pageA');
export default 'pageA';