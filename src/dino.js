(function() {
    'use strict'

    window.dino = {
        update: updateInfo,
        turn: setTurn,
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
            game.dino.tick++;
        }

        // is he moving?
        if (game.dino.status === 0) {
            // is he at his destination?
            var dist_x = Math.abs(game.dino.pos[0] - game.dino.destination[0]);
            var dist_y = Math.abs(game.dino.pos[1] - game.dino.destination[1]);

            if (dist_x < 30 && dist_y < 30) {
                // yes!
                this.wait();
            } else {
                // nope, still gotsta move it
                this.move();
                this.rotate();
            }
        }

    }

    function setTurn(x, y) {
        // calculate the angle the dino should get to
        var addThis;
        if (x <= game.dino.pos[0]) {
            if (y <= game.dino.pos[1]) {
                // quadrant 4 => add 270
                addThis = Math.PI * 1.5;
            } else {
                // quadrant 3 => add 180
                addThis = Math.PI;
            }
        } else {
            if (y <= game.dino.pos[1]) {
                // quadrant 1 => add 0
                addThis = 0;
            } else {
                // quadrant 2 => add 90
                addThis = Math.PI / 2;
            }
        }
        var rad1 = Math.atan(y / x);
        var radianFinal = rad1 + addThis;

        // console.log('position');
        // console.log(game.dino.pos[0] + ' ' + game.dino.pos[1]);
        // console.log('destination');
        // console.log(x + ' ' + y);
        // console.log('arctan and quadrant');
        // console.log(rad1 + ' ' + addThis);
        // console.log('resulting radians');
        // console.log(radianFinal);

        // game.dino.angle[0] = radianFinal;
        //
        game.dino.angle[1] = radianFinal;
    }

    function rotateDino() {
        var diff = Math.abs(game.dino.angle[0] - game.dino.angle[1]);
        // console.log(diff);
        // console.log('current angle: ' + game.dino.angle[0] 
        //     + '\ndestination angle: ' + game.dino.angle[1]);

        //how micro so we want these ticks
        var ticks = 16;
        if (game.dino.angle[0] < game.dino.angle[1] && (diff > Math.PI / ticks)) {
            // console.log('rotating to the RIGHT');
            // the current angle is less than what it should be
            game.dino.angle[0] += Math.PI / ticks;
        } else if (game.dino.angle[0] > game.dino.angle[1] && (diff > Math.PI / ticks)) {
            // console.log('rotating to the LEFT');
            // the current angle is more than what it should be
            game.dino.angle[0] -= Math.PI / ticks;
        }
    }

    function startWalking() {
        game.dino.status = 0;
    }

    function stopWalking() {
        game.dino.status = 1;
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