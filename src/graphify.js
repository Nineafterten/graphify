
(function ( $ ) {
    
    $.fn.graphify = function(userOptions) {
        
        var me = this;
        var options = $.extend( {}, $.fn.graphify.defaults, userOptions );
        var originalId = this.selector.substring(1);
        var thisGraph;

        var renderData = {
            labels: [0, 10, 20, 30],
            datasets: [{
                data: options.values,
                fillColor: options.fillColor,
                strokeColor: options.strokeColor,
                pointColor: options.pointColor,
                pointStrokeColor: options.pointStrokeColor,
                pointHighlightFill: options.pointHighlightFill,
                pointHighlightStroke: options.pointHighlightStroke
            }]
        };

        // the template for selection
        me.createElementsTemplate = function() {
            $(this.selector).html(
                "<input id='"+originalId+"_cargo' class='hidden'>" +
                "<div class='input-group'>" +
                    "<div class='input-group-btn graph-toggle-btn'>" +
                        "<button type='button' class='btn btn-warning dropdown-toggle' data-toggle='dropdown'>" +
                            "<i class='fa fa-bullseye graph-toggle-indicator'></i> " +
                            "<span class='caret'></span>" +
                        "</button>" +
                        "<ul class='dropdown-menu'>" +
                            "<li><a data-graph-type='deterministic'>" +
                                "<i class='fa fa-bullseye'></i> Deterministic" +
                            "</a></li>" +
                            "<li><a data-graph-type='uniform'>" +
                                "<i class='fa fa-line-chart'></i> Uniform" +
                            "</a></li>" +
                            "<li><a data-graph-type='normal'>" +
                                "<i class='fa fa-line-chart'></i> Normal" +
                            "</a></li>" +
                            "<li><a data-graph-type='logNormal'>" +
                                "<i class='fa fa-line-chart'></i> Log Normal" +
                            "</a></li>" +
                            "<li><a data-graph-type='triangular'>" +
                                "<i class='fa fa-area-chart'></i> Triangular" +
                            "</a></li>" +
                            "<li><a data-graph-type='beta'>" +
                                "<i class='fa fa-line-chart'></i> Beta" +
                            "</a></li>" +
                            "<li><a data-graph-type='geometric'>" +
                                "<i class='fa fa-bullseye'></i> Geometric" +
                            "</a></li>" +
                            "<li><a data-graph-type='truncNormal'>" +
                                "<i class='fa fa-bar-chart'></i> Truncated Normal" +
                            "</a></li>" +
                            "<li><a data-graph-type='truncLogNormal'>" +
                                "<i class='fa fa-bar-chart'></i> Truncated Log Normal" +
                            "</a></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='graphInput single deterministic'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='value'>" +
                    "</div>" +
                    "<div class='graphInput single geometric hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='value'>" +
                    "</div>" +
                    "<div class='graphInput double uniform hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graphInput double normal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graphInput double logNormal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graphInput double beta hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graphInput triple triangular hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='middle'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue3' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graphInput quadruple truncNormal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='mean'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='dev'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue3' placeholder='min'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue4' placeholder='max'>" +
                    "</div>" +
                    "<div class='graphInput quadruple truncLogNormal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='mean'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='dev'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue3' placeholder='min'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue4' placeholder='max'>" +
                    "</div>" +
                "</div>"+
                "<div id='"+originalId+"_graph' class='"+options.graphClassName+" chart-hide' style='height:"+options.graphHeight+"px'>" +
                    "<a class='hide-chart-button'><i class='fa fa-times-circle'></i></a>" +
                    "<canvas id='"+originalId+"_canvas' width='"+options.graphWidth+"' height='"+options.graphHeight+"'></canvas>" +
                "</div>"
            );
        };
        me.createElementsTemplate();

        // load the data and render it
        me.loadDataInGraph = function() {
            var ctx = $("#"+originalId+"_canvas").get(0).getContext("2d");
            thisGraph = new Chart(ctx).Line(renderData, options.graphOptions);
        };

        // toggle graph selections and button style change
        me.toggleGraphType = function (type) {
            $("#"+originalId+" .graphInput").removeClass("visible").addClass("hidden");
            $("#"+originalId+" .graphInput." + type).removeClass("hidden").addClass("visible");
            switch(type) {
                case "uniform":
                case "normal":
                case "logNormal":
                case "beta":
                    $("#"+originalId+" .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-line-chart");
                    break;
                case "triangular":
                    $("#"+originalId+" .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-area-chart");
                    break;
                case "truncNormal":
                case "truncLogNormal":
                    $("#"+originalId+" .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-bar-chart");
                    break;
                default:
                    $("#"+originalId+" .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-bullseye");
            }
        };
        
        // hide/show graph
        me.hideGraph = function() {
            $("#"+originalId+"_graph").removeClass("chart-show").addClass("chart-hide");
        };
        me.showGraph = function() {
            // close all other open graphs
            $(".chart-show").addClass("chart-hide").removeClass("chart-show");
            // show the one we care about
            $("#"+originalId+"_graph").addClass("chart-show").removeClass("chart-hide");
        };
        
        // update graph
        me.updateDataInGraph = function(id, number, data) {
            // update hidden input
            options.values[number-1] = Number(data);
            $("#"+id+"_cargo").val(options.values);
            // update graph
            thisGraph.datasets[0].points[number-1].value = data;
            thisGraph.update();
        };

        // watch for data input changes
        $("#"+originalId+"_inputValue1, #"+originalId+"_inputValue2, #"+originalId+"_inputValue3, #"+originalId+"_inputValue4")
        .on("change", function() {
            var data = $(this).val();
            var number = $(this).attr("id").slice(-1);

            me.showGraph();
            me.loadDataInGraph();

            // don't do negative numbers (but do "0" if selected)
            if(data > -1) {
                me.updateDataInGraph(originalId, number, data);
                me.showGraph();
            }
            else {
                me.updateDataInGraph(originalId, number, data);
                me.hideGraph();
            }
        });

        // watch for graph type changes 
        $("#"+originalId+" .dropdown-menu a[data-graph-type]").on("click", function(e) {
            e.preventDefault();
            var type = $(this).attr("data-graph-type");
            me.toggleGraphType(type);
        });

        // watch for closing the chart manually
        $("#"+originalId+"_graph .hide-chart-button").on("click", function(e) {
            e.preventDefault();
            me.hideGraph();
        });
    };

    // Notes for more features

    // TODO - remove extra points from single, double, and triple inputs
    // TODO - determine how to math each type of chart (log normal, geometric, etc)
    // TODO - add option to show multiple graphs at onces (default - false)

    // graphify plugin defaults
    $.fn.graphify.defaults = {
        // graph JS defaults
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        // graphify defaults
        graphClassName: "data-graph",       // custom class name (for styling)
        graphHeight: 400,                   // graph height
        graphOptions: null,                 // custom options for Chart JS 'options'
        graphWidth: 400,                    // graph width
        dataType: "deterministic",          // graph type
        graphType: "geometric",             // graph type
        values: [0, 10, 20, 30]
    };

}( jQuery ));