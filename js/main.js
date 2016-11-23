
// Test
var windowWidth;
var windowHeight;

$(document).ready(function () {

    windowResize();

    $('html, body').animate({
        scrollTop: 0
    }, 1);

    hideLoader();

    windowWidth = $(window).width();
    windowHeight = $(window).height();

    console.log("Window loaded w/h is: " + windowWidth + " " + windowHeight);

    $(window).resize(windowResize);

});

function windowResize() {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    
    // === Change Parallax to viewport width and height

    $('.parallax-wrapper').css('width', windowWidth + "px");
    $('.parallax-wrapper').css('height', windowHeight + "px");
       
}

function hideLoader() {
    $('#loader').fadeOut(500);
    $('.section-left').delay(500).hide("slide", { direction: "left" }, 500);
    $('.section-right').delay(500).hide("slide", { direction: "right" }, 500);

    setTimeout(function () {
        $('#loader-wrapper').remove();
    }, 1500);
}