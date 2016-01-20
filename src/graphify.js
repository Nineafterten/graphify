(function ( $ ) {

    $.fn.graphify = function( options ) {
 
        var opts = $.extend( {}, $.fn.graphify.defaults, options );

        var createElements = function() {
            console.log(options);
        };
        createElements();
 
    };

    $.fn.graphify.defaults = {
        display: "inline",              // CSS display type
        iconClass: "fa-bullseye",       // Font-awesome class icon
        type: "deterministic",          // chart type
        values: {
            average: null,
            deviation: null,
            maximum: null,
            mean: null,
            minimum: null,
        }
    };

    $('#example').graphify();
 
}( jQuery ));