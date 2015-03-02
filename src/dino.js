(function() {
    'use strict';

    window.dino = {
        update: updateInfo,
        setTurn: setTurn,
        rotate: rotateDino,
        compass: determineDirection,
        walk: startWalking,
        wait: stopWalking,
        move: keepMoving
    };






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
            var alteredDino = determineAlteredCoordinates();

            var dist_x = Math.abs(alteredDino.x - game.dino.destination[0]);
            var dist_y = Math.abs(alteredDino.y - game.dino.destination[1]);

            if (dist_x < 30 && dist_y < 30) {
                // yes!
                this.wait();
            } else {
                // nope, still gotsta move it
                var canMove = this.rotate();
                if (canMove) {
                    this.move();
                }
            }
        }

    }

    // calculate the angle the dino should get to
    function setTurn(x, y) {
        var tangent = {}, distance = {}, alpha, beta, radius;
        // what direction are we facing?
        var direction = this.compass();
        // what direction should we go?
        //    this alters game.dino.angle[2] = 0 left || 1 right
        //                game.dino.angle[3] = 0 null || 1 turn around
        determineDirectionToTake(x, y, direction);

        // now we need to determine the tangent and it's angle
        // http://jsfiddle.net/zxqCw/101/
        distance.x = Math.abs(game.dino.pos[0] - x);
        distance.y = Math.abs(game.dino.pos[1] - y);
        distance.hypotenus = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
        radius = elements.dinoSize.fx * elements.multiplier / 2;
        alpha = Math.asin(radius / distance.hypotenus);
        beta = Math.atan(distance.y / distance.x);


        if (game.dino.angle[2]) {
            // we'll be turning right
            tangent = beta + alpha;
        } else {
            // we'll be turning left
            tangent = beta - alpha;
        }

        // are we turning all the way around?
        if (game.dino.angle[3]) {

        } else {
            //we're not turning all the way around
            if (game.dino.angle[2]) {
                // right
                game.dino.angle[1] = Math.PI / 2 - tangent;
                if (game.dino.angle[1] < 0 && game.dino.angle[0] > Math.PI) {
                    game.dino.angle[0] = -(Math.PI * 2 - game.dino.angle[0]);
                }
            } else {
                // left
                game.dino.angle[1] = -(Math.PI/ 2 - tangent);
                if (game.dino.angle[1] < 0 && game.dino.angle[0] > 0) {
                    // game.dino.angle[0] = Math.PI * 2 - game.dino.angle[0];
                    game.dino.angle[1] = Math.PI * 2 + game.dino.angle[1]
                }
            }
        }

            // game.dino.angle[1] = -(tangent.angle) + (Math.PI / 2);


        var coordinates = {
            origin_x: game.dino.pos[0],
            origin_y: game.dino.pos[1],
            destination_x: x,
            destination_y: y
        };
        console.log(JSON.stringify(coordinates));
        console.log(distance);
        console.log('tangent: ' + tangent);
        console.log('alpha: ' + alpha);
        console.log('beta: ' + beta);
        console.log('end movement notes\n\n');
    }

    function rotateDino() {
        var diff = Math.abs(game.dino.angle[0] - game.dino.angle[1]);
        var increment = Math.pow(diff, 0.5) * 0.25;
        console.log('current angle: ' + game.dino.angle[0] + '\ndestination angle: ' + game.dino.angle[1]);
        
        // if the angle of the dino is above the Math.PI * 2, revert it 
        if (game.dino.angle[0] > (Math.PI * 2)) {
            game.dino.angle[0] -= (Math.PI * 2);
        }

        //how micro so we want these ticks
        var ticks = 16;
        var canMove = true;
        if (game.dino.angle[2] === 1 && (diff > Math.PI / ticks)) {
            console.log('rotating to the RIGHT');
            // the current angle is less than what it should be
            if (game.dino.angle[0] + increment > (Math.PI * 2)) {
                game.dino.angle[0] -= (Math.PI * 2);
                game.dino.angle[0] += increment;
            } else {
                game.dino.angle[0] += increment;
            }
            canMove = false;
        } else if (game.dino.angle[2] === 0 && (diff > Math.PI / ticks)) {
            console.log('rotating to the LEFT');
            // the current angle is more than what it should be
            // game.dino.angle[0] -= Math.PI / ticks;
            // game.dino.angle[0] -= (diff * 0.75);
            if (game.dino.angle[0] - increment < 0) {
                game.dino.angle[0] = (Math.PI * 2) + (game.dino.angle[0] - increment);
                game.dino.angle[0] -= increment;
            } else {
                game.dino.angle[0] -= increment;
            }
            canMove = false;
        }

        return canMove;
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
            console.log('changed the dino angle');
        } else if (game.dino.angle[0] > Math.PI * 2) {
            var current = game.dino.angle[0];
            game.dino.angle[0] = (Math.PI * 2) % current;
            console.log('changed the dino angle, but you have issues. It was too high.');
        }
    }

    function keepMoving() {
        var alteredDino = determineAlteredCoordinates();

        var x = Math.abs(alteredDino.x - game.dino.destination[0]);
        var y = Math.abs(alteredDino.y - game.dino.destination[1]);
        if (alteredDino.x > game.dino.destination[0] && x > 20) {
            game.dino.pos[0] -= (x * 0.1);
            // game.dino.pos[0] -= 10;
        } else if (alteredDino.x < game.dino.destination[0] && x > 20) {
            game.dino.pos[0] += (x * 0.1);
            // game.dino.pos[0] += 10;
        }

        if (alteredDino.y > game.dino.destination[1] && y > 20) {
            game.dino.pos[1] -= (y * 0.1);
            // game.dino.pos[1] -= 10;
        } else if (alteredDino.y < game.dino.destination[1] && y > 20) {
            game.dino.pos[1] += (y * 0.1);
            // game.dino.pos[1] += 10;
        }
    }

    ////// utilities

    function determineDirection() {
        var direction = ['up', null];

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

        return direction;
    }

    function determineDirectionToTake(x, y, direction) {
        // determine the direction to take (left or right)
        if (y <= game.dino.pos[1] && direction[0] === 'up') {
            console.log("dino goes forward up");
            game.dino.angle[3] = 0;
            if (x <= game.dino.pos[0] /*&& direction[1] !== 'left'*/) {
                console.log("dino goes left");
                game.dino.angle[2] = 0;
            } else {
                console.log("dino goes right");
                game.dino.angle[2] = 1;
            }
        } else if (y > game.dino.pos[1] && direction[0] === 'up') {
            console.log("dino turns around to face down");
            game.dino.angle[3] = 1;
            if (x <= game.dino.pos[0] && direction[1] !== 'left') {
                console.log("dino goes left");
                game.dino.angle[2] = 0;
            } else {
                console.log("dino goes right");
                game.dino.angle[2] = 1;
            }
        } else if (y <= game.dino.pos[1] && direction[0] === 'down') {
            console.log("dino turns around to face up");
            game.dino.angle[3] = 1;
            if (x <= game.dino.pos[0] && direction[1] !== 'right') {
                console.log("dino goes right");
                game.dino.angle[2] = 1;
            } else {
                console.log("dino goes left");
                game.dino.angle[2] = 0;
            }
        } else if (y > game.dino.pos[1] && direction[0] === 'down') {
            console.log("dino goes forward down");
            game.dino.angle[3] = 0;
            if (x <= game.dino.pos[0] && direction[1] !== 'right') {
                console.log("dino goes right");
                game.dino.angle[2] = 1;
            } else {
                console.log("dino goes left");
                game.dino.angle[2] = 0;
            }
        }
    }

    function determineAlteredCoordinates() {
        var alteredDino = {};
        if (game.dino.angle[2]) {
            // going right
            alteredDino.x = game.dino.pos[0] + elements.dinoSize.fx * elements.multiplier / 2;
            alteredDino.y = game.dino.pos[1] + 150 * elements.multiplier;
        } else {
            // going left
            alteredDino.x = game.dino.pos[0] + elements.dinoSize.fx * elements.multiplier / 2;
            alteredDino.y = game.dino.pos[1];
        }

        return alteredDino;
    }
})();