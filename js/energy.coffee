class window.Energy
  constructor: ->
    @items = {}
    @speed = 7
    @src = 'images/energy.png'
    # 38 frames
    # images/bottle/bottle_%i.png
    @screenTime = 4000
    @height = 46
    @width = 22
  
  loop: ->
    @update()
    @draw()
  
  update: ->
    totalFrames = 76 #76 opportunities to do cool things
    g = game.guy
    for id, item of @items
      if item.x < 0
        delete game.energy.items[id]
      halfX = item.x + @width / 2
      halfY = item.y + @height / 2
      item.frameCount++ 
      if(item.frameCount >= totalFrames) then item.frameCount = 1
      if (halfX > g.x and halfX < (g.x + g.width)) and (halfY > g.y and halfY < (g.y + g.height))
        g.energy += 30
        game.updateScore(g.energy)
        delete game.energy.items[id]
      item.x -= @speed
      item.y = item.baseY + Math.sin(((item.frameCount-(totalFrames/2))/totalFrames)*2*Math.PI)*30
  
        
  draw: ->
    totalWidth = game.canvas.width - 50
    for id, item of @items
      img = new Image()
      shadow = new Image()
      img.src = 'images/bottle/bottle_'+Math.round(item.frameCount / 2)+'.png'
      shadow.src = 'images/shadow.png'
      item.x = totalWidth - (((+(new Date)-item.started)/(@screenTime+400)) * totalWidth)
      game.context.drawImage(img, item.x, item.y, @width, @height)
      game.context.drawImage(shadow, item.x, game.canvas.height - 30, 22, 3)

  shoot: ->
    @items[Math.floor(Math.random()*10000)] = {
      started: +(new Date())
      baseY: Math.random() * (game.canvas.height - 90) + 10
      frameCount: 1
    }