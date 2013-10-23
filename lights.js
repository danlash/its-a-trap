var gpio = require('gpio');
var blaster = require('pi-blaster.js');
var Wave = require('./wave');

var THROB_REPEAT = 100;
var FLASH_WAIT = 300;

var OFF = 1;
var ON = 0;

var leds = {
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
	}
};


function reset(leds) {
	if (!Array.isArray(leds)) leds = [ leds ];
	leds.forEach(function(led) {

		clearTimeout(led.timeoutHandle);
		delete led.timeoutHandle;

		clearInterval(led.intervalHandle);
		delete led.intervalHandle;

		set(led, OFF);
	});
}

function set(led, value) {
	led.value = value;
	blaster.setPwm(led.channel, led.value);
}

function off(led) {
	set(led, OFF);
}

function on(led) {
	set(led, ON);
}

function throb(led, seconds) {
	var wave = new Wave(seconds);

	led.intervalHandle = setInterval(function(){
		set(led, wave.next());
	}, THROB_REPEAT);
}

function flash(led, done) {
	done = done || function(){};

	set(led, ON);
	led.timeoutHandle = setTimeout(function() {
		set(led, OFF);
		done();
	}, FLASH_WAIT);
}

// ----

function idle() {
	reset(leds);
	throb(leds.red, 5);
}

function play() {
	reset(leds);
	throb(leds.red, 1);
	throb(leds.green, 2);
	throb(leds.green, 3);
}

function status() {
	reset(leds);
	flash(leds.red, function() {
		flash(leds.green, function() {
			flash(leds.blue);
		});
	});
}


reset(leds);
module.exports = {
	idle: idle,
	play: play,
	status: status
};
