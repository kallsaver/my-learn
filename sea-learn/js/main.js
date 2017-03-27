//define全局函数有三个参数,前两个参数是模块名称和依赖的模块,但是不推荐使用
//依赖模块可以使用匿名函数中的require得到  这里和require是有区别的
//匿名函数有三个参数require,exports,modules,用前两个足够了
define(function(require,exports){
	console.log("main.js运行");
	//路径又变成main.js的了,不能使用var b = require('b')
	var b = require('./lib/b.js');
	console.log(b)
	exports.name = 'main'
})






