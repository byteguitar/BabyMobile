//carousel
var distanceToMove;
var touchStartPos;
var divLeftOffset;
var startDate;
var endDate;
var timer;
var deviceWidth;
var arrayLength;
var t;
var swipeDirection = 'right';
var lastDistance = 0;
var autoTracks = 0;
var body;
var carouselTimeout;
var currentItem = 1;
var isClick;
var firstLoad = true;
var bannerName;

var orientationEvent = "resize";
window.addEventListener(orientationEvent, onResize);

body = $('body');
initializeVariables();
onResize();
TimedCount();

function initializeVariables() {
    arrayLength = $("#PaginationBar").find(".pagination-dot").length;
    carouselTimeout = 5000;
    bannerName = getBannerName();

}

function getBannerName() {
    _hostNames = ['safeway', 'dominicks', 'pavilions', 'randalls', 'tomthumb', 'genuardis', 'vons', 'carrsqc'];
    var host = window.location.host.toLowerCase();
    var bannerName = '';
    for (var i = 0; i < _hostNames.length; i++) {
        if (host.contains(_hostNames[i])) {
            bannerName = _hostNames[i];
            break;
        }
    }
    return bannerName ? bannerName : _hostNames[0];
}

function TimedCount() {
    if (autoTracks < 100) {
        var eventName = bannerName + ' - Scroll';
        _gaq.push(['_trackEvent', 'Carousel', eventName, 'Auto', null, true]);
        autoTracks++;
    }
    if (!firstLoad) {
        currentItem++;
    }
    firstLoad = false;

    if (currentItem < (arrayLength + 1) && currentItem > 1) {
        var move = -(body.width() * currentItem);
        Animate('#CarouselItemContainer', move, false, false);
    }
    if (currentItem == arrayLength + 1) {
        currentItem = 1;
        Animate('#CarouselItemContainer', -currentItem * body.width(), false, false);
    }

    t = setTimeout("TimedCount();", carouselTimeout);
}

function PaginationHelper(currentOffset) {
    for (var i = 1; i <= arrayLength; i++) {
        $('#page_' + i).add().css('background-position', '-14px');
    }
    var pageNumber = (Math.abs(currentOffset / body.width()) % (arrayLength + 2));
    $('#page_' + pageNumber).add().css('background-position', '0px');
}

function StopTimer() {
    clearTimeout(t);
}

function StartTimer() {
    t = setTimeout("TimedCount();", carouselTimeout);
}

function Animate(div, currentOffSet, trackManual, targetName) {
    if (trackManual) {
        var eventName = targetName ? bannerName + ' - Scroll ' + targetName : bannerName + ' - Scroll';
        _gaq.push(['_trackEvent', 'Carousel', eventName, 'Manual']);
    }
    //Add the CSS3 transition class for smooth moving
    $('#curoff').text(currentOffSet);
    $(div).addClass('transition');
    $(div).add().css('left', currentOffSet + 'px');

    if (lastDistance != currentOffSet) {
        PaginationHelper(currentOffSet);
    }

    lastDistance = currentOffSet;
    currentItem = Math.abs(currentOffSet / $('body').width());
}

function timer() {
}

function onRedirect(e) {
    var eventName = bannerName + ' - Click ' + $(e.target).attr('alt');
    _gaq.push(['_trackEvent', 'Carousel', eventName, 'Manual']);
    setTimeout(timer, 1000);
    window.location = $(e.target).parent().find('a').attr('href');
}

function touchStart(e, div) {
    StopTimer();
    isClick = true;
    $(div).removeClass('transition');

    startDate = new Date();

    var targetEvent = e.touches.item(0);
    divLeftOffset = div.offsetLeft;

    touchStartPos = targetEvent.clientX;
    $('#startPos').text(touchStartPos);
    $('#leftOffset').text(divLeftOffset);

    firstTouch = true;
    return false;
}

function touchend(e, div) {
    var targetName = $(e.target).attr('alt');
    endDate = new Date();
    var swipeTime = endDate.getTime() - startDate.getTime();
    var vectorDistance = distanceToMove;
    if (distanceToMove < 1) {
        distanceToMove = distanceToMove * -1;
    }
    if (isClick) {
        onRedirect(e);
    }
    StartTimer();
    if (arrayLength > 1) {
        var speed = vectorDistance / swipeTime;
        var leftOffset = div.offsetLeft + body.width();
        if (speed < -.25 && leftOffset > (-1 * body.width())) {
            return Animate(div, -2 * body.width(), true, targetName);
        }
        if (leftOffset >= body.width() / 2) { //cycle
            return Animate(div, -(arrayLength) * body.width(), true, targetName);
        }
        if (leftOffset >= (body.width() * 0 - (body.width() / 2)) || (speed > .25 && leftOffset > (1 * body.width() * -1))) {
            return Animate(div, -body.width(), true, targetName);
        }
        for (i = 1; i < arrayLength - 1; i++) {
            if (speed < -.25 && leftOffset > -(i + 1) * body.width()) {
                return Animate(div, -(i + 2) * body.width(), true, targetName);
            }
            if (leftOffset <= (-i * body.width() + (body.width() / 2)) && leftOffset > -((body.width() * i) + (body.width() / 2)) || (speed > .25 && leftOffset >= (-(i + 1) * body.width()) && leftOffset < (-i * body.width()))) {
                return Animate(div, -(i + 1) * body.width(), true, targetName);
            }
        }
        if (leftOffset <= (-(arrayLength - 1) * body.width() - (body.width() / 2))) {//cycle
            return Animate(div, -body.width(), true, targetName);
        }

        if (leftOffset <= (-(arrayLength - 1) * body.width() + (body.width() / 2))) {
            return Animate(div, -(arrayLength) * body.width(), true, targetName);
        }
    }
    else {
        return Animate(div, -body.width(), true, targetName);
    }
    return false;
}

function touchMove(e, div) {
    isClick = false;

    var targetEvent = e.touches.item(0);
    var currentPos = targetEvent.clientX;
    var newDistance;

    distanceToMove = currentPos - touchStartPos;

    $('#leftDistance').text(distanceToMove);

    if (distanceToMove > 0) {
        swipeDirection = 'left';
    }
    else {
        swipeDirection = 'right';
    }

    newDistance = distanceToMove;

    if (newDistance < 0) {
        newDistance = newDistance * -1;
    }

    if (newDistance > 5) {
        //turn of default browser behaviour
        e.preventDefault();
        //stop the timer
        //StopTimer();
        $(div).add().css('left', (divLeftOffset + distanceToMove) + 'px');
    }

    return false;
}

function onResize() {
    resize($('body').width());
}

function resize(size) {
    $('.carousel-pic').add().css('width', size - 14 + 'px');
    var dotPanelSize = arrayLength * 14 + (arrayLength - 1) * 17;
    Animate('#CarouselItemContainer', -(currentItem * size), false, false);
}

//mobile elements
if (window.$ != undefined) {
    $(document).ready(function () {
        setDevisePixelRatio();
    });
} else {
    window.onload = setDevisePixelRatio();
}

function setDevisePixelRatio() {
    var pixelRatio = window.devicePixelRatio;
    var cookieName = "_devicePixelRatio";
    setCookie(cookieName, pixelRatio, 999);
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
    document.cookie = c_name + "=" + c_value;
}

//popup
$(document).ready(function () {
    $(".dominicks-close").click(function () {
        $.ajax({
            type: "GET",
            url: "/Header/ClosePromoPopup",
            success: function () {
                $(".dominicks-popup").css('display', 'none');
            }
        });
    });
    //gas reward division detection
    $("body").execute('gasRewards', {});
})
