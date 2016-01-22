
(function ( $ ) {
    
    $.fn.graphify = function(userOptions) {
        
        var options = $.extend( {}, $.fn.graphify.defaults, userOptions );
        var elem =  this.selector;

        // create the elements
        this.createGraph = function() {
            $(elem).val(JSON.stringify(options.values));
            $(elem).after(
                "<div class='"+options.chartClassName+" well'>" +
                "<canvas id='"+options.chartIdName+"' width='"+options.chartWidth+"' height='"+options.chartHeight+"'></canvas>" +
                "</div>"
            );
        };

        // load the data and render it
        this.loadDataInGraph = function() {
            var renderData = {
                labels: options.values.x,
                datasets: [{
                    data: options.values.y,
                    fillColor: options.fillColor,
                    strokeColor: options.strokeColor,
                    pointColor: options.pointColor,
                    pointStrokeColor: options.pointStrokeColor,
                    pointHighlightFill: options.pointHighlightFill,
                    pointHighlightStroke: options.pointHighlightStroke,
                }]
            };

            var ctx = $("#" + options.chartIdName).get(0).getContext("2d");
            new Chart(ctx).Line(renderData, options.chartOptions);
        };

        // fusebox
        this.makeMeAChart = function() {
            this.createGraph();
            this.loadDataInGraph();
        };
        this.makeMeAChart();

        // watcher
        $(elem).on('change', function(e) {
            alert('dont touch that yet!');
        });
    };

    $.fn.graphify.defaults = {

        // chart JS defaults
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",

        // graphify defaults
        chartClassName: "data-chart",       // custom class name (for styling)
        chartHeight: 400,                   // chart height
        chartIdName: "dataChart",           // custom id name
        chartOptions: null,                 // custom options for Chart JS 'options'
        chartWidth: 400,                    // chart width
        dataType: "deterministic",          // chart type
        graphType: "geometric",             // graph type
        values: {                           // data to pass
            x: null,
            y: null
        }
    };

}( jQuery ));