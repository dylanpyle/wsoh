class window.Sound
  constructor: (el) ->
    @audio = el
    @frameSize = 2048
    @bufferSize = @frameSize / 2
    @sampleRate = 44100
    @signal = new Float32Array(@bufferSize)
    @fft = new FFT(@bufferSize, @sampleRate)
    @bd = new BeatDetektor()
    @vu = new BeatDetektor.modules.vis.VU()
    @ftimer = 0
    el.addEventListener('timeupdate', =>
      @timeUpdate()
    , false)
    @draw()

  timeUpdate: ->
    @audio.addEventListener('MozAudioAvailable', (event) =>
      @audioAvailable(event)
    , false)
    @timeupdate = null
  
  audioAvailable: (event) ->
    frameBuffer = event.frameBuffer
    timestamp = event.time
    signal = DSP.getChannel(DSP.MIX, frameBuffer)
    @fft.forward signal
    @bd.process timestamp, @fft.spectrum
    @ftimer += @bd.last_update
    if @ftimer > 1.0/24.0
      @vu.process @bd,@ftimer
      @ftimer = 0
  
  draw: ->
    if @vu.vu_levels.length
      z = @vu.vu_levels[0]
      console.log(z+1)
    setTimeout(=>
      @draw()
    , 60)