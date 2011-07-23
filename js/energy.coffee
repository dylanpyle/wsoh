class window.Energy
  constructor: ->
    @items = {}
    @speed = 5
    @src = 'images/energy.png'
  
  loop: ->
    @update()
    @draw()
  
  update: ->
    for id, item of @items
      item.x -= @speed
  
  draw: ->
    for id, item of @items
      img = new Image()
      img.src = @src
      game.context.drawImage(img, item.x, item.y, 20, 80)

  shoot: ->
    @items[Math.floor(Math.random()*10000)] = {
      x: game.canvas.width + 50
      y: Math.random() * (game.canvas.height - 50) + 10
    }