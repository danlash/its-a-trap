
//f(x) = A sin(wt + p)

//A is the amplitude
//w is the frequency
//p is the phase

var blaster = require('pi-blaster.js');

var redFrequency = 0.5;
var greenFrequency = 1;
var blueFrequency = 1.5;

setInterval(function(){

  var t = new Date().getTime();
  var redValue = Math.sin(redFrequency * t);
  var redPwm = (redValue + 1) / 2;
  blaster.setPwm(5, redPwm )

  var greenValue = Math.sin(greenFrequency * t);
  var greenPwm = (greenValue + 1) / 2;
  blaster.setPwm(1, greenPwm )

  var blueValue = Math.sin(blueFrequency * t);
  var bluePwm = (blueValue + 1) / 2;
  blaster.setPwm(2, bluePwm )

}, 100);