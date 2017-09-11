module.exports = function(game, snake) {
	var self = this;
	this.x = Math.floor(Math.random() * game.width);
	this.y = Math.floor(Math.random() * game.height);
	this.eaten = false;

	this.update = function() {
		if(snake.x == self.x && snake.y == self.y) {
			game.score++;
			snake.length++;
			self.eaten = true;
		}
	};

	this.draw = function(screen) {
		screen[self.y][self.x] = ' \u00F3';
	};
}