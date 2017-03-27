; (function ($) {
     $.fn.extend({
         color:function(value) {
             if (value == undefined) {
                 return this.css("color");
             }
             else {
                 this.css("color", value);
                 return this;
             };
         },

         backgroundColor:function(value) {
             if (value == undefined) {
                 return this.css("backgoundColor");
             }
             else {
                 this.css("backgroundColor", value);
                 return this;
             };

         }
    });
 })($);
