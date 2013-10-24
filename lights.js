var gpio = require('gpio');
var blaster = require('pi-blaster.js');
var Wave = require('./wave');

var THROB_REPEAT = 100;
var FLASH_WAIT = 500;

var OFF = 1;
var ON = 0;

var led1 = {
	red: {
		channel: 5,
		gpio: 23,
	},

	green: {
		channel: 1,
		gpio: 17,
	},

	blue: {
		channel: 2,
		gpio: 18,
	},

	all: function() { return [ this.red, this.green, this.blue ]; }
};

function initialize(leds) {
	return
	if (!Array.isArray(leds)) leds = [ leds ];
	leds.forEach(function(led) {
		var pin = gpio.export(led.gpio, { ready: function() { console.log('reset', led.gpio); pin.set(); } })
	});
}

function reset(leds) {
	if (!Array.isArray(leds)) leds = [ leds ];
	leds.forEach(function(led) {

		clearTimeout(led.timeoutHandle);
		delete led.timeoutHandle;

		clearInterval(led.intervalHandle);
		delete led.intervalHandle;
		delete led.throbbing;

		set(led, OFF);
	});
}

function set(led, value) {
	led.value = value;
	//console.log('setting', led.channel, 'to', led.value)
	blaster.setPwm(led.channel, led.value);
}

function throb(led, seconds) {
	var wave = new Wave(seconds);
	led.throbbing = true;
	led.intervalHandle = setInterval(function(){
		if (led.throbbing)
			set(led, wave.next());

	}, THROB_REPEAT);
}

function pauseThrobbing(led) { 
	var wasThrobbing = led.throbbing;
	var resume = function() {
		led.throbbing = wasThrobbing;
	};

	led.throbbing = false; 
	return resume;
}

function flash(led, done) {
	done = done || function(){};

	set(led, ON);

	led.timeoutHandle = setTimeout(function() {
		set(led, OFF);
		done();

	}, FLASH_WAIT);
}

function rainbow() {
	throb(led1.red, 1);
	throb(led1.green, 2);
	throb(led1.blue, 3);
}

// ----

function idle() {
	console.log('idle');
	reset(led1.all());
	throb(led1.red, 5);
}

function play() {
	console.log('play');
	reset(led1.all());
	rainbow();
}


function status() {
	console.log('status');
	var resume = pauseThrobbing(led1.red);
	flash(led1.green, function(){
		flash(led1.red, function(){
			flash(led1.blue, function(){
				resume()
			});
		});
	});
}


initialize(led1.all());

module.exports = {
	idle: idle,
	play: play,
	status: status
};
