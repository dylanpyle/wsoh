class window.Guy
  constructor: ->
    @x = 30
    @y = 30
    @width = 20
    @height = 80
    @src = 'images/guy.png'
    @energy = 100

  loop: ->
    @checkKeys()
    @detectCollisions()
    @draw()
  
  detectCollisions: ->
    for id, item in game.energy.items
      if (@x < item.x < @x + @width) and (@y < item.y < @y + @height)
        @energy -= 5
        delete game.energy.items[id]
  
  checkKeys: ->
    speed = 15
    if game.keysDown['40'] # down
      if @y < game.canvas.height - 90
        @y += speed 
    if game.keysDown['38'] # up
      if @y > 20
        @y -= speed

  draw: ->
    drawGuy = =>
      img = new Image()
      img.src = @src
      game.context.drawImage(img, @x, @y, @width, @height)
    
    drawEnergy = =>
      $('title').html("Energy: #{@energy}")

    drawGuy()
    drawEnergy()