(function( global, factory ){
    // CommonJs
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    // AMD
    typeof define === 'function' && define.amd ? define( factory ) :
    // 直接引入
    ( global.Better = factory() );
})( this, function(){
    // 匿名函数用()包起来,这样在
    'use strict';
    var Better = {
        name: 'Better'
    }
    console.log('Better');
    return Better;
});