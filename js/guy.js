(function() {
  window.Guy = (function() {
    function Guy() {
      this.x = 30;
      this.y = 30;
      this.src = 'images/guy.png';
      this.energy = 100;
    }
    Guy.prototype.loop = function() {
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
      drawGuy = function() {
        var img;
        img = new Image();
        img.src = this.src;
        return game.context.drawImage(img, this.x, this.y, 20, 80);
      };
      drawEnergy = function() {
        return $('title').text("Energy: " + this.energy);
      };
      drawGuy();
      return drawEnergy();
    };
    return Guy;
  })();
}).call(this);
