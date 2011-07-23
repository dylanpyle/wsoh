class window.Game
  constructor: (element) ->
    @canvas = document.getElementById(element)
    @context = @canvas.getContext '2d'
    @clear()

    @guy = new Guy()
    @energy = new Energy()

    @fps = 30

    @keysDown = {}

    $('body').keydown((e) =>
      @keysDown[e.keyCode + ''] = true
    ).keyup((e) =>
      @keysDown[e.keyCode + ''] = false
    )

    setInterval(=> 
      @loop()
    , 1000/@fps)

  loop: ->
    @clear()
    @guy.loop()
    @energy.loop()

  clear: ->
    @context.fillStyle = '#222'
    @context.fillRect(0, 0, @canvas.width, @canvas.height) 


