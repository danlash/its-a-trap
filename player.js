var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function player(folder) {
	this._folder = folder;
	this._playing = false;
};

var clips = [
	{ file: 'mix.mp3', offset: 28 },
	{ file: 'mix.mp3', offset: 104, length: 15 },
	{ file: 'trap.mp3' }
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

	var filepath = path.resolve(this._folder, file);

	var command = 'mplayer';
	var args = ['-ss', offset, filepath];
	var options = { cwd: this._folder };

	this._process = spawn(command, args, options);
	this._playing = true;

	var self = this;
	setTimeout(function(){
		self.stop();
		done()
	}, clip.length * 1000);
};

module.exports.prototype.stop = function() {
	if (this._process) this._process.kill();
	this._process = null;
	this._playing = false;
};

module.exports.prototype.playing = function() {
	return this._playing;
};