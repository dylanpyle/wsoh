class window.Game
  constructor: (element) ->
    @canvas = document.getElementById(element)
    @context = @canvas.getContext '2d'

    @guy = new Guy()
    @energy = new Energy()

    @fps = 0

    @keysDown = {}

    @lastFrame = +(new Date)

    $('body').keydown((e) =>
      @keysDown[e.keyCode + ''] = true
    ).keyup((e) =>
      @keysDown[e.keyCode + ''] = false
    )
    setTimeout(=> 
      @loop()
    , 50)
  
  calculateFPS: ->
    frame = +(new Date)  
    @fps = Math.floor(1000 / (frame - @lastFrame))
    @lastFrame = frame

  loop: ->
    @clear()
    @guy.loop()
    @energy.loop()
    @calculateFPS()
    $('title').text(@fps)
    webkitRequestAnimationFrame(=>
      @loop()
    , @canvas)

  clear: ->
    @context.fillStyle = '#222'
    @context.fillRect(0, 0, @canvas.width, @canvas.height) 


