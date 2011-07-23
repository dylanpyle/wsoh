class window.Game
  constructor: (element) ->
    @canvas = document.getElementById(element)
    @context = @canvas.getContext '2d'

    @guy = new Guy()
    @energy = new Energy()
    @sound = new Sound(document.getElementById('sound'))

    @fps = 0

    @keysDown = {}
    @backgroundPos = 0
    @lastFrame = +(new Date)

    $('body').keydown((e) =>
      @keysDown[e.keyCode + ''] = true
    ).keyup((e) =>
      @keysDown[e.keyCode + ''] = false
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
    @energy.loop()
    @calculateFPS()
    $('title').text(@fps)
    mozRequestAnimationFrame(=>
      @loop()
    , @canvas)
    @backgroundPos = @timePos - 3
    $('canvas').css('backgroundPosition', @backgroundPos+'px 100%')
   # $('canvas').css('backgroundColor', '#'+Math.floor(Math.random()*16777215).toString(16))

  clear: ->
    @context.fillStyle = '#666'
    @context.clearRect(0, 0, @canvas.width, @canvas.height) 

  updateScore: (score)->
    $('#score').html score
    $('#score').width(score * 5)
