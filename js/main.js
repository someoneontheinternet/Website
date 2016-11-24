
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
    back.css('top', position / 2 + "px");
    mid.css('top',  position / 1.8 + "px");

    if (position >= windowHeight) {
        navbar.css('top', '0px');
    } else {
        navbar.css('top', windowHeight - position - (position - scrollDelta) - 5);
    }

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
