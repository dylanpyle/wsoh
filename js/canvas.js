(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Game = (function() {
    function Game(element) {
      this.canvas = document.getElementById(element);
      this.context = this.canvas.getContext('2d');
      this.guy = new Guy();
      this.energy = new Energy();
      this.sound = new SoundDetector(document.getElementById('sound'));
      this.fps = 0;
      this.keysDown = {};
      this.backgroundPos = 0;
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
      this.sound.loop();
      this.energy.loop();
      this.calculateFPS();
      $('title').text(this.fps);
      mozRequestAnimationFrame(__bind(function() {
        return this.loop();
      }, this), this.canvas);
      this.backgroundPos = this.timePos - 3;
      return $('canvas').css('backgroundPosition', this.backgroundPos + 'px 100%');
    };
    Game.prototype.clear = function() {
      this.context.fillStyle = '#666';
      return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Game.prototype.updateScore = function(score) {
      $('#score').html(score);
      return $('#score').width(score * 5);
    };
    return Game;
  })();
}).call(this);
