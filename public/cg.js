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
