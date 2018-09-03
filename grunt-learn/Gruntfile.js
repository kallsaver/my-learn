//这个目录是要放在根目录下的 ,src目录和package.json也是放在目录下
module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),	//从package.json文件中读取package.json对象的name
        concat : {		//合并功能
            c : {		//c的名字随便给  它是concat对象的一个key名  可以有多个key 比如合并js用一个key  打包css用一个key
                src: ['src/js/a.js', 'src/js/b.js'],		//合并src/js目录下的a.js和b.js文件
                dest: 'dest/asjs/c.js'					//合并后放在新生成的dest/asjs文件夹中的c.js中
            },
            d :{		//同理d只是个key名
                src: ['src/css/*.css'],				//合并src/css目录下的所有.css文件
                dest: 'dest/ascss/all.css'			//合并后放在新生成的dest/ascss文件夹中的all.css中
            }
        },
        uglify : {		//js压缩功能		这里是先合并再压缩了
            options : {	//写一些选项 比如在开头写一行压缩的日期  或者把开发时的注释去掉之类的
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                removeComments: true		//把把开发时的注释去掉
            },
            build : {
                src : 'dest/asjs/c.js',					//要压缩的js文件
                dest : 'dest/asjs/c.min.js'				//压缩后放置的目录
            }
        },
        cssmin: {
        	options : {	
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                removeComments: true	
            },
            f: {	//同理f只是个cssmin对象中的一个key名
                src: 'dest/ascss/all.css',				//要压缩的css文件
                dest: 'dest/ascss/all-min.css'			//压缩后放置的目录
            }
        },
        htmlmin:{		//压缩html一般不需要,可以不写这项
        	dist:{
        		options : {	
                	removeComments: true,				//把注释去掉
                	collapseWhitespace: true			//把空格去掉
            	},
        		files:{
        			'dest/indexmin.html':'src/index.html'	//"生成文件":"源文件"
        			//在github上看的配置方法
        			//https://github.com/gruntjs/grunt-contrib-htmlmin
        		}
        	}
        }
    });
    // 载入concat和uglify和cssmin插件名
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // 注册任务和任务名
    grunt.registerTask('default', ['concat', 'uglify','cssmin','htmlmin']);
};

//grunt还有清除源文件,copy源文件到一个目录,压缩图片等功能:
//http://www.cnblogs.com/hubcarl/p/4095122.html
//http://www.cnblogs.com/wangfupeng1988/p/4561993.html