webpackJsonp([5],{

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
//import "./subPageA";
//import "./subPageB";


var page = 'subPageA';

// 通过注释写生成的文件名...
// 有个坑点是import() import和括号之间不能带空格,否则报错
if (page == 'subPageA'){
    Promise.all/* import() */([__webpack_require__.e(2), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, 2)).then(function (subPageA) {
        console.log('加载完成subPageA.js');
        console.log(subPageA);
        console.log(__WEBPACK_IMPORTED_MODULE_0_lodash__["join"]([1, 2], 3));
    });
}else {
    // 尽管page == subPageA,但是webpack还是把import里面的文件打包出来了
    Promise.all/* import() */([__webpack_require__.e(1), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, 3)).then(function (subPageB) {
        console.log('加载完成subPageA.js');
        console.log(subPageB);
    });
}

console.log('pageA');
/* harmony default export */ __webpack_exports__["default"] = ('pageA');

/***/ })

},[4]);