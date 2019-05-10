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

console.log('A', [4]);
console.log(Object({"0":4}));
console.log(new Array('1'));
console.log({name:'B'}, 'B');
console.log('B1', Object({"name":'B'}));
console.log(true);
console.log(1);
console.log('1');
console.log('obj');
console.log({"name":"'obj'"});
console.log({"ACLOCAL_PATH":"D:\\Program Files\\Git\\mingw64\\share\\aclocal;D:\\Program Files\\Git\\usr\\share\\aclocal","ALLUSERSPROFILE":"C:\\ProgramData","APPDATA":"C:\\Users\\zuoyao.chen\\AppData\\Roaming","COMMONPROGRAMFILES":"C:\\Program Files\\Common Files","CommonProgramFiles(x86)":"C:\\Program Files (x86)\\Common Files","CommonProgramW6432":"C:\\Program Files\\Common Files","COMPUTERNAME":"ZUOYAO-CHEN","COMSPEC":"C:\\Windows\\system32\\cmd.exe","CONFIG_SITE":"D:/Program Files/Git/mingw64/etc/config.site","DEVMGR_SHOW_DETAILS":"1","DISPLAY":"needs-to-be-defined","EXEPATH":"D:\\Program Files\\Git","GOPATH":"C:\\Users\\zuoyao.chen\\go","GOROOT":"C:\\Go\\","HOME":"C:\\Users\\zuoyao.chen","HOMEDRIVE":"C:","HOMEPATH":"\\Users\\zuoyao.chen","HOSTNAME":"zuoyao-chen","INFOPATH":"D:\\Program Files\\Git\\usr\\local\\info;D:\\Program Files\\Git\\usr\\share\\info;D:\\Program Files\\Git\\usr\\info;D:\\Program Files\\Git\\share\\info","LANG":"zh_CN.UTF-8","LOCALAPPDATA":"C:\\Users\\zuoyao.chen\\AppData\\Local","LOGONSERVER":"\\\\TCLKING-SZDC0","MANPATH":"D:\\Program Files\\Git\\mingw64\\share\\man;D:\\Program Files\\Git\\usr\\local\\man;D:\\Program Files\\Git\\usr\\share\\man;D:\\Program Files\\Git\\usr\\man;D:\\Program Files\\Git\\share\\man","MINGW_CHOST":"x86_64-w64-mingw32","MINGW_PACKAGE_PREFIX":"mingw-w64-x86_64","MINGW_PREFIX":"D:/Program Files/Git/mingw64","MSYSTEM":"MINGW64","MSYSTEM_CARCH":"x86_64","MSYSTEM_CHOST":"x86_64-w64-mingw32","MSYSTEM_PREFIX":"D:/Program Files/Git/mingw64","NODE":"C:\\dev\\nvm\\v7.9.0\\node.exe","NODE_ENV":"production from node not from DefinePlugin","NODE_PATH":"C:\\dev\\nvm\\v7.9.0","npm_config_access":"","npm_config_also":"","npm_config_always_auth":"","npm_config_argv":"{\"remain\":[],\"cooked\":[\"run\",\"build\"],\"original\":[\"run\",\"build\"]}","npm_config_bin_links":"true","npm_config_browser":"","npm_config_ca":"","npm_config_cache":"C:\\Users\\zuoyao.chen\\AppData\\Roaming\\npm-cache","npm_config_cache_lock_retries":"10","npm_config_cache_lock_stale":"60000","npm_config_cache_lock_wait":"10000","npm_config_cache_max":"Infinity","npm_config_cache_min":"10","npm_config_cafile":"","npm_config_cert":"","npm_config_color":"true","npm_config_depth":"Infinity","npm_config_description":"true","npm_config_dev":"","npm_config_dry_run":"","npm_config_editor":"notepad.exe","npm_config_engine_strict":"","npm_config_fetch_retries":"2","npm_config_fetch_retry_factor":"10","npm_config_fetch_retry_maxtimeout":"60000","npm_config_fetch_retry_mintimeout":"10000","npm_config_force":"","npm_config_git":"git","npm_config_git_tag_version":"true","npm_config_global":"","npm_config_globalconfig":"C:\\dev\\nvm\\v7.9.0\\etc\\npmrc","npm_config_globalignorefile":"C:\\dev\\nvm\\v7.9.0\\etc\\npmignore","npm_config_global_style":"","npm_config_group":"","npm_config_heading":"npm","npm_config_https_proxy":"","npm_config_if_present":"","npm_config_ignore_scripts":"","npm_config_init_author_email":"","npm_config_init_author_name":"","npm_config_init_author_url":"","npm_config_init_license":"ISC","npm_config_init_module":"C:\\Users\\zuoyao.chen\\.npm-init.js","npm_config_init_version":"1.0.0","npm_config_json":"","npm_config_key":"","npm_config_legacy_bundling":"","npm_config_link":"","npm_config_local_address":"","npm_config_loglevel":"warn","npm_config_logs_max":"10","npm_config_long":"","npm_config_maxsockets":"50","npm_config_message":"%s","npm_config_metrics_registry":"https://registry.npmjs.org/","npm_config_node_version":"7.9.0","npm_config_onload_script":"","npm_config_only":"","npm_config_optional":"true","npm_config_parseable":"","npm_config_prefix":"C:\\dev\\nvm\\v7.9.0","npm_config_production":"","npm_config_progress":"true","npm_config_proprietary_attribs":"true","npm_config_proxy":"","npm_config_rebuild_bundle":"true","npm_config_registry":"https://registry.npmjs.org/","npm_config_rollback":"true","npm_config_sass_binary_site":"https://npm.taobao.org/mirrors/node-sass/","npm_config_save":"","npm_config_save_bundle":"","npm_config_save_dev":"","npm_config_save_exact":"","npm_config_save_optional":"","npm_config_save_prefix":"^","npm_config_scope":"","npm_config_scripts_prepend_node_path":"warn-only","npm_config_searchexclude":"","npm_config_searchlimit":"20","npm_config_searchopts":"","npm_config_searchstaleness":"900","npm_config_send_metrics":"","npm_config_shell":"C:\\Windows\\system32\\cmd.exe","npm_config_shrinkwrap":"true","npm_config_sign_git_tag":"","npm_config_strict_ssl":"true","npm_config_tag":"latest","npm_config_tag_version_prefix":"v","npm_config_tmp":"C:\\Users\\ZUOYAO~1.CHE\\AppData\\Local\\Temp","npm_config_umask":"0000","npm_config_unicode":"","npm_config_unsafe_perm":"true","npm_config_usage":"","npm_config_user":"","npm_config_userconfig":"C:\\Users\\zuoyao.chen\\.npmrc","npm_config_user_agent":"npm/4.2.0 node/v7.9.0 win32 x64","npm_config_version":"","npm_config_versions":"","npm_config_viewer":"browser","npm_execpath":"C:\\dev\\nvm\\v7.9.0\\node_modules\\npm\\bin\\npm-cli.js","npm_lifecycle_event":"build","npm_lifecycle_script":"cross-env PLATFORM=tlink webpack","npm_node_execpath":"C:\\dev\\nvm\\v7.9.0\\node.exe","npm_package_author":"","npm_package_dependencies_babel_polyfill":"^6.26.0","npm_package_dependencies_jquery":"^3.3.1","npm_package_dependencies_lodash":"^4.17.5","npm_package_description":"","npm_package_devDependencies_babel_core":"^6.22.1","npm_package_devDependencies_babel_loader":"^7.1.1","npm_package_devDependencies_babel_preset_env":"^1.3.2","npm_package_devDependencies_babel_preset_stage_2":"^6.22.0","npm_package_devDependencies_chalk":"^2.4.1","npm_package_devDependencies_consola":"^1.3.0","npm_package_devDependencies_cross_env":"^5.2.0","npm_package_devDependencies_html_webpack_plugin":"^3.2.0","npm_package_devDependencies_rimraf":"^2.6.2","npm_package_devDependencies_rimraf_promise":"^2.0.0","npm_package_devDependencies_treeify":"^1.1.0","npm_package_devDependencies_webpack":"^3.10.0","npm_package_license":"ISC","npm_package_main":"index.js","npm_package_name":"08","npm_package_scripts_build":"cross-env PLATFORM=tlink webpack","npm_package_scripts_test":"echo \"Error: no test specified\" && exit 1","npm_package_version":"1.0.0","NUMBER_OF_PROCESSORS":"8","NVM_HOME":"C:\\dev\\nvm","NVM_SYMLINK":"C:\\dev\\nodejs","OneDrive":"C:\\Users\\zuoyao.chen\\OneDrive","OneDriveConsumer":"C:\\Users\\zuoyao.chen\\OneDrive","ORIGINAL_PATH":"D:\\Program Files\\Git\\mingw64\\bin;D:\\Program Files\\Git\\usr\\bin;C:\\Users\\zuoyao.chen\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0;C:\\Program Files (x86)\\Microsoft VS Code\\bin;%NVM_HOME%;D:\\Program Files\\Git\\cmd;C:\\Go\\bin;D:\\Program Files\\putty;C:\\dev\\nvm;C:\\dev\\nvm\\v7.9.0;C:\\dev\\nodejs;C:\\Users\\zuoyao.chen\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\zuoyao.chen\\go\\bin","ORIGINAL_TEMP":"C:/Users/ZUOYAO~1.CHE/AppData/Local/Temp","ORIGINAL_TMP":"C:/Users/ZUOYAO~1.CHE/AppData/Local/Temp","OS":"Windows_NT","PATH":"C:\\dev\\nvm\\v7.9.0\\node_modules\\npm\\bin\\node-gyp-bin;D:\\kallsave\\my-learn\\webpack-learn2\\09-1\\node_modules\\.bin;C:\\Users\\zuoyao.chen\\bin;D:\\Program Files\\Git\\mingw64\\bin;D:\\Program Files\\Git\\usr\\local\\bin;D:\\Program Files\\Git\\usr\\bin;D:\\Program Files\\Git\\usr\\bin;D:\\Program Files\\Git\\mingw64\\bin;D:\\Program Files\\Git\\usr\\bin;C:\\Users\\zuoyao.chen\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0;C:\\Program Files (x86)\\Microsoft VS Code\\bin;%NVM_HOME%;D:\\Program Files\\Git\\cmd;C:\\Go\\bin;D:\\Program Files\\putty;C:\\dev\\nvm;C:\\dev\\nvm\\v7.9.0;C:\\dev\\nodejs;C:\\Users\\zuoyao.chen\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\zuoyao.chen\\go\\bin;D:\\Program Files\\Git\\usr\\bin\\vendor_perl;D:\\Program Files\\Git\\usr\\bin\\core_perl","PATHEXT":".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JSE;.WSF;.WSH;.MSC","PKG_CONFIG_PATH":"D:\\Program Files\\Git\\mingw64\\lib\\pkgconfig;D:\\Program Files\\Git\\mingw64\\share\\pkgconfig","PLATFORM":"tlink","PLINK_PROTOCOL":"ssh","PRINTER":"\\\\10.120.99.9\\F5-3F-AQ-BlackPri","PROCESSOR_ARCHITECTURE":"AMD64","PROCESSOR_IDENTIFIER":"Intel64 Family 6 Model 94 Stepping 3, GenuineIntel","PROCESSOR_LEVEL":"6","PROCESSOR_REVISION":"5e03","ProgramData":"C:\\ProgramData","PROGRAMFILES":"C:\\Program Files","ProgramFiles(x86)":"C:\\Program Files (x86)","ProgramW6432":"C:\\Program Files","PROMPT":"$P$G","PSModulePath":"C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules","PUBLIC":"C:\\Users\\Public","PWD":"D:/kallsave/my-learn/webpack-learn2/09-1","SESSIONNAME":"Console","SHELL":"D:\\Program Files\\Git\\usr\\bin\\bash.exe","SHLVL":"2","SSH_ASKPASS":"D:/Program Files/Git/mingw64/libexec/git-core/git-gui--askpass","SYSTEMDRIVE":"C:","SYSTEMROOT":"C:\\Windows","TEMP":"C:\\Users\\ZUOYAO~1.CHE\\AppData\\Local\\Temp","TERM":"xterm","TMP":"C:\\Users\\ZUOYAO~1.CHE\\AppData\\Local\\Temp","TMPDIR":"C:\\Users\\ZUOYAO~1.CHE\\AppData\\Local\\Temp","USERDNSDOMAIN":"TCLKING.COM","USERDOMAIN":"TCLKING","USERDOMAIN_ROAMINGPROFILE":"TCLKING","USERNAME":"zuoyao.chen","USERPROFILE":"C:\\Users\\zuoyao.chen","WINDIR":"C:\\Windows","_":"C:/dev/nvm/v7.9.0/node.exe"});
console.log("D:\\kallsave\\my-learn\\webpack-learn2\\09-1\\webpack.config.js");
console.log('I', 'tlink');
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
    `),"checkClass":new Function(`o`,`
    return Object.prototype.toString.call(o).slice(8,-1)
`)}));
console.log(parseRealArray(Object({"name":"realObj","one":Object({"0":1,"Length":1}),"ones":Object({"0":"1","Length":1}),"arr":Object({"0":1,"1":2,"2":3,"Length":3}),"is":true,"a":Object({"name":"a"}),"list":Object({"0":Object({"name":"d","cityList":Object({"0":Object({"city":"beijing","countyList":Object({"0":"ddd","1":"aaa","2":"bbb","Length":3})}),"1":Object({"city":"hangzhou","countyList":Object({"0":"fff","1":"ggg","2":"ooo","3":Object({"last":"ddd"}),"Length":4})}),"Length":2})}),"Length":1}),"fn":new Function(`
        return 1
    `),"checkClass":new Function(`o`,`
    return Object.prototype.toString.call(o).slice(8,-1)
`)})));
console.log('fn', parseRealArray(Object({"name":"realObj","one":Object({"0":1,"Length":1}),"ones":Object({"0":"1","Length":1}),"arr":Object({"0":1,"1":2,"2":3,"Length":3}),"is":true,"a":Object({"name":"a"}),"list":Object({"0":Object({"name":"d","cityList":Object({"0":Object({"city":"beijing","countyList":Object({"0":"ddd","1":"aaa","2":"bbb","Length":3})}),"1":Object({"city":"hangzhou","countyList":Object({"0":"fff","1":"ggg","2":"ooo","3":Object({"last":"ddd"}),"Length":4})}),"Length":2})}),"Length":1}),"fn":new Function(`
        return 1
    `),"checkClass":new Function(`o`,`
    return Object.prototype.toString.call(o).slice(8,-1)
`)})).fn());

console.log('checkClass', parseRealArray(Object({"name":"realObj","one":Object({"0":1,"Length":1}),"ones":Object({"0":"1","Length":1}),"arr":Object({"0":1,"1":2,"2":3,"Length":3}),"is":true,"a":Object({"name":"a"}),"list":Object({"0":Object({"name":"d","cityList":Object({"0":Object({"city":"beijing","countyList":Object({"0":"ddd","1":"aaa","2":"bbb","Length":3})}),"1":Object({"city":"hangzhou","countyList":Object({"0":"fff","1":"ggg","2":"ooo","3":Object({"last":"ddd"}),"Length":4})}),"Length":2})}),"Length":1}),"fn":new Function(`
        return 1
    `),"checkClass":new Function(`o`,`
    return Object.prototype.toString.call(o).slice(8,-1)
`)})).checkClass([]));

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