//pin 22 = channel 4
var gpio = require('gpio');
var button = gpio.export(22, { direction: 'in' })
button.on('change', function(){
  console.log('changed!')
})