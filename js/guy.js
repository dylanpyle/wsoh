(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Guy = (function() {
    function Guy() {
      this.x = 30;
      this.y = 30;
      this.width = 20;
      this.height = 80;
      this.src = 'images/guy.png';
      this.energy = 100;
      this.fallingAsleep = 0;
    }
    Guy.prototype.loop = function() {
      this.fallingAsleep++;
      if (this.fallingAsleep >= 10) {
        this.fallingAsleep = 0;
        this.energy -= 1;
        game.updateScore(this.energy);
      }
      this.checkKeys();
      return this.draw();
    };
    Guy.prototype.checkKeys = function() {
      var speed;
      speed = 15;
      if (game.keysDown['40']) {
        if (this.y < game.canvas.height - 90) {
          this.y += speed;
        }
      }
      if (game.keysDown['38']) {
        if (this.y > 20) {
          return this.y -= speed;
        }
      }
    };
    Guy.prototype.draw = function() {
      var drawEnergy, drawGuy;
      drawGuy = __bind(function() {
        var img;
        img = new Image();
        img.src = this.src;
        return game.context.drawImage(img, this.x, this.y, this.width, this.height);
      }, this);
      drawEnergy = __bind(function() {}, this);
      drawGuy();
      return drawEnergy();
    };
    return Guy;
  })();
}).call(this);
