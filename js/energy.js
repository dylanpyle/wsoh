(function() {
  window.Energy = (function() {
    function Energy() {
      this.items = {};
      this.speed = 15;
      this.src = 'images/energy.png';
      this.height = 80;
      this.width = 20;
    }
    Energy.prototype.loop = function() {
      this.update();
      return this.draw();
    };
    Energy.prototype.update = function() {
      var g, halfX, halfY, id, item, _ref, _results;
      _ref = this.items;
      _results = [];
      for (id in _ref) {
        item = _ref[id];
        g = game.guy;
        halfX = item.x + this.width / 2;
        halfY = item.y + this.height / 2;
        if ((halfX > g.x && halfX < (g.x + g.width)) && (halfY > g.y && halfY < (g.y + g.height))) {
          g.energy -= 5;
          delete game.energy.items[id];
        }
        _results.push(item.x -= this.speed);
      }
      return _results;
    };
    Energy.prototype.draw = function() {
      var id, img, item, _ref, _results;
      _ref = this.items;
      _results = [];
      for (id in _ref) {
        item = _ref[id];
        img = new Image();
        img.src = this.src;
        _results.push(game.context.drawImage(img, item.x, item.y, this.width, this.height));
      }
      return _results;
    };
    Energy.prototype.shoot = function() {
      return this.items[Math.floor(Math.random() * 10000)] = {
        x: game.canvas.width + 50,
        y: Math.random() * (game.canvas.height - 50) + 10
      };
    };
    return Energy;
  })();
}).call(this);
