(function ( $ ) {
    
    console.log("graphify loaded.");

    $.fn.graphify = function(options) {
        
        var opts = $.extend( {}, $.fn.graphify.defaults, options );

        console.log("opts", opts);


        var createDeterminsticElements = function() {
            console.log("createDeterminsticElements");
            // figure out element injection here first
        };

        var setType = function () {
            if(options && options.type) {
                switch(options.type) {
                    case "deterministic":
                        createDeterminsticElements();
                        break;
                    default:
                        console.log("I was passed '" + options.type + "' as a 'option.type' but I don't know what to do with that.");
                }
            }
            else {
                createDeterminsticElements();
            }
            console.log("setType");
        };
        setType();
 
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

}( jQuery ));