// Weather data
var meteo = {
    "surfwatch-now": "https://portus.puertos.es/Portus_RT/portusgwt/infoubicaciones/widgetRT.jsp?locale=es&location=beach&code={code}",
    "surfwatch-future": "https://portus.puertos.es/Portus_RT/portusgwt/infoubicaciones/widgetFC.jsp?locale=es&location=beach&code={code}"
};

$(document).ready(function () {
    // Create iframes
    var $parent = $(".surfwatch-meteo");
    var loaded = 0;
    var total = $parent.length * 2;

    $parent.each(function(){
        console.log("Loading meteo code " + this.id);
        for (var m in meteo) {
            let url = meteo[m].replace("{code}", this.id);
            let $iframe = $('<iframe></iframe>', {
                src: url,
                class: m,
                scrolling: "no",
                frameborder: "0"
            });
            $iframe.bind("load", function(){
                $iframe.hide();
                loaded++;
                console.log("Frames loaded: " + loaded + " of " + total);
                if (loaded == total) {
                    // Enable show/hide buttons
                    var classes = [
                        "surfwatch-webcam",
                        "surfwatch-now",
                        "surfwatch-future"
                    ];
                    for (var i in classes) {
                        let className = classes[i];
                        (function(className){
                            let selector = "." + className;
                            $("button#"+className).click(function(){
                                let $btn = $(this);
                                if ($btn.hasClass("active")) {
                                    $(selector).hide();
                                    $btn.removeClass("active");
                                } else {
                                    $(selector).show();
                                    $btn.addClass("active");
                                }
                            });
                        })(className);
                    }
                }
            });
            $(this).append($iframe);
        }
    });
});