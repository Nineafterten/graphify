
(function ( $ ) {
    
    $.fn.graphify = function(userOptions) {
        
        var options = $.extend( {}, $.fn.graphify.defaults, userOptions );
        var elem =  this.selector;

        this.createGraph = function() {
            $(elem).val(JSON.stringify(options.values));
            $(elem).after(
                "<div class='"+options.chartClassName+" well'>" +
                "<canvas id='"+options.chartIdName+"' width='"+options.chartWidth+"' height='"+options.chartHeight+"'></canvas>" +
                "</div>"
            );
        };
        this.createGraph();
    };

    $.fn.graphify.defaults = {
        chartClassName: "data-chart",       // custom class name (for styling)
        chartHeight: 400,                   // chart height
        chartIdName: "dataChart",           // custom id name
        chartWidth: 400,                    // chart width
        dataType: "deterministic",          // chart type
        graphType: "geometric",             // graph type
        values: {                           // data to pass
            average:    null,
            deviation:  null,
            maximum:    null,
            mean:       null,
            minimum:    null,
            x:          null,
            y:          null
        }
    };

}( jQuery ));