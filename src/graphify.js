
(function ( $ ) {
  
    $.fn.graphify = function(userOptions) {
        
        var me = this;
        var options = $.extend( {}, $.fn.graphify.defaults, userOptions );
        var originalId = this.selector.substring(1);
        var thisGraph;

        var renderData = {
            labels: options.labels,
            datasets: [{
                bezierCurve: options.bezierCurve,
                data: options.values,
                datasetFill: options.datasetFill,
                fillColor: options.fillColor,
                strokeColor: options.strokeColor,
                pointColor: options.pointColor,
                pointDot: options.pointDot,
                pointHighlightFill: options.pointHighlightFill,
                pointHighlightStroke: options.pointHighlightStroke,
                pointStrokeColor: options.pointStrokeColor
            }]
        };

        // the template for selection
        me.createElementsTemplate = function() {
            $(this.selector)
            .addClass('hidden')
            .after(
                "<div id='"+originalId+"_selector' class='input-group'>" +
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

        me.chooseGraphType = function (data, inputNumber) {
            switch(options.graphType) {
                case "uniform":
                    me.graph_uniform(data, inputNumber);
                    break;
                case "normal":
                    me.graph_normal(data, inputNumber);
                    break;
                case "logNormal":
                    me.graph_logNormal(data, inputNumber);
                    break;
                case "beta":
                    me.graph_beta(data, inputNumber);
                    break;
                case "geometric":
                    me.graph_geometric(data, inputNumber);
                    break;
                case "triangular":
                    graph_triangular(data, inputNumber);
                    break;
                case "truncNormal":
                    me.graph_truncNormal(data, inputNumber);
                    break;
                case "truncLogNormal":
                    me.graph_trucLogNormal(data, inputNumber);
                    break;
                default:
                    me.graph_deterministic(data, inputNumber);
            }
        };

        me.graph_logNormal = function (value, position) {
            // temp inputs
            var min = value || 1;
            var max = 10;
            // reset data and labels
            renderData.labels = [];
            renderData.datasets[0].data = [];

            for (var i= min; i <= max; i++) {
                // Add data points and labels
                renderData.datasets[0].data.push(Math.log(i));
                renderData.labels.push(i);
            }
            me.storeCargoData(renderData.datasets[0].data);
            return renderData.datasets;
        };
        me.graph_uniform = function (value, position) {
            console.log("graph_uniform", value, position);
        };
        me.graph_normal = function (value, position) {
            console.log("graph_normal", value, position);
        };
        me.graph_beta = function (value, position) {
            console.log("graph_beta", value, position);
        };
        me.graph_triangular = function (value, position) {
            console.log("graph_triangular", value, position);
        };
        me.graph_geometric = function (value, position) {
            console.log("graph_geometric", value, position);
        };
        me.graph_truncNormal = function (value, position) {
            console.log("graph_truncNormal", value, position);
        };
        me.graph_trucLogNormal = function (value, position) {
            console.log("graph_trucLogNormal", value, position);
        };
        me.graph_deterministic = function (value, position) {
            console.log("graph_deterministic", value, position);
        };
        // load the data and render it
        me.loadDataInGraph = function() {
            var ctx = $("#"+originalId+"_canvas").get(0).getContext("2d");
            thisGraph = new Chart(ctx).Line(renderData, options.graphOptions);
        };

        // update hidden input (data for server)
        me.storeCargoData = function (newData) {
            // update instance data
            options.values = newData;
            // update hidden input
            $("#"+originalId).val(options.values);
        };

        // toggle graph selections and button style change
        me.toggleGraphType = function (type) {
            $("#"+originalId+"_selector .graphInput").removeClass("visible").addClass("hidden");
            $("#"+originalId+"_selector .graphInput." + type).removeClass("hidden").addClass("visible");
            switch(type) {
                case "uniform":
                case "normal":
                case "logNormal":
                case "beta":
                    options.graphType = type;
                    $("#"+originalId+"_selector .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-line-chart");
                    break;
                case "triangular":
                    options.graphType = type;
                    $("#"+originalId+"_selector .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-area-chart");
                    break;
                case "truncNormal":
                case "truncLogNormal":
                    options.graphType = type;
                    $("#"+originalId+"_selector .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-bar-chart");
                    break;
                default:
                    options.graphType = type;
                    $("#"+originalId+"_selector .graph-toggle-indicator")
                    .removeClass()
                    .addClass("graph-toggle-indicator fa fa-bullseye");
            }
        };
        
        // hide/show graph
        me.hideGraph = function() {
            $("#"+originalId+"_graph").removeClass("chart-show").addClass("chart-hide");
        };
        me.showGraph = function() {
            if(options.showMultipleGraphs === false) {
                // close all other open graphs
                $(".chart-show").addClass("chart-hide").removeClass("chart-show");
            }
            // show the one we care about
            $("#"+originalId+"_graph").addClass("chart-show").removeClass("chart-hide");
        };

        // watch for data input changes
        $("#"+originalId+"_inputValue1, #"+originalId+"_inputValue2, #"+originalId+"_inputValue3, #"+originalId+"_inputValue4")
        .on("keyup", function() {
            var data = Number($(this).val());
            var inputNumber = Number($(this).attr("id").slice(-1));

            me.showGraph();
            me.chooseGraphType(data, inputNumber);
            me.loadDataInGraph();
            // don't do negative numbers (but do "0" if selected)
            if(data < 0) {
                me.hideGraph();
            }
        });

        // watch for graph type changes 
        $("#"+originalId+"_selector .dropdown-menu a[data-graph-type]").on("click", function(e) {
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

    // graphify plugin defaults
    $.fn.graphify.defaults = {
        // Chart JS defaults
        bezierCurve: true,
        pointDot: false,
        datasetFill: false,
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        // graphify defaults
        dataType: "deterministic",          // data type
        showMultipleGraphs: false,          // show multiple graphs on the page at the same time
        graphClassName: "data-graph",       // custom class name (for styling)
        graphHeight: 250,                   // graph height
        graphOptions: null,                 // custom options for Chart JS 'options'
        graphWidth: 250,                    // graph width
        graphType: "geometric",             // graph type
        values: [],
        labels: []
    };

}( jQuery ));