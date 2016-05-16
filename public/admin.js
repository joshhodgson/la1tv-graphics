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
        container.insertAfter(container.next())
    })

    container.find('.up').click(function() {
        console.log('button clicked')
        container.insertBefore(container.prev())
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

function addTickerToList(text){
  var item = $("<button type='button'></button>")
  item.addClass("btn btn-success").text(text).click(function(){
    item.remove()
  })
  console.log(item.text())

  item.insertBefore($('#dummytickeritem'))

}

setTimeout(function() {
    addLowerThird('hi', 'test');
    addLowerThird('test', 'hello')
}, 100)
