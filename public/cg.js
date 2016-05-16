function GetClock() {
    var d = new Date();
    var nhour = d.getHours(),
        nmin = d.getMinutes(),
        ap;
    if (nhour == 0) {
        ap = "pm";
        nhour = 12;
    } else if (nhour < 12) {
        ap = "pm";
    } else if (nhour == 12) {
        ap = "pm";
    } else if (nhour > 12) {
        ap = "pm";
        nhour -= 12;
    }

    if (nmin <= 9) nmin = "0" + nmin;

    document.getElementById('clockbox').innerHTML = "" + nhour + ":" + nmin + ap + "";
}

window.onload = function() {
    GetClock();
    setInterval(GetClock, 1000);
}

var socket = io.connect('http://' + window.location.host);

socket.on('connect', function(socket) {
    console.log("Connected!")
})


socket.on('live', function(payload) {
    console.log("live data - " + payload)
    if (payload == true) {
        $("#livecontainer").addClass("live");
        $("#clockcontainer").addClass("live");

    } else if (payload == false) {
        $("#livecontainer").removeClass("live");
        $("#clockcontainer").removeClass("live");

    } else {
        console.log("Error - don't know what to do for live bug with " + payload)
    }
})

socket.on('clock', function(payload) {
    if (payload == true) {
        $("#clockcontainer").addClass("time");

    } else if (payload == false) {
        $("#clockcontainer").removeClass("time");

    } else {
        console.log("Error - don't know what to do for time bug with " + payload)
    }
})
socket.on('bug', function(payload) {
    if (payload == true) {
        $("#logobox").addClass("fadeInRight").removeClass("fadeOutRight");

    } else if (payload == false) {
        $("#logobox").addClass("fadeOutRight").removeClass("fadeInRight");

    } else {
        console.log("Error - don't know what to do for logo bug with " + payload)
    }
})

socket.on('lowerThird', function(payload) {
    if (payload.side !== 'left') {
        if (payload.show == true) {
            if ($('#lowerthirdright').hasClass('fadeInRight')) {
                $('#lowerthirdright').addClass('fadeOutRight');
                setTimeout(function() {
                    $(".lowerthirdtextright").text(payload.line1);
                    $(".lowerthirdsecondlineright").text(payload.line2);
                    $('#lowerthirdright').addClass('fadeInRight').removeClass('fadeOutRight')
                }, 1000)
            } else {
                $(".lowerthirdtextright").text(payload.line1);
                $(".lowerthirdsecondlineright").text(payload.line2);
                $('#lowerthirdright').addClass('fadeInRight').removeClass('fadeOutRight');
            }
        } else if (payload.show == false) {
            $('#lowerthirdright').addClass('fadeOutRight').removeClass('fadeInRight')
        } else {
            console.log("Error - don't know what to do for l3 with " + payload)
        }
    }
})

socket.on('lowerThird', function(payload) {
    if (payload.side !== 'right') {
        if (payload.show == true) {
            if ($('#lowerthirdleft').hasClass('fadeInLeft')) {
                $('#lowerthirdleft').addClass('fadeOutLeft');
                setTimeout(function() {
                    $(".lowerthirdtextleft").text(payload.line1);
                    $(".lowerthirdsecondlineleft").text(payload.line2);
                    $('#lowerthirdleft').addClass('fadeInLeft').removeClass('fadeOutLeft')
                }, 1000)
            } else {
                $(".lowerthirdtextleft").text(payload.line1);
                $(".lowerthirdsecondlineleft").text(payload.line2);
                $('#lowerthirdleft').addClass('fadeInLeft').removeClass('fadeOutLeft');
            }
        } else if (payload.show == false) {
            $('#lowerthirdleft').addClass('fadeOutLeft').removeClass('fadeInLeft')
        } else {
            console.log("Error - don't know what to do for l3 with " + payload)
        }
    }
})

socket.on('ticker', function(payload) {
    if (payload.show == true) {
        if ($("#ticker").hasClass("slideInUp")) {
            $("#ticker").addClass("slideOutDown").removeClass("slideInUp");
            setTimeout(function() {
                $("#tickertext").text(payload.text);
                runCrawler($('#tickercontainer'), $('#tickertext'), false)
                $("#ticker").addClass("slideInUp").removeClass("slideOutDown");
            }, 1000)


        } else {
            $("#tickertext").text(payload.text);
            runCrawler($('#tickercontainer'), $('#tickertext'))
            $("#ticker").addClass("slideInUp").removeClass("slideOutDown");
        }

    } else if (payload.show == false) {
        $("#ticker").addClass("slideOutDown").removeClass("slideInUp");

    } else {
        console.log("Error - don't know what to do for ticker bug with " + payload)
    }
})

///////Begin ticker

function runCrawler(container, text, loop) {
    text.finish()
    var containerWidth = container.width();
    var textWidth = text.width();
    console.log("conatiner text" + containerWidth + " " + textWidth)

    var time = (textWidth + containerWidth) / .08
    text.css("left", containerWidth)
    text.animate({
        left: -textWidth - 10
    }, time, "linear", function() {
        if ($("#ticker").hasClass("slideInUp")) {
            text.css("left", containerWidth)
            runCrawler($('#tickercontainer'), $('#tickertext'), true)
        }
    })
}
