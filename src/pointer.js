(function() {
	'use strict';

	window.Pointer = function(x, y) {
		this.coordinates = [x, y];
		this.no = game.pointer.length;
		this.tick = 7;
		this.active = true;
	};
})();