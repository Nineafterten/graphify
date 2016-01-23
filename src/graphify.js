
(function ( $ ) {
    
    $.fn.graphify = function(userOptions) {
        
        var me = this;
        var options = $.extend( {}, $.fn.graphify.defaults, userOptions );
        var originalId = this.selector.substring(1);

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
                            "<li><a data-graph-type='graph_deterministic'>" +
                                "<i class='fa fa-bullseye'></i> Deterministic" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_uniform'>" +
                                "<i class='fa fa-line-chart'></i> Uniform" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_normal'>" +
                                "<i class='fa fa-line-chart'></i> Normal" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_logNormal'>" +
                                "<i class='fa fa-line-chart'></i> Log Normal" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_triangular'>" +
                                "<i class='fa fa-area-chart'></i> Triangular" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_beta'>" +
                                "<i class='fa fa-line-chart'></i> Beta" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_geometric'>" +
                                "<i class='fa fa-bullseye'></i> Geometric" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_truncNormal'>" +
                                "<i class='fa fa-bar-chart'></i> Truncated Normal" +
                            "</a></li>" +
                            "<li><a data-graph-type='graph_truncLogNormal'>" +
                                "<i class='fa fa-bar-chart'></i> Truncated Log Normal" +
                            "</a></li>" +
                        "</ul>" +
                    "</div>" +
                    "<div class='graph-input single graph_deterministic'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='value'>" +
                    "</div>" +
                    "<div class='graph-input single graph_geometric hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='value'>" +
                    "</div>" +
                    "<div class='graph-input double graph_uniform hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graph-input double graph_normal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graph-input double graph_logNormal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graph-input double graph_beta hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graph-input triple graph_triangular hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='minimum'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='middle'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue3' placeholder='maximum'>" +
                    "</div>" +
                    "<div class='graph-input quadruple graph_truncNormal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='mean'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='dev'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue3' placeholder='min'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue4' placeholder='max'>" +
                    "</div>" +
                    "<div class='graph-input quadruple graph_truncLogNormal hidden'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue1' placeholder='mean'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue2' placeholder='dev'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue3' placeholder='min'>" +
                        "<input type='number' class='form-control' id='"+originalId+"_inputValue4' placeholder='max'>" +
                    "</div>" +
                "</div>"+
                "<div id='"+originalId+"_graph' class='"+options.graphClassName+" chart-hide'>" +
                    "<canvas id='"+originalId+"_canvas' width='"+options.graphWidth+"' height='"+options.graphHeight+"'></canvas>" +
                "</div>"
            );
        };
        
        // load the data and render it
        me.loadDataInGraph = function() {
            var ctx = $("#"+originalId+"_canvas").get(0).getContext("2d");
            theGraph = new Chart(ctx).Line(renderData, options.graphOptions);
        };

        // toggle graph selections and button style change
        me.toggleGraphType = function (type) {
            $(".graph-input").removeClass("visible").addClass("hidden");
            $(".graph-input." + type).removeClass("hidden").addClass("visible");
            switch(type) {
                case "graph_uniform":
                case "graph_normal":
                case "graph_logNormal":
                case "graph_beta":
                    $(".graph-toggle-indicator").removeClass().addClass("graph-toggle-indicator fa fa-line-chart");
                    break;
                case "graph_triangular":
                    $(".graph-toggle-indicator").removeClass().addClass("graph-toggle-indicator fa fa-area-chart");
                    break;
                case "graph_truncNormal":
                case "graph_truncLogNormal":
                    $(".graph-toggle-indicator").removeClass().addClass("graph-toggle-indicator fa fa-bar-chart");
                    break;
                default:
                    $(".graph-toggle-indicator").removeClass().addClass("graph-toggle-indicator fa fa-bullseye");
            }
        };
        
        // hide/show graph
        me.hideGraph = function() {
            $("#"+originalId+"_graph").removeClass("chart-show").addClass("chart-hide");
        };
        me.showGraph = function() {
            $("#"+originalId+"_graph").addClass("chart-show").removeClass("chart-hide");
        };
        
        // update graph
        me.updateDataInGraph = function(number, data) {
            // update hidden input
            options.values[number-1] = Number(data);
            $("#"+originalId+"_cargo").val(options.values);
            // update graph
            theGraph.datasets[0].points[number].value = data;
            theGraph.update();
        };

        // fusebox
        me.makeMeAChart = function() {
            me.createElementsTemplate();
            me.loadDataInGraph();
        };
        me.makeMeAChart();

        // watch for data input changes
        $("#"+originalId+"_inputValue1, #"+originalId+"_inputValue2, #"+originalId+"_inputValue3, #"+originalId+"_inputValue4")
        .on("change", function() {
            var data = $(this).val();
            var number = $(this).attr("id").slice(-1);
            if(data > -1) {
                me.updateDataInGraph(number, data);
                me.showGraph();
            }
            else {
                me.updateDataInGraph(number, data);
                me.hideGraph();
            }
        });

        // watch for graph type changes 
        $(".dropdown-menu a[data-graph-type]").on("click", function(e) {
            e.preventDefault();
            var type = $(this).attr("data-graph-type");
            me.toggleGraphType(type);
        });
    };

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