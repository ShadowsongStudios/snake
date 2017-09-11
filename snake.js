module.exports = function(game, x, y, length) {
	var self = this;
	this.x = x;
	this.y = y;
	this.dir = 'right';
	this.head = '\u25B6';
	this.length = length;

	this.moves = [{x:0, y:0}];

	this.update = function() {
		switch(self.dir) {
			case 'left':
				self.x--;
				break;
			case 'right':
				self.x++;
				break;
			case 'up':
				self.y--;
				break;
			case 'down':
				self.y++;
				break;
		}

		if(self.x < 0) self.x = game.width - 1;
		else if(self.x >= game.width) self.x = 0;

		if(self.y < 0) self.y = game.height - 1;
		else if(self.y >= game.height) self.y = 0;

		self.moves.forEach((el) => {
			if(el.x == self.x && el.y == self.y) { // Game Over
				process.exit();
			}
		})

		self.moves.unshift({x:self.x, y:self.y});
		self.moves = self.moves.slice(0, self.length);
	};

	this.draw = function(screen) {
		self.moves.forEach((el, i) => {
			if(i == 0) screen[el.y][el.x] = ' ' + self.head;
			else screen[el.y][el.x] = ' #';
		});
	};

	this.setDir = function(dir) {
		switch(dir) {
			case 'left':
				self.dir = 'left';
				self.head = '\u25C0';
				break;
			case 'right':
				self.dir = 'right';
				self.head = '\u25B6';
				break;
			case 'up':
				self.dir = 'up';
				self.head = '\u25B2';
				break;
			case 'down':
				self.dir = 'down';
				self.head = '\u25BC';
				break;
		}
	}
}