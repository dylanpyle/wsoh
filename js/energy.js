(function() {
  window.Energy = (function() {
    function Energy() {
      this.items = {};
      this.speed = 7;
      this.src = 'images/energy.png';
      this.height = 46;
      this.width = 22;
    }
    Energy.prototype.loop = function() {
      this.update();
      return this.draw();
    };
    Energy.prototype.update = function() {
      var g, halfX, halfY, id, item, totalFrames, _ref, _results;
      totalFrames = 76;
      g = game.guy;
      _ref = this.items;
      _results = [];
      for (id in _ref) {
        item = _ref[id];
        if (item.x < 0) {
          delete game.energy.items[id];
        }
        halfX = item.x + this.width / 2;
        halfY = item.y + this.height / 2;
        item.frameCount++;
        if (item.frameCount >= totalFrames) {
          item.frameCount = 1;
        }
        if ((halfX > g.x && halfX < (g.x + g.width)) && (halfY > g.y && halfY < (g.y + g.height))) {
          g.energy += 30;
          game.updateScore(g.energy);
          delete game.energy.items[id];
        }
        item.x -= this.speed;
        _results.push(item.y = item.baseY + Math.sin(((item.frameCount - (totalFrames / 2)) / totalFrames) * 2 * Math.PI) * 30);
      }
      return _results;
    };
    Energy.prototype.draw = function() {
      var id, img, item, shadow, _ref, _results;
      _ref = this.items;
      _results = [];
      for (id in _ref) {
        item = _ref[id];
        img = new Image();
        shadow = new Image();
        img.src = 'images/bottle/bottle_' + Math.round(item.frameCount / 2) + '.png';
        shadow.src = 'images/shadow.png';
        game.context.drawImage(img, item.x, item.y, this.width, this.height);
        _results.push(game.context.drawImage(shadow, item.x, game.canvas.height - 30, 22, 3));
      }
      return _results;
    };
    Energy.prototype.shoot = function() {
      return this.items[Math.floor(Math.random() * 10000)] = {
        x: game.canvas.width + 50,
        baseY: Math.random() * (game.canvas.height - 90) + 10,
        frameCount: 1
      };
    };
    return Energy;
  })();
}).call(this);
