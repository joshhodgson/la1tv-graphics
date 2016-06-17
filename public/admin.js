var socket = io.connect('http://' + window.location.host);

socket.on('connect', function(socket) {
  console.log("Connected!")
})

var lastL3 = 0

function addLowerThird(line1, line2) {
  console.log("New lower third! " + line1 + ", " + line2)
  lastL3 = lastL3 + 1
  $('#blankL3').clone().attr('id', "l3" + lastL3).insertBefore('#blankL3').removeClass('hidden')
  var container = $('#l3' + lastL3)
  container.find('.line1').text(line1)
  container.find('.line2').text(line2)

  container.find('.delete').click(function() {
    container.remove()
    setTimeout(updateServerL3, 10)

  })
  container.find('.left').click(function() {
    socket.emit('lowerThird', {
      'show': true,
      'side': 'left',
      'line1': line1,
      'line2': line2
    })
  })
  container.find('.right').click(function() {
    socket.emit('lowerThird', {
      'show': true,
      'side': 'right',
      'line1': line1,
      'line2': line2
    })
    console.log(line1)
  })

  container.find('.down').click(function() {
    console.log('button clicked')
    if (!container.next().hasClass('hidden')){
      container.insertAfter(container.next())
      setTimeout(updateServerL3, 10)

    }
  })

  container.find('.up').click(function() {
    console.log('button clicked')
    container.insertBefore(container.prev())
    setTimeout(updateServerL3, 10)

  })

  setTimeout(updateServerL3, 10)
}

function clearL3(){
  $("#listOfL3").children().each(function(index, element){
    if (!$(element).hasClass('hidden')){
      $(element).remove()
    }
  })
}
var lastT = 0;

function addTickerItem(text) {
  console.log("New ticker item " + text)
  lastT = lastT + 1
  $('#blankT').clone().attr('id', "T" + lastT).insertBefore('#blankT').removeClass('hidden')
  var container = $('#T' + lastT)
  container.find('.line1').text(text)

  container.find('.delete').click(function() {
    container.remove()
  })

  container.find('.toggle').click(function() {
    addTickerToList(text)
  })



}

function addTickerToList(text) {
  var item = $("<button type='button'></button>")
  item.addClass("btn btn-success tickerTextLi").text(text).click(function() {
    item.remove()
  })
  console.log(item.text())

  item.insertBefore($('#dummytickeritem'))

}

$(document).ready(function() {

  $('#tickerShow').click(function() {
    var text = ''
    $(".tickerTextLi").each(function(index) {
      text = text + $(this).text() + "  -  ";
    });
    text = text.substring(0, text.length - 5)
    socket.emit('ticker', {
      'show': true,
      'text': text,
      'loop': false
    })
  })
  $('#tickerLoop').click(function() {
    var text = ''
    $(".tickerTextLi").each(function(index) {
      text = text + $(this).text() + "  -  ";
    });
    text = text.substring(0, text.length - 5)
    socket.emit('ticker', {
      'show': true,
      'text': text,
      'loop': true
    })
  })
  $('#tickerHide').click(function() {
    socket.emit('ticker', {
      show: false
    })
  })

})
var l3s = [];

function updateServerL3(){
  l3s = [];
  $("#listOfL3").children().each(function(index, element){
    if (!$(element).hasClass('hidden')){
      var l3 = {l1: $(element).find(".line1").text(), l2: $(element).find(".line2").text()}
      l3s.push(l3)}
    })
    socket.emit('l3list', l3s)
  }
  socket.on('l3list', function(payload){
    if (JSON.stringify(payload)!=JSON.stringify(l3s)){
      clearL3()

      for(var i in payload){
        addLowerThird(payload[i].l1, payload[i].l2)
      }
    }
  })
