class window.SoundDetector
  constructor: (el) ->
    @el = el
    el.ontimeupdate = =>
      el.addEventListener('MozAudioAvailable', (event) =>
        @audioAvailable(event)
      , false)
      el.ontimeupdate = null
    @launchers = []
    
    @frameSize = 2048
    @bufferSize = @frameSize / 2
    @sampleRate = 44100
    @signal = new Float32Array(@bufferSize)
    @fft = new FFT(@bufferSize, @sampleRate)
    @bd = new BeatDetektor()
    @vu = new BeatDetektor.modules.vis.VU()
    @ftimer = 0
    @strength = 0
    @lastMag = 0
    @lastSent = 0
    @mag = 0
    @draw()
  
  audioAvailable: (event) ->
    @frameBuffer = event.frameBuffer
    timestamp = event.time
    @signal = DSP.getChannel(DSP.MIX, @frameBuffer)
    @fft.forward(@signal)
    @bd.process timestamp, @fft.spectrum
    @ftimer += @bd.last_update;
    if (@ftimer > 1.0/24.0)
      @vu.process(@bd,@ftimer)
      @ftimer = 0
  
  loop: ->
    5

  draw: ->
    if @vu.vu_levels.length
      z = @vu.vu_levels[0] * 100

      @mag = z if z > 0
      if (@mag > @lastMag * 3.5) and (+(new Date()) - @lastSent >= 60)
        @lastSent = +(new Date())
        @launchers.push(@el.currentTime * 1000) if @el.currentTime * 1000 > game.energy.screenTime
      @lastMag = @mag

    setTimeout(=>
      @draw()
    , 60)