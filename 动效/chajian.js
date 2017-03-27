/**
 * Created by admin on 2016/11/5.
 */
//封装一个自定义插件 color方法  可以实现jquery对象提供的方法css()等相同的功能
;(function($){
    $.fn.
        color=function(value){
            if(value==undefined){
                return this.css("color");
            }
            else{
                this.css("color",value);
                return this;
            }
        };

})(jQuery); //这里写$也行  $=jQuery
