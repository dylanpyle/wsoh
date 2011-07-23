(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Sound = (function() {
    function Sound(el) {
      el.ontimeupdate = __bind(function() {
        el.addEventListener('MozAudioAvailable', __bind(function(event) {
          return this.audioAvailable(event);
        }, this), false);
        return el.ontimeupdate = null;
      }, this);
      this.frameSize = 2048;
      this.bufferSize = this.frameSize / 2;
      this.sampleRate = 44100;
      this.signal = new Float32Array(this.bufferSize);
      this.fft = new FFT(this.bufferSize, this.sampleRate);
      this.bd = new BeatDetektor();
      this.vu = new BeatDetektor.modules.vis.VU();
      this.ftimer = 0;
      this.strength = 0;
      this.draw();
    }
    Sound.prototype.audioAvailable = function(event) {
      var frameBuffer, timestamp;
      frameBuffer = event.frameBuffer;
      timestamp = event.time;
      this.signal = DSP.getChannel(DSP.MIX, frameBuffer);
      this.fft.forward(this.signal);
      this.bd.process(timestamp, this.fft.spectrum);
      this.ftimer += this.bd.last_update;
      if (this.ftimer > 1.0 / 24.0) {
        this.vu.process(this.bd, this.ftimer);
        return this.ftimer = 0;
      }
    };
    Sound.prototype.loop = function() {
      if (this.strength > 40) {
        return game.doBeat();
      }
    };
    Sound.prototype.draw = function() {
      if (this.vu.vu_levels.length) {
        this.strength = this.vu.vu_levels[0] * 100;
      }
      return setTimeout(__bind(function() {
        return this.draw();
      }, this), 60);
    };
    return Sound;
  })();
}).call(this);
