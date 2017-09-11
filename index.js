var game = {
	width:20,
	height:20,
	speed:250,
	score:0
};

var Snake = require('./snake.js');
var snake = new Snake(game, 0, 0, 1);

var Fruit = require('./fruit.js');
var fruit = new Fruit(game, snake);

var keypress = require('keypress');
keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {
	if(key && key.ctrl && key.name == 'c') {
		process.exit();
	} else if(key && (key.name == 'down' || key.name == 'up' || key.name == 'left' || key.name == 'right')) {
		snake.setDir(key.name);
	}
});
process.stdin.setRawMode(true);
process.stdin.resume();

function update() {
	snake.update();
	fruit.update();
	if(fruit.eaten) fruit = new Fruit(game, snake);
}

function draw() {
	var screen = [];
	for(var y = 0; y < game.height; y++) {
		screen.push([]);
		for(var x = 0; x < game.width; x++) {
			screen[y].push(' .');
		}
	}

	fruit.draw(screen);
	snake.draw(screen);

	process.stdout.write('\033c');
	process.stdout.write('Score: ' + game.score + '\n');
	for(var y = 0; y < screen.length; y++) {
		for(var x = 0; x < screen[y].length; x++) {
			process.stdout.write(screen[y][x]);
		}
		process.stdout.write('\n');
	}
}

setInterval(function() {
	update();
	draw();
}, game.speed);