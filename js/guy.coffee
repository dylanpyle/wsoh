class window.Guy
  constructor: ->
    @x = 30
    @y = 30
    @src = 'images/guy.png'
    @energy = 100

  loop: ->
    @checkKeys()
    @draw()
  
  checkKeys: ->
    speed = 15
    if game.keysDown['40'] # down
      if @y < game.canvas.height - 90
        @y += speed 
    if game.keysDown['38'] # up
      if @y > 20
        @y -= speed

  draw: ->
    drawGuy = ->
      img = new Image()
      img.src = @src
      game.context.drawImage(img, @x, @y, 20, 80)
    
    drawEnergy = ->
      $('title').text("Energy: #{@energy}")

    drawGuy()
    drawEnergy()