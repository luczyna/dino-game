(function() {
	'use strict';

	var steps = [
		//1
		[
			['fill', 1]
		],
		//2
		[
			['fill', 3]
		],
		//3
		[
			['fill', 5], ['stroke', 7]
		],
		//4
		[
			['stroke', 6, 'other'], ['stroke', 8], ['stroke', 9]
		],
		//5
		[
			['stroke', 7, 'other'], ['stroke', 9], ['fill', 2]
		],
		//6
		[
			['stroke', 10, 'other'], ['fill', 3]
		],
		//7
		[
			['fill', 1]
		],
	];

	window.pointer = {
		steps: steps,
		update: updatePointers
	}

	window.Pointer = function(x, y) {
		this.coordinates = [x, y];
		this.no = game.pointer.length;
		this.tick = 0;
		this.active = true;
	};

	//////







	function updatePointers() {
		for (var i = 0; i < game.pointer.length; i++) {
			var p = game.pointer[i];

			if (p.tick === this.steps.length - 1) {
				p.active = false;
			} else {
				p.tick++;
			}
		}
	}
})();