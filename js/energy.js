(function() {
  window.Energy = (function() {
    function Energy() {
      this.items = {};
      this.speed = 5;
      this.src = 'images/energy.png';
    }
    Energy.prototype.loop = function() {
      this.update();
      return this.draw();
    };
    Energy.prototype.update = function() {
      var id, item, _ref, _results;
      _ref = this.items;
      _results = [];
      for (id in _ref) {
        item = _ref[id];
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
        _results.push(game.context.drawImage(img, item.x, item.y, 20, 80));
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
