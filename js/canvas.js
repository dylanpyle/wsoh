(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Game = (function() {
    function Game(element) {
      this.canvas = document.getElementById(element);
      this.context = this.canvas.getContext('2d');
      this.clear();
      this.guy = new Guy();
      this.fps = 30;
      this.keysDown = {};
      $('body').keydown(__bind(function(e) {
        return this.keysDown[e.keyCode + ''] = true;
      }, this)).keyup(__bind(function(e) {
        return this.keysDown[e.keyCode + ''] = false;
      }, this));
      setInterval(__bind(function() {
        return this.loop();
      }, this), 1000 / this.fps);
    }
    Game.prototype.loop = function() {
      this.clear();
      return this.guy.loop();
    };
    Game.prototype.clear = function() {
      this.context.fillStyle = '#222';
      return this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return Game;
  })();
}).call(this);
