var lights = require('./lights');
var button = require('./button');
var player = new require('./player')('./media');

button.change(function(){
	player.playRandom(lights.idle);
	lights.play();
});

setInterval(function(){
	if (!player.playing())
		lights.status(lights.idle);
}, 60 * 1000);