(function() {
  window.SoundPlayer = (function() {
    function SoundPlayer(el) {
      this.el = el;
    }
    SoundPlayer.prototype.loop = function() {
      if (this.el.currentTime * 1000 - game.energy.screenTime >= game.sound.launchers[0]) {
        game.sound.launchers.splice(0, 1);
        return game.doBeat();
      }
    };
    return SoundPlayer;
  })();
}).call(this);
