class window.Guy
  constructor: ->
    @x = 30
    @y = 30
    @width = 20
    @height = 80
    @src = 'images/guy.png'
    @energy = 100
    @fallingAsleep = 0

  loop: ->
    @fallingAsleep++
    if @fallingAsleep >= 10
      @fallingAsleep = 0
      @energy -= 1
      game.updateScore(@energy)
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
    drawGuy = =>
      img = new Image()
      img.src = @src
      game.context.drawImage(img, @x, @y, @width, @height)
    
    drawEnergy = =>
      #$('title').html("Energy: #{@energy}")

    drawGuy()
    drawEnergy()