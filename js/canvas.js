(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Game = (function() {
    function Game(element) {
      this.canvas = document.getElementById(element);
      this.context = this.canvas.getContext('2d');
      this.guy = new Guy();
      this.energy = new Energy();
      this.fps = 0;
      this.keysDown = {};
      this.lastFrame = +(new Date);
      $('body').keydown(__bind(function(e) {
        return this.keysDown[e.keyCode + ''] = true;
      }, this)).keyup(__bind(function(e) {
        return this.keysDown[e.keyCode + ''] = false;
      }, this));
      setTimeout(__bind(function() {
        return this.loop();
      }, this), 50);
    }
    Game.prototype.calculateFPS = function() {
      var frame;
      frame = +(new Date);
      this.fps = Math.floor(1000 / (frame - this.lastFrame));
      return this.lastFrame = frame;
    };
    Game.prototype.loop = function() {
      this.clear();
      this.guy.loop();
      this.energy.loop();
      this.calculateFPS();
      $('title').text(this.fps);
      return webkitRequestAnimationFrame(__bind(function() {
        return this.loop();
      }, this), this.canvas);
    };
    Game.prototype.clear = function() {
      this.context.fillStyle = '#222';
      return this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return Game;
  })();
}).call(this);
