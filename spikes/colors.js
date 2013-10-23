var gpio = require('gpio');
var blaster = require('pi-blaster.js');


//var red = gpio.export(23, { direction: 'out', ready: function(){ red.set(); }})
//var green = gpio.export(17, { direction: 'out', ready: function(){ green.set(); }})
//var blue = gpio.export(18, { direction: 'out', ready: function(){ blue.set(); }})

var step = 0.1;
var interval = 75;


var fadeOut = function (channel, done) {
  done = done || function(){}; 
  var level = 0;

  var handle = setInterval(function(){
    if (level >= 1) { 
      clearInterval(handle); 
      done();
      return; 
    }

    console.log('setting ', channel, ' to ', level)
    blaster.setPwm(channel, level);
    
    level += step;
  }, interval)
};

var fadeIn = function (channel, done) {
  done = done || function(){}; 
  var level = 1;

  var handle = setInterval(function(){
    if (level <= 0) { 
      clearInterval(handle); 
      done();
      return; 
    }

    console.log('setting ', channel, ' to ', level)
    blaster.setPwm(channel, level);
    
    level -= step;
  }, interval)
};

var fadeInAndOut = function(channel) {
  fadeIn(channel, function(){
    fadeOut(channel, function(){ fadeInAndOut(channel); })
  })
}

fadeInAndOut(5); //gpio 23
fadeInAndOut(1); //gpio 17
fadeInAndOut(2); //gpio 18

//imperically
//1 == green = gpio 17
//2 == blue  = gpio 18
//5 == red   = gpio 23