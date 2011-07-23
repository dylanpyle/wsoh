(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Sound = (function() {
    function Sound(element) {
      this.every = function(ms, cb) {
        return setInterval(cb, ms);
      };
      this.after = function(ms, cb) {
        return setTimeout(cb, ms);
      };
      this.audio = $('audio')[0];
      this.bd = new BeatDetektor();
      this.vu = new BeatDetektor.modules.vis.VU();
      this.frameSize = 2048;
      this.bufferSize = this.frameSize / 2;
      this.sampleRate = 44100;
      this.signal = new Float32Array(this.bufferSize);
      this.fft = new FFT(this.bufferSize, this.sampleRate);
      this.bd = new BeatDetektor();
      this.vu = new BeatDetektor.modules.vis.VU();
      this.ftimer = 0;
      this.audio.addEventListener('timeupdate', __bind(function() {
        return this.timeUpdate();
      }, this), false);
      this.draw();
    }
    Sound.prototype.timeUpdate = function() {
      this.audio.addEventListener("MozAudioAvailable", __bind(function(event) {
        return this.audioAvailable(event);
      }, this), false);
      return this.timeupdate = null;
    };
    Sound.prototype.loop = function() {};
    Sound.prototype.audioAvailable = function(event) {
      var frameBuffer, ftimer, signal, timestamp;
      frameBuffer = event.frameBuffer;
      timestamp = event.time;
      signal = DSP.getChannel(DSP.MIX, frameBuffer);
      this.fft.forward(signal);
      this.bd.process(timestamp, this.fft.spectrum);
      ftimer += this.bd.last_update;
      console.log(ftimer);
      if (ftimer > 1.0 / 24.0) {
        this.vu.process(this.bd, this.ftimer);
        return ftimer = 0;
      }
    };
    Sound.prototype.draw = function() {
      var z;
      console.log('in draw');
      if (this.vu.vu_levels.length) {
        z = this.vu.vu_levels[0];
        console.log("beats");
        this.audio.style.MozTransform = "scale(" + (z + 1) + ")";
      }
      return setTimeout(__bind(function() {
        return this.draw();
      }, this), 60);
    };
    return Sound;
  })();
}).call(this);
