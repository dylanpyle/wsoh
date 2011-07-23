(function() {
  $(function() {
    $('canvas').attr('height', $('body').height() - 81).attr('width', $('body').width());
    window.game = new Game('canvas');
    return game.clear();
  });
}).call(this);
