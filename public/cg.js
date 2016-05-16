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

socket.on('time', function(payload) {
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
  if (payload.show == true) {
    if ($('#lowerthird').hasClass('fadeInLeft')) {
      $('#lowerthird').addClass('fadeOutLeft');
      setTimeout(function() {
        $(".lowerthirdtext").text(payload.line1);
        $(".lowerthirdsecondline").text(payload.line2);
        $('#lowerthird').addClass('fadeInLeft').removeClass('fadeOutLeft')
      }, 1000)
    } else {
      $(".lowerthirdtext").text(payload.line1);
      $(".lowerthirdsecondline").text(payload.line2);
      $('#lowerthird').addClass('fadeInLeft').removeClass('fadeOutLeft');
    }
  } else if (payload.show == false) {
    $('#lowerthird').addClass('fadeOutLeft').removeClass('fadeInLeft')
  } else {
    console.log("Error - don't know what to do for l3 with " + payload)
  }
})
