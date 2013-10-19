var CHECK_EVERY_MILLISECONDS = 1000;

var gpio = require('gpio');

var toggled = false;
var gpio11;

function trap() { 
  if (buttonPressed()) {
    if (toggled)
      gpio11.set();
    else
      gpio11.set(0);

    toggled = !toggled;
  }
}

function buttonPressed() {
  return true;
}

function loopEvery(loopFn, timeoutMilliseconds) {
  var looper = function() { loopFn(); setTimeout(looper, timeoutMilliseconds); };
  looper();
}

function init(done) {
  console.log('Initializing')

  var gpio11 = gpio.export(11, { direction: 'out', ready: done });
}


init(function(){
  console.log('Starting')
  loopEvery(trap, CHECK_EVERY_MILLISECONDS);  
});

