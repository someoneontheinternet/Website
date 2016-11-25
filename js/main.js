
// Test
var windowWidth;
var windowHeight;

var back;
var mid;

var navbar;
var scrollDelta;

$(document).ready(function () {

    windowResize();

    $('html, body').animate({
        scrollTop: 0
    }, 1);

    windowWidth = $(window).width();
    windowHeight = $(window).height();

    console.log("Window loaded w/h is: " + windowWidth + " " + windowHeight);

    $(window).resize(windowResize);
    $(window).scroll(onScroll);    

    back = $('div.parallax.back');
    mid = $('div.parallax.mid');
    navbar = $('nav.navbar');
    scrollDelta = $(window).scrollTop();

    onScroll();
    
    hideLoader();

});

function onScroll() {
    
    var position = $(window).scrollTop();

    if (position < windowHeight) {

        var delta = position - scrollDelta;

        if (delta > 0) {
            navbar.css('top', windowHeight - position - (delta * 1.2));
        } else {
            navbar.css('top', windowHeight - position - (delta * -1.3));
        }

    } else {
        navbar.css('top', 0);
    }

    back.css('top', position / 2 + "px");
    mid.css('top',  position / 1.8 + "px");

    scrollDelta = position;
}

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
