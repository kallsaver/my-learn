webpackJsonp([2],{

/***/ "4pjk":
/***/ (function(module, exports, __webpack_require__) {

exports.done = false;
var b = __webpack_require__("K3Bj");
console.log('a.js-1', b.done);
exports.done = true;
console.log('a.js-2', '执行完毕');

/***/ }),

/***/ "K3Bj":
/***/ (function(module, exports, __webpack_require__) {

exports.done = false;
var a = __webpack_require__("4pjk");
console.log('b.js-1', a.done);
exports.done = true;
console.log('b.js-2', '执行完毕');

/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__filename, process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__("j1ja");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("M4fF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("7t+N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__moduleA__ = __webpack_require__("xeB+");
//import "./subPageA";
//import "./subPageB";




var path = __webpack_require__("o/zv");
var treeify = __webpack_require__("fbUQ");

// CommonJs循环引用的问题,貌似博客写得不对
// https://www.cnblogs.com/unclekeith/archive/2017/10/17/7679503.html
var c = __webpack_require__("vAnj");

//console.log(process.env)

console.log([4]);
console.log(Object({"0":4}));
console.log(new Array('1'));
console.log({name:'B'});
console.log(Object({"name":'B'}));
console.log(true);
console.log(1);
console.log('1');
console.log('obj');
console.log({"name":"'obj'"});
console.log({"ACLOCAL_PATH":"/mingw32/share/aclocal:/usr/share/aclocal","ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\Administrator\\AppData\\Roaming","COMMONPROGRAMFILES":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"SC-201805061253","COMSPEC":"C:\\Windows\\system32\\cmd.exe","DISPLAY":"needs-to-be-defined","EXEPATH":"D:\\Program Files (x86)\\Git","HOME":"C:\\Users\\Administrator","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\Administrator","HOSTNAME":"SC-201805061253","INFOPATH":"/usr/local/info:/usr/share/info:/usr/info:/share/info:","LANG":"zh_CN.UTF-8","LOCALAPPDATA":"C:\\Users\\Administrator\\AppData\\Local","LOGONSERVER":"\\\\SC-201805061253","MANPATH":"/mingw32/share/man:/usr/local/man:/usr/share/man:/usr/man:/share/man:","MSYSTEM":"MINGW32","NODE_ENV":"production from node not from DefinePlugin","NUMBER_OF_PROCESSORS":"4","OLDPWD":"/g/zhuomian/webpack-learn2/21","OS":"Windows_NT","PATH":"C:\\Users\\Administrator\\bin;D:\\Program Files (x86)\\Git\\mingw32\\bin;D:\\Program Files (x86)\\Git\\usr\\local\\bin;D:\\Program Files (x86)\\Git\\usr\\bin;D:\\Program Files (x86)\\Git\\usr\\bin;D:\\Program Files (x86)\\Git\\mingw32\\bin;D:\\Program Files (x86)\\Git\\usr\\bin;C:\\Users\\Administrator\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0;C:\\Program Files\\nodejs;C:\\Users\\Administrator\\AppData\\Local\\Microsoft\\WindowsApps;D:\\Program Files (x86)\\Microsoft VS Code\\bin;C:\\Users\\Administrator\\AppData\\Roaming\\npm;D:\\Program Files (x86)\\Git\\usr\\bin\\vendor_perl;D:\\Program Files (x86)\\Git\\usr\\bin\\core_perl","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC","PKG_CONFIG_PATH":"/mingw32/lib/pkgconfig:/mingw32/share/pkgconfig","PLINK_PROTOCOL":"ssh","PRINTER":"","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 60 Stepping 3, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"3c03","ProgramData":"C:\\ProgramData","PROGRAMFILES":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PS1":"\\[\\033]0;$TITLEPREFIX:${PWD//[^[:ascii:]]/?}\\007\\]\\n\\[\\033[32m\\]\\u@\\h \\[\\033[35m\\]$MSYSTEM \\[\\033[33m\\]\\w\\[\\033[36m\\]`__git_ps1`\\[\\033[0m\\]\\n$ ","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","PWD":"/g/zhuomian/webpack-learn2/09-1","SESSIONNAME":"Console","SHELL":"D:\\Program Files (x86)\\Git\\usr\\bin\\bash","SHLVL":"1","SSH_ASKPASS":"/mingw32/libexec/git-core/git-gui--askpass","SYSTEMDRIVE":"C:","SYSTEMROOT":"C:\\Windows","TEMP":"C:\\Users\\Administrator\\AppData\\Local\\Temp","TERM":"xterm","TMP":"C:\\Users\\Administrator\\AppData\\Local\\Temp","TMPDIR":"C:\\Users\\Administrator\\AppData\\Local\\Temp","USERDOMAIN":"SC-201805061253","USERDOMAIN_ROAMINGPROFILE":"SC-201805061253","USERNAME":"Administrator","USERPROFILE":"C:\\Users\\Administrator","WINDIR":"C:\\Windows","_":"/usr/bin/winpty"});
console.log("G:\\zhuomian\\webpack-learn2\\09-1\\webpack.config.js");
console.log(__filename);
console.log(path);
console.log(process);

function checkClass(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

// 对有len属性的哈希表进行深度转换
// 当然为了真数组和对象也是深度拷贝的
function parseRealArray(obj) {
    var result;

    if (checkClass(obj) === 'Array') {
        result = [];
    } else if (checkClass(obj) === 'Object') {
        result = {};
    } else {
        return obj;
    }

    for (var key in obj) {
        var copy = obj[key];
        if (checkClass(copy) === 'Object' && copy.hasOwnProperty('Length')) {
            // 如果是有Length属性的哈希表,进行转换成真数组
            var arr = [];
            delete copy.Length;
            Object.keys(copy).forEach(function (item) {
                arr.push(copy[item]);
            });
            copy = arr;
            result[key] = parseRealArray(copy);
        } else if (checkClass(copy) === 'Object' || checkClass(copy) === 'Array') {
            result[key] = parseRealArray(copy);
        } else {
            result[key] = copy;
        }
    }
    return result;
}

console.log(Object({"name":"realObj","one":Object({"0":1,"Length":1}),"ones":Object({"0":"1","Length":1}),"arr":Object({"0":1,"1":2,"2":3,"Length":3}),"is":true,"a":Object({"name":"a"}),"list":Object({"0":Object({"name":"d","cityList":Object({"0":Object({"city":"beijing","countyList":Object({"0":"ddd","1":"aaa","2":"bbb","Length":3})}),"1":Object({"city":"hangzhou","countyList":Object({"0":"fff","1":"ggg","2":"ooo","3":Object({"last":"ddd"}),"Length":4})}),"Length":2})}),"Length":1}),"fn":new Function(`
        return 1
    `)}));
console.log(parseRealArray(Object({"name":"realObj","one":Object({"0":1,"Length":1}),"ones":Object({"0":"1","Length":1}),"arr":Object({"0":1,"1":2,"2":3,"Length":3}),"is":true,"a":Object({"name":"a"}),"list":Object({"0":Object({"name":"d","cityList":Object({"0":Object({"city":"beijing","countyList":Object({"0":"ddd","1":"aaa","2":"bbb","Length":3})}),"1":Object({"city":"hangzhou","countyList":Object({"0":"fff","1":"ggg","2":"ooo","3":Object({"last":"ddd"}),"Length":4})}),"Length":2})}),"Length":1}),"fn":new Function(`
        return 1
    `)})));
console.log('fn', parseRealArray(Object({"name":"realObj","one":Object({"0":1,"Length":1}),"ones":Object({"0":"1","Length":1}),"arr":Object({"0":1,"1":2,"2":3,"Length":3}),"is":true,"a":Object({"name":"a"}),"list":Object({"0":Object({"name":"d","cityList":Object({"0":Object({"city":"beijing","countyList":Object({"0":"ddd","1":"aaa","2":"bbb","Length":3})}),"1":Object({"city":"hangzhou","countyList":Object({"0":"fff","1":"ggg","2":"ooo","3":Object({"last":"ddd"}),"Length":4})}),"Length":2})}),"Length":1}),"fn":new Function(`
        return 1
    `)})).fn());

var treeObj = {
    name: 'realObj',
    one: [1],
    ones: ['1'],
    arr: [1, 2, 3],
    is: true,
    a: {
        name: "a"
    },
    list: [{
        name: "d",
        cityList: [{
            city: "beijing",
            countyList: ["ddd", "aaa", "bbb"]
        }, {
            city: "hangzhou",
            countyList: ["fff", "ggg", "ooo", { last: 'ddd' }]
        }]
    }],
    fn: checkClass
};

console.log(treeify.asTree(treeObj, true, false));

__webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("Tum/")]; ((function (subPageA) {
    console.log('加载完成subPageA.js');
    console.log(subPageA);
}).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);

console.log('pageA');
/* harmony default export */ __webpack_exports__["default"] = ('pageA');
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "src\\main.js", __webpack_require__("W2nU")))

/***/ }),

/***/ "vAnj":
/***/ (function(module, exports, __webpack_require__) {

var a = __webpack_require__("4pjk");
var b = __webpack_require__("K3Bj");

/***/ }),

/***/ "xeB+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

console.log('moduleA');

var def = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('打得动');
    }, 2000);
});

def.then(function () {
    console.log('then的回调函数执行');
});

/* unused harmony default export */ var _unused_webpack_default_export = ('moduleA');

/***/ })

},["NHnr"]);