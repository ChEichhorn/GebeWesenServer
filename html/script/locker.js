$(function(){
  $.fn.locker = function(options) {
    options = {} || options;
    $('#locker').remove();
    return $('<div id="locker"></div>').each(function(){
      
      $(this).css({
        position:   "absolute",
        background: options.background || "red",
        top:0,
        left:0,
        "z-index":"999",
        width: "100%", height: "100%",
        margin: "0", padding: "0"
      });
      
    }).appendTo('body').fadeOut(0);
  }

  $.fn.showLock = function(times,speed) {
    times = 3 || times;
    speed = 50 || speed;

    var $locker = $('#locker'),
        flash,_flashCount = 0;
    
    flash = function(){
    $locker.fadeIn({duration:speed,easing:'linear',queue:false,always:function(){
      _flashCount++;
      if(_flashCount <= times)
        $locker.fadeOut({duration:speed,easing:'linear',always:flash,queue:false});  
      else
        $locker.fadeOut(speed);  
      }});
    }

    flash();
  };

});
