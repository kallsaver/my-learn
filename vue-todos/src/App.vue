<template>
  <div id="app">
    <ul>
      <li v-for="(item,index) in todoList">
        <!--b这个类名可以在template中使用-->
        <label v-bind:class="{'b':item.done}" v-bind:s="showObj()">{{index+1}}啦啦啦{{item.value}}</label>
        <time>{{item.created | date }}</time>
      </li>
    </ul>
    <ul>
      <li v-for="(value,key) in obj">
        <!--v-bind:style="json格式"-->
        <p v-bind:style="{'color':'#fff'}">{{key}}:{{value}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment';
// 运行
import 'moment/locale/zh-cn';
moment.locale('zh-cn')

// es6属性如果是方法的简写
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title : 'vue-todos',
      todoList : [
        {
          value : 'angular',
          done : true,
          created : Date.now()
        },
        {
          value : 'react',
           done : false,
           created : Date.now()
        },
        {
          value : 'vue',
          done : true,
          created : Date.now()
        }
      ],
      obj : {
        first : 'ray',
        second : 'dpi'
      }
    }
  },
  // 自定义过滤器
  filters : {
    date(val){
      return moment(val).calendar();
    }
  },
  methods : {
  	showObj(){
  		var obj = { a : 1 };
  		var copy = Object.assign( {} , obj)
  		console.log(copy);
  	}
  }
}
// 等同于
  // export default {
  //   name : 'app',
  //   // data在vue中是挂载属性,而函数挂载在computed节点上
  //   // 并且如果data挂载的是一个函数,那么这个函数会在挂载的过程运行
  //   data : function(){
  //     console.log('运行');
  //     return {
  //       msg : 'welcome to vue'
  //     }
  //   }
  // }
// 等同于下面,然而会报错
  // export default {
  //   name : 'app',
  //   data : {
  //     msg : 'welcome '
  //   }
  // }


</script>
<style lang="less">
  // 全局less
   @import './less/common.less'; 
</style>

<style lang="less" scoped>
// 不需要在webpack.config.js中设置,只需要npm install less-loader --save-dev
  @import (reference)'./less/common.less';
  *{margin:0;padding:0;}
  li{list-style:none;margin:0;padding:0;}
  .b{color:#fff}
  #app{
    ul{
      li{
        .a;text-align: center;line-height:50px;
        height:50px;margin-bottom:20px;
      }
    }
  }
</style>
