var CHECK_EVERY_MILLISECONDS = 1000;

var gpio = require('gpio');

var buttonToggled = false;
var gpio11;

function trap() { 
  if (buttonPressed()) {
    if (gpio11.value === 0)
      gpio11.set();
    else
      gpio11.set(0);
  }
}

function buttonPressed() {
  return true;
}

function loopEvery(loopFn, timeoutMilliseconds) {
  var looper = function() { loopFn(); setTimeout(looper, timeoutMilliseconds); };
  looper();
}

function init() {

  var gpio11 = gpio.export(11, { direction: 'out' });
}


console.log('Initializing')
init();
console.log('Starting')
loopEvery(trap, timeoutMilliseconds);
