var gpio = require('gpio');

//pin 22 = channel 4
var button = gpio.export(22, { direction: 'in' })

module.exports.change = function(changed) {
	button.on('change', function(){
    console.log('button')
    changed()
  });
}
