var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function player(folder) {
	this._folder = folder;
	this._playing = false;
};

var clips = [
	{ file: 'slow-down.wav', length: 31 },
	{ file: 'paper-diamond-1.wav', length: 26 },
	{ file: 'paper-diamond-2.wav', length: 32 },
	{ file: 'paper-diamond-3.wav', length: 34 }
	//{ file: 'mix.mp3', offset: 104, length: 15 },
];

module.exports.prototype.playRandom = function(done) {
	var clip = clips[ Math.floor( Math.random() * clips.length ) ];
	this.play(clip.file, clip.offset, clip.length, done);
};

module.exports.prototype.play = function(file, offset, length, done) {
	if (this.playing()) this.stop();

	done = done || function(){};
	offset = offset || 0;
	length = length || 30;

	//var intro = path.resolve(this._folder, 'ackbar.m4a');
	var filepath = path.resolve(this._folder, file);
	
	var command = 'mplayer';
	var args = [ filepath, '-ss', offset, '-really-quiet' ];
	var options = { cwd: this._folder };

	this._process = spawn(command, args, options);
	this._playing = true;

	var self = this;
	console.log('starting')
	setTimeout(function(){
		self.stop();
		done()
	}, length * 1000);
};

module.exports.prototype.stop = function() {
		console.log('stopping')
	if (this._process) this._process.kill();
	this._process = null;
	this._playing = false;
};

module.exports.prototype.playing = function() {
	return this._playing;
};