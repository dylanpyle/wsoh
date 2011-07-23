class window.SoundPlayer
  constructor: (el) ->
    @el = el
    @ranYet = false
  
  loop: ->
    if @el.currentTime * 1000 + game.energy.screenTime >= game.sound.launchers[0]
      game.sound.launchers.splice(0,1)
      game.doBeat()