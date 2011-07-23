(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.SoundDetector = (function() {
    function SoundDetector(el) {
      this.el = el;
      el.ontimeupdate = __bind(function() {
        el.addEventListener('MozAudioAvailable', __bind(function(event) {
          return this.audioAvailable(event);
        }, this), false);
        return el.ontimeupdate = null;
      }, this);
      this.launchers = [];
      this.frameSize = 2048;
      this.bufferSize = this.frameSize / 2;
      this.sampleRate = 44100;
      this.signal = new Float32Array(this.bufferSize);
      this.fft = new FFT(this.bufferSize, this.sampleRate);
      this.bd = new BeatDetektor();
      this.vu = new BeatDetektor.modules.vis.VU();
      this.ftimer = 0;
      this.strength = 0;
      this.lastMag = 0;
      this.lastSent = 0;
      this.mag = 0;
      this.draw();
    }
    SoundDetector.prototype.audioAvailable = function(event) {
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
    SoundDetector.prototype.loop = function() {
      return 5;
    };
    SoundDetector.prototype.draw = function() {
      var z;
      if (this.vu.vu_levels.length) {
        z = this.vu.vu_levels[0] * 100;
        if (z > 0) {
          this.mag = z;
        }
        if ((this.mag > this.lastMag * 3.5) && (+(new Date()) - this.lastSent >= 200)) {
          this.lastSent = +(new Date());
          this.launchers.push(this.el.currentTime * 1000);
        }
        this.lastMag = this.mag;
      }
      return setTimeout(__bind(function() {
        return this.draw();
      }, this), 60);
    };
    return SoundDetector;
  })();
}).call(this);
