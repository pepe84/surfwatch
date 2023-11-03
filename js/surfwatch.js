var $body = $("body");

// Weather data
var meteo = {
    "surfwatch-now": "https://portus.puertos.es/index.html#/locationsRTWidget?locationType=Playa&code={code}&theme=dark&locale=es",
    "surfwatch-future": "https://portus.puertos.es/#/locationsPredWidget?locationType=Playa&code={code}&theme=dark&locale=es"
};

var meteoLoading = false, 
    meteoReady = false;

function loadMeteo() {
    // Add preloader
    var $template = $("<img></img>", {
        src: "./img/1475_original.gif",
        class: "surfwatch-loading"
    });
    meteoLoading = true;
    // Create iframes
    var $parent = $(".surfwatch-meteo");
    var loaded = 0;
    var total = $parent.length * 2;

    $parent.each(function(){
        console.log("Loading meteo code " + this.id);
        $template.clone().appendTo(this);
        for (var m in meteo) {
            let url = meteo[m].replace("{code}", this.id);
            let $iframe = $("<iframe></iframe>", {
                src: url,
                class: m,
                scrolling: "no",
                frameborder: "0"
            });
            $iframe.bind("load", function(){
                loaded++;
                console.log("Frames loaded: " + loaded + " of " + total);
                if (loaded == total) {
                    /**
                     * Dynamic iframe resize
                     * @see https://github.com/davidjbradshaw/iframe-resizer/
                     */
                    iFrameResize({ log: true }, "iframe");
                    console.log("iFrame resizing completed")
                    $(".surfwatch-loading").remove();
                    meteoLoading = false;
                    meteoReady = true;
                }
            });
            $(this).append($iframe);
        }
    });
}

// Enable show/hide buttons
var classes = [
    "surfwatch-webcam",
    "surfwatch-now",
    "surfwatch-future"
];

for (var i in classes) {
    let className = classes[i];
    (function(className){
        let bodyClassName = "has-" + className;
        $("button#"+className).click(function(){
            // Change button status
            if (!meteoLoading) {
                let $btn = $(this);
                if ($btn.hasClass("active")) {
                    $btn.removeClass("active");
                    $body.removeClass(bodyClassName);
                } else {
                    $btn.addClass("active");
                    $body.addClass(bodyClassName);
                }
            }
            // iFrames lazy loading
            if (!meteoReady && !meteoLoading) {
                loadMeteo();
            }
        });
    })(className);
}