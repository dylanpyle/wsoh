$ ->
  $('canvas').attr('height', $('body').height() - 81)
             .attr('width', $('body').width())
  window.game = new Game('canvas')
  game.clear()
