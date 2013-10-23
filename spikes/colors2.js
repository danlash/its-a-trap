var blaster = require('pi-blaster.js');
var gpio = require('gpio');

var OFF = 1;
var ON = 1;

var RED_CHANNEL = 5; //gpio 23
var GREEN_CHANNEL = 1; //gpio 17
var BLUE_CHANNEL = 2; //gpio 18

var BUTTON_PIN = 22; //channel 4

blaster.setPwm(RED_CHANNEL, OFF)
blaster.setPwm(GREEN_CHANNEL, OFF)
blaster.setPwm(BLUE_CHANNEL, OFF)

var paused = false;
var i = 0;
var button = gpio.export(BUTTON_PIN, { direction: 'in' });
button.on('change', function(){
  paused = !paused;
  console.log('changed', ++i)
})

setInterval(function(){
  if (paused) return;

  var red = Math.random();
  var green = Math.random();
  var blue = Math.random();

  blaster.setPwm(RED_CHANNEL, red);
  blaster.setPwm(GREEN_CHANNEL, green);
  blaster.setPwm(BLUE_CHANNEL, blue);

}, 100)