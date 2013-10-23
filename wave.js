module.exports = function wave(seconds) {
	this._seconds = seconds;
}

//modifier = period seconds
//1 = 6
//2 = 12
//5 = 32
//8 = 48
//10 = 60

module.exports.prototype.next = function() {
	var t = new Date().getTime() / 1000
	var modifier = this._seconds / 6;
	var value = Math.sin(t * ( 1 / modifier));
	return (value + 1) / 2; //range 0-1
};