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
                this.rotate();
                this.move();
            }
        }

    }

    function setTurn(x, y) {
        // calculate the angle the dino should get to
        var arctan, trig = {};
        var direction = ['up', null];
        // what direction are we facing?
        if (
            game.dino.angle[0] <= Math.PI * 0.5 ||
            game.dino.angle[0] >= Math.PI * 1.5
        ) {
            // we are facing up
            console.log('facing up');
            direction[0] = 'up';
        } else {
            // we are facing down
            console.log('facing down');
            direction[0] = 'down';
        }

        if (
            game.dino.angle[0] >= Math.PI * 0.25 &&
            game.dino.angle[0] <= Math.PI * 0.75
        ) {
            // we are facing right
            console.log('facing right');
            direction[1] = 'right';
        }
        if (
            game.dino.angle[0] >= Math.PI * 1.25 &&
            game.dino.angle[0] <= Math.PI * 1.75
        ) {
            // we are facing left
            console.log('facing left');
            direction[1] = 'left';
        }

        // determine the direction to take (left or right)
        if (y <= game.dino.pos[1] && direction[0] === 'up') {
            console.log("dino goes forward up");
            if (x <= game.dino.pos[0]) {
                console.log("dino goes left");
                game.dino.angle[2] = 0;

                trig.x = x - game.dino.pos[0];
                trig.y = game.dino.pos[1] - y;        
                arctan = -Math.atan(y / x);
                game.dino.angle[1] = arctan;
            } else {
                console.log("dino goes right");
                game.dino.angle[2] = 1
        
                trig.x = x - game.dino.pos[0];
                trig.y = game.dino.pos[1] - y;
                arctan = Math.atan(trig.x / trig.y);
                game.dino.angle[1] = arctan;
            }
        } else if (y > game.dino.pos[1] && direction[0] === 'up') {
            console.log("dino turns around to face down");
            if (x <= game.dino.pos[0]) {
                console.log("dino goes left");
                game.dino.angle[2] = 0;

                trig.x = x - game.dino.pos[0];
                trig.y = game.dino.pos[1] - y;        
                arctan = -Math.atan(y / x);
                game.dino.angle[1] = arctan - (Math.PI / 2);
            } else {
                console.log("dino goes right");
                game.dino.angle[2] = 1
                
                trig.x = x - game.dino.pos[0];
                trig.y = y - game.dino.pos[1];
                arctan = Math.atan(trig.y / trig.x);
                game.dino.angle[1] = arctan + (Math.PI / 2);
            }
        } else if (y <= game.dino.pos[1] && direction[0] === 'down') {
            console.log("dino turns around to face up");
            if (x <= game.dino.pos[0]) {
                console.log("dino goes right");
                game.dino.angle[2] = 1

                trig.x = x - game.dino.pos[0];
                trig.y = y - game.dino.pos[1];
                arctan = Math.atan(trig.y / trig.x);
                game.dino.angle[1] = arctan + (Math.PI * 1.5);
            } else {
                console.log("dino goes left");
                game.dino.angle[2] = 0;

                trig.x = x - game.dino.pos[0];
                trig.y = game.dino.pos[1] - y;        
                arctan = Math.atan(y / x);
                game.dino.angle[1] = arctan;
            }
        } else if (y > game.dino.pos[1] && direction[0] === 'down') {
            console.log("dino goes forward down");
            if (x <= game.dino.pos[0]) {
                console.log("dino goes right");
                game.dino.angle[2] = 1;

                trig.x = x - game.dino.pos[0];
                trig.y = y - game.dino.pos[1];
                arctan = Math.atan(trig.y / trig.x);
                game.dino.angle[1] = arctan + (Math.PI * 1.5);
            } else {
                console.log("dino goes left");
                game.dino.angle[2] = 0

                trig.x = x - game.dino.pos[0];
                trig.y = game.dino.pos[1] - y;        
                arctan = Math.atan(y / x);
                game.dino.angle[1] = arctan + Math.PI / 2;

                console.log('radians to go: ' + arctan);
                console.log('degress: ' + (arctan * (180 / Math.PI)));
            }
        }
        game.dino.angle[0] = game.dino.angle[0] % (Math.PI * 2);
        console.log('end movement notes\n\n');

        // var addThis;
        // if (x <= game.dino.pos[0]) {
        //     if (y <= game.dino.pos[1]) {
        //         // quadrant 4 => add 270
        //         addThis = Math.PI * 1.5;
        //     } else {
        //         // quadrant 3 => add 180
        //         addThis = Math.PI;
        //     }
        // } else {
        //     if (y <= game.dino.pos[1]) {
        //         // quadrant 1 => add 0
        //         addThis = 0;
        //     } else {
        //         // quadrant 2 => add 90
        //         addThis = Math.PI / 2;
        //     }
        // }
        // var rad1 = Math.atan(y / x);
        // var radianFinal = rad1 + addThis;

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
        // game.dino.angle[1] = radianFinal;
    }

    function rotateDino() {
        var diff = Math.abs(game.dino.angle[0] - game.dino.angle[1]);
        // console.log(diff);
        console.log('current angle: ' + game.dino.angle[0] 
            + '\ndestination angle: ' + game.dino.angle[1]);

        // if the angle of the dino is above the Math.PI * 2, revert it 
        if (game.dino.angle[0] > (Math.PI * 2)) {
            game.dino.angle[0] -= (Math.PI * 2);
        }

        //how micro so we want these ticks
        var ticks = 64;
        if (game.dino.angle[2] === 1 && (diff > Math.PI / ticks)) {
            console.log('rotating to the RIGHT');
            // the current angle is less than what it should be
            // game.dino.angle[0] += Math.PI / ticks;
            // game.dino.angle[0] += (diff * 0.75);
            if (game.dino.angle[0] + Math.pow(diff, 0.5) * 0.25 > (Math.PI * 2)) {
                game.dino.angle[0] -= (Math.PI * 2);
                game.dino.angle[0] += Math.pow(diff, 0.75) * 0.15;
            } else {
                game.dino.angle[0] += Math.pow(diff, 0.75) * 0.15;
            }
        } else if (game.dino.angle[2] === 0 && (diff > Math.PI / ticks)) {
            console.log('rotating to the LEFT');
            // the current angle is more than what it should be
            // game.dino.angle[0] -= Math.PI / ticks;
            // game.dino.angle[0] -= (diff * 0.75);
            game.dino.angle[0] -= Math.pow(diff, 0.75) * 0.15;
        }
    }

    function startWalking() {
        game.dino.status = 0;
    }

    function stopWalking() {
        game.dino.status = 1;

        if (game.dino.angle[0] < 0) {
            //change it to be greater than 0
            var current = game.dino.angle[0];
            game.dino.angle[0] = (Math.PI * 2) + current;
        }
    }

    function keepMoving() {
        var x = Math.abs(game.dino.pos[0] - game.dino.destination[0]);
        var y = Math.abs(game.dino.pos[1] - game.dino.destination[1]);
        if (game.dino.pos[0] > game.dino.destination[0] && x > 20) {
            // game.dino.pos[0] -= (x * 0.1);
            game.dino.pos[0] -= 10;
        } else if (game.dino.pos[0] < game.dino.destination[0] && x > 20) {
            // game.dino.pos[0] += (x * 0.1);
            game.dino.pos[0] += 10;
        }

        if (game.dino.pos[1] > game.dino.destination[1] && y > 20) {
            // game.dino.pos[1] -= (y * 0.1);
            game.dino.pos[1] -= 10;
        } else if (game.dino.pos[1] < game.dino.destination[1] && y > 20) {
            // game.dino.pos[1] += (y * 0.1);
            game.dino.pos[1] += 10;
        }
    }
})();