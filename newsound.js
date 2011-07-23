(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Sound = (function() {
    function Sound(el) {
      var ftimer;
      this.audio = el;
      this.frameSize = 2048;
      this.bufferSize = this.frameSize / 2;
      this.sampleRate = 44100;
      this.signal = new Float32Array(this.bufferSize);
      this.fft = new FFT(this.bufferSize, this.sampleRate);
      this.bd = new BeatDetektor();
      this.vu = new BeatDetektor.modules.vis.VU();
      ftimer = 0;
      this.m_BeatTimer = 0;
      this.audio.addEventListener('MozAudioAvailable', __bind(function(event) {
        this.audioAvailable(event);
        return this.draw();
      }, this), false);
    }
    Sound.prototype.audioAvailable = function(event) {
      console.log('available');
      this.frameBuffer = event.frameBuffer;
      this.timestamp = event.time;
      this.signal = DSP.getChannel(DSP.MIX, this.frameBuffer);
      this.fft.forward(this.signal);
      this.bd.process(this.timestamp, this.fft.spectrum);
      this.ftimer += this.bd.last_update;
      if (this.ftimer > 1.0 / 24.0) {
        this.vu.process(this.bd, this.ftimer);
        return this.ftimer = 0;
      }
    };
    Sound.prototype.draw = function() {
      var z;
      if (this.vu.vu_levels.length) {
        z = this.vu.vu_levels[0];
      }
      return setTimeout(__bind(function() {
        return this.draw();
      }, this), 60);
    };
    return Sound;
  })();
}).call(this);
