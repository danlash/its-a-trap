var piblaster = require("pi-blaster.js");

function pin(channel) {
  return {
    step: 0.01,
    brightness: 1, //off
    gettingBrighter: true,
    decreaseBrightness: function(amount) {
      this.brightness += amount;
      piblaster.setPwm(channel, this.brightness);
    },
    increaseBrightness: function(amount) {
      this.brightness -= amount;
      piblaster.setPwm(channel, this.brightness);
    },
    loop: function(step) {
      if (step) this.step = step;

      if (this.gettingBrighter && this.brightness <= 0) 
        this.gettingBrighter = false;
      if (!this.gettingBrighter && this.brightness >= 1)
        this.gettingBrighter = true;

      if (this.gettingBrighter)
        this.increaseBrightness(this.step)
      else
        this.decreaseBrightness(this.step)
    }
  }
}

var red = pin(0);
var green = pin(4);
var blue = pin(5);

setInterval(function(){ red.loop(); }, 10);
setInterval(function(){ green.loop(); }, 5);
setInterval(function(){ blue.loop(); }, 50);