var lights = require('./lights');
var button = require('./button');
var player = new (require('./player'))('./media');
console.log(lights, button, player)

lights.idle();

button.change(function(){
	player.playRandom(lights.idle, function(){
    lights.idle();
  });
	lights.play();
});

setInterval(function(){
	if (!player.playing())
		lights.status(lights.idle);
}, 10 * 1000);