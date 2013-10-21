return 0;

var CHECK_EVERY_MILLISECONDS = 1000;

var gpio = require('gpio');

var toggled = false;
var gpio4;

function trap() { 
  if (buttonPressed()) {
    console.log('Toggling');

    if (toggled)
      gpio4.set();
    else
      gpio4.set(0);

    toggled = !toggled;
  }
}

function buttonPressed() {
  return true;
}

function start() {
  console.log('Initializing');

  gpio4 = gpio.export(4, 
                      { 
                        direction: 'out', 
                        ready: function() {
                          console.log('Starting');

                          setInterval(trap, CHECK_EVERY_MILLISECONDS);  
                        } 
                      });
}


start();
