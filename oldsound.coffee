class window.Sound
  constructor: (element)->
    @every = (ms, cb) -> setInterval cb, ms
    @after = (ms, cb) -> setTimeout cb, ms
    #stole these
    @audio = $('audio')[0] 
    @bd = new BeatDetektor()
    @vu = new BeatDetektor.modules.vis.VU()
    @frameSize = 2048
    @bufferSize = @frameSize / 2
    @sampleRate = 44100
    @signal = new Float32Array(@bufferSize)
    @fft = new FFT(@bufferSize, @sampleRate)
    @bd = new BeatDetektor()
    @vu = new BeatDetektor.modules.vis.VU()
    # console.log @vu
    @ftimer = 0
    
    @audio.addEventListener('timeupdate', =>
      @timeUpdate()
    , false) #this isn't called very often :(
    @draw()
    
  timeUpdate: -> 
    @audio.addEventListener("MozAudioAvailable", (event) =>
      @audioAvailable(event)
    , false)
    @timeupdate = null

  loop: ->
   
  audioAvailable: (event) ->
    frameBuffer = event.frameBuffer
    timestamp = event.time
    signal = DSP.getChannel(DSP.MIX, frameBuffer)
    @fft.forward(signal)
    @bd.process( timestamp, @fft.spectrum )
    ftimer += @bd.last_update
    console.log ftimer
    if (ftimer > 1.0/24.0)
      @vu.process(@bd,@ftimer)
      ftimer = 0
      
  draw: ->
    console.log('in draw')
    if @vu.vu_levels.length
      z = @vu.vu_levels[0]
      console.log "beats"
      @audio.style.MozTransform = "scale(" + (z + 1)+ ")"
    setTimeout =>
      @draw()
    , 60
