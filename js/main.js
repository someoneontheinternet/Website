
// Test
var windowWidth;
var windowHeight;

var back;
var mid;

var navbar;
var nabbarToggle;

var scrollDelta;


$(document).ready(function () {

    $('html, body').animate({
        scrollTop: 0
    }, 1);

    windowWidth = $(window).width();
    windowHeight = $(window).height();

    console.log("Window loaded w/h is: " + windowWidth + " " + windowHeight);

    back = $('div.parallax.back');
    mid = $('div.parallax.mid');
    navbar = $('nav.navbar');
    navbarToggle = $('.navbar-collapse');
    scrollDelta = $(window).scrollTop();

    $(window).scroll(onScroll);    
    $(window).resize(windowResize);

    // init methods
    windowResize();
    
    // Hide preloader
    hideLoader();

});

function collapse() {

    console.log("collapse");

    x = $('#menu-icon');

    if (x.hasClass('glyphicon-menu-hamburger')) {
        x.removeClass('glyphicon-menu-hamburger');
        x.addClass('glyphicon-remove');
    } else {
        x.removeClass('glyphicon-remove');
        x.addClass('glyphicon-menu-hamburger');
    }

}

$('.menu-item').click(function (event) {

    var headerOffset = 75;

    event.preventDefault();

    var tag = $(this).attr('href');
    var location = $(tag).offset().top - headerOffset;
    var current = window.pageYOffset;
    var animationSpeed = Math.abs(current - location) / 2.5;

    $('html, body').animate({
        scrollTop: location
    }, animationSpeed);

    if (navbarToggle.hasClass('in')) {
        navbarToggle.removeClass('in');
        collapse();
    }

});

function parallax() {

    var position = $(window).scrollTop();

    /*

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

    */

    if (position > windowHeight) {
        if (!navbar.hasClass('navbar-fixed-top')) {
            navbar.addClass('navbar-fixed-top');
            navbar.css('position', 'fixed');
        }
    } else {
        if (navbar.hasClass('navbar-fixed-top')) {
            navbar.removeClass('navbar-fixed-top');
            navbar.css('position', 'absolute');
            navbar.css('width', '100%');
        }
    }

    if (position <= windowHeight) {

        back.css('top', position / 2 + "px");
        mid.css('top',  position / 1.9 + "px");

    }

    scrollDelta = position;
}

function onScroll() {

    // Parallax Effects
    parallax();

    // Current Pos update the navbar
    currentPosition();

}   

function windowResize() {
    
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    
    console.log("Viewport changed to: " + windowWidth + " " + windowHeight);

    // === Change Parallax to viewport width and height

    $('.parallax-wrapper').css('width', windowWidth + "px");
    $('.parallax-wrapper').css('height', windowHeight + "px");

    onScroll();
    updateLoc();
}

function hideLoader() {
    $('#loader').fadeOut(500);
    $('.section-left').delay(500).hide("slide", { direction: "left" }, 500);
    $('.section-right').delay(500).hide("slide", { direction: "right" }, 500);

    setTimeout(function () {
        $('#loader-wrapper').remove();
    }, 1500);
}

var arr = ['#link1', '#link2', '#link3', '#link4'];
var lastLocation = 0;
var locArr = [];

function updateLoc() {

    locArr = [];
    
    for (var i = 0; i < arr.length; i++) {
        var loc = $(arr[i]).offset().top;
        locArr.push(loc);
    }

    // Home include the banner as well
    locArr[0] = 0;
    locArr.push($('footer').offset().top);
}

function currentPosition() {

    var currentLocation = window.pageYOffset + 115;

    if (Math.abs(lastLocation - currentLocation) >= 10) {

        var section;

        for (var i = 0; i + 1 < locArr.length; i++) {
            if (currentLocation >= locArr[i] && currentLocation <= locArr[i + 1]) {
                section = i;
                break;
            }
        }

        var menu = $('.nav.navbar-nav').children();

        for (var i = 0; i + 1 < locArr.length; i++) {
            
            var element = $(menu[i]);

            if (i != section) {
                element.removeClass('active');

            } else {
                element.addClass('active');
            }
        }

    }

    lastLocation = currentLocation;
}