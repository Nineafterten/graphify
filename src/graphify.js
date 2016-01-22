
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

        this.loadDataInGraph = function() {

            var labelX = options.values.x;

            var tempData = {
                labels: [0, 5, 10],
                datasets: [{
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [20, 40, 50]
                }]
            };
            var ctx = $("#" + options.chartIdName).get(0).getContext("2d");

            var myNewChart = new Chart(ctx).Line(tempData, null);
            console.log(myNewChart);
        };
        this.loadDataInGraph();
    };

    $.fn.graphify.defaults = {
        chartClassName: "data-chart",       // custom class name (for styling)
        chartHeight: 400,                   // chart height
        chartIdName: "dataChart",           // custom id name
        chartWidth: 400,                    // chart width
        dataType: "deterministic",          // chart type
        graphType: "geometric",             // graph type
        values: {                           // data to pass
            x: null,
            y: null
        }
    };

}( jQuery ));