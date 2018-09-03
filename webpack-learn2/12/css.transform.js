module.exports = function (css) {
    console.log(css);
    console.log(typeof css);
    console.log(window.innerWidth);
    // if ( window.innerWidth >= 768 ){
    //     return css.replace('peru','red');
    // }else{
    //     return css.replace('peru','gold');
    // }
    return css;
}