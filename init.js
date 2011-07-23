(function() {
  $(function() {
    var $sound;
    $sound = $('#theSound');
    console.log('initiate');
    return window.sound = new Sound($sound[0]);
  });
}).call(this);
