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
    }
    Guy.prototype.loop = function() {
      this.checkKeys();
      this.detectCollisions();
      return this.draw();
    };
    Guy.prototype.detectCollisions = function() {
      var id, item, _len, _ref, _ref2, _ref3, _results;
      _ref = game.energy.items;
      _results = [];
      for (item = 0, _len = _ref.length; item < _len; item++) {
        id = _ref[item];
        _results.push(((this.x < (_ref2 = item.x) && _ref2 < this.x + this.width)) && ((this.y < (_ref3 = item.y) && _ref3 < this.y + this.height)) ? (this.energy -= 5, delete game.energy.items[id]) : void 0);
      }
      return _results;
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
      drawEnergy = __bind(function() {
        return $('title').html("Energy: " + this.energy);
      }, this);
      drawGuy();
      return drawEnergy();
    };
    return Guy;
  })();
}).call(this);
