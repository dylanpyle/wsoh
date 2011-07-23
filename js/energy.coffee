class window.Energy
  constructor: ->
    @items = {}
    @speed = 15
    @src = 'images/energy.png'
    @height = 80
    @width = 20
  
  loop: ->
    @update()
    @draw()
  
  update: ->
    for id, item of @items
      g = game.guy
      halfX = item.x + @width / 2
      halfY = item.y + @height / 2
      if (halfX > g.x and halfX < (g.x + g.width)) and (halfY > g.y and halfY < (g.y + g.height))
        g.energy -= 5
        delete game.energy.items[id]
      item.x -= @speed
  
  draw: ->
    for id, item of @items
      img = new Image()
      img.src = @src
      game.context.drawImage(img, item.x, item.y, @width, @height)

  shoot: ->
    @items[Math.floor(Math.random()*10000)] = {
      x: game.canvas.width + 50
      y: Math.random() * (game.canvas.height - 50) + 10
    }