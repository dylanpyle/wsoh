class window.Game
  constructor: (element) ->
    @canvas = document.getElementById(element)
    @context = @canvas.getContext '2d'

    @guy = new Guy()
    @energy = new Energy()
    @sound = new SoundDetector(document.getElementById('sound'))
    @soundPlayer = new SoundPlayer(document.getElementById('audio'))

    @fps = 0

    @keysDown = {}
    @backgroundPos = 0
    @lastFrame = +(new Date)

    $(document).keydown((e) =>
      @keysDown[e.keyCode] = true
    ).keyup((e) =>
      @keysDown[e.keyCode] = false
    )
    setTimeout(=> 
      @loop()
    , 50)
    # s 
  calculateFPS: ->
    frame = +(new Date)  
    @fps = Math.floor(1000 / (frame - @lastFrame))
    @lastFrame = frame

  loop: ->
    @clear()
    @guy.loop()
    @sound.loop()
    @soundPlayer.loop()
    @energy.loop()
    @calculateFPS()
    #$('title').text(@fps)
    mozRequestAnimationFrame(=>
      @loop()
    , @canvas)
   # $('canvas').css('backgroundColor', '#'+Math.floor(Math.random()*16777215).toString(16))

  clear: ->
    @context.fillStyle = '#666'
    @context.clearRect(0, 0, @canvas.width, @canvas.height) 

  updateScore: (score)->
    $('#score').html score
    $('#score').width(score * 5)
    if(score > 80) then faceImg = 8 else faceImg = Math.round(score/10)
    @guy.src = 'images/face/face_'+faceImg+'.png'

  doBeat: ->
    @energy.shoot()
