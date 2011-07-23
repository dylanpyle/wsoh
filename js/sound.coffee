class window.Sound
  constructor: (el) ->
    el.ontimeupdate = =>
      el.addEventListener('MozAudioAvailable', (event) =>
        @audioAvailable(event)
      , false)
      el.ontimeupdate = null
    
    @frameSize = 2048
    @bufferSize = @frameSize / 2
    @sampleRate = 44100
    @signal = new Float32Array(@bufferSize)
    @fft = new FFT(@bufferSize, @sampleRate)
    @bd = new BeatDetektor()
    @vu = new BeatDetektor.modules.vis.VU()
    @ftimer = 0
    @strength = 0
    @draw()
  
  audioAvailable: (event) ->
    frameBuffer = event.frameBuffer
    timestamp = event.time
    @signal = DSP.getChannel(DSP.MIX, frameBuffer)
    @fft.forward(@signal)
    @bd.process timestamp, @fft.spectrum
    @ftimer += @bd.last_update;
    if (@ftimer > 1.0/24.0)
      @vu.process(@bd,@ftimer)
      @ftimer = 0
  
  loop: ->
    game.doBeat() if @strength > 40

  draw: ->
    if @vu.vu_levels.length
      @strength = @vu.vu_levels[0] * 100
    setTimeout(=>
      @draw()
    , 60)
