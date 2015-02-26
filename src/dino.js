(function() {
    'use strict'

    window.dino = {
        update: updateInfo,
        rotate: rotateDino,
        walk: startWalking,
        wait: stopWalking,
        move: keepMoving
    }






    //////

    function updateInfo() {
        // update the frame
        if (game.dino.tick === 7) {
            game.dino.tick = 0;
        } else {
            game.dino.tick++
        }

        // is he moving?
        if (game.dino.status === 1) {
            // is he at his destination?
            var dist_x = Math.abs(game.dino.pos[0] - game.dino.destination[0]);
            var dist_y = Math.abs(game.dino.pos[1] - game.dino.destination[1]);

            if (dist_x < 30 && dist_y < 30) {
                // yes!
                this.wait();
            } else {
                // nope, still gotsta move it
                this.move();

            }
        }

    }

    function rotateDino() {
        if (game.dino.angle[0] < game.dino.angle[1] && game.dino.angle[0] !== game.dino.angle[1]) {
            // the current angle is less than what it should be
            game.dino.angle[0]++;
        } else if (game.dino.angle[0] > game.dino.angle[1] && game.dino.angle[0] !== game.dino.angle[1]) {
            // the current angle is more than what it should be
            game.dino.angle[0]--;
        }
    }

    function startWalking() {
        game.dino.status = 1;
    }

    function stopWalking() {
        game.dino.status = 0;
    }

    function keepMoving() {
        var x = Math.abs(game.dino.pos[0] - game.dino.destination[0]);
        var y = Math.abs(game.dino.pos[1] - game.dino.destination[1]);
        if (game.dino.pos[0] > game.dino.destination[0]) {
            game.dino.pos[0] -= (x * 0.1);
        } else {
            game.dino.pos[0] += (x * 0.1);
        }

        if (game.dino.pos[1] > game.dino.destination[1]) {
            game.dino.pos[1] -= (y * 0.1);
        } else {
            game.dino.pos[1] += (y * 0.1);
        }
    }
})();