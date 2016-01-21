
(function ( $ ) {
    
    $.fn.graphify = function(options) {
        
        var opts = $.extend( {}, $.fn.graphify.defaults, options );
        var elem =  this.selector;

        console.log("opts", opts, elem);

        var createGraph = function() {
            $(elem).after(
                "<div class='data-graph well' style='position:" +opts.cssPosition+ "'>" +
                "<canvas id='dataChart' width='400' height='400'></canvas>" +
                "</div>"
            );
        };
        createGraph();
 
    };

    $.fn.graphify.defaults = {
        cssPosition: "inline",                  // CSS display type
        dataType: "deterministic",          // chart type
        graphType: "geometric",             // graph type
        values: {
            average: null,
            deviation: null,
            maximum: null,
            mean: null,
            minimum: null,
        }
    };

}( jQuery ));