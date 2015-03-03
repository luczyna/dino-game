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

    window.tangentPoints = [0,0];
    
    // calculate the angle the dino should get to
    function setTurn(x, y) {
        var tangent = {}, distance = {}, alpha, beta, radius;
        
        // we need to determine the tangent and it's angle
        // http://jsfiddle.net/zxqCw/101/
        distance.x = Math.abs(game.dino.pos[0] - x);
        distance.y = Math.abs(game.dino.pos[1] - y);
        distance.hypotenus = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
        radius = elements.dinoSize.fx * elements.multiplier / 2;
        alpha = Math.asin(radius / distance.hypotenus);
        beta = Math.atan(distance.y / distance.x);

        // what direction should we go?
        // and what angle should we get to?
        tangent = this.compass(alpha, beta, x, y, radius);
        game.dino.angle[1] = tangent;
        
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
        console.log('current angle: ' + game.dino.angle[0] + '\ndestination angle: ' + game.dino.angle[1]);
        
        // if the angle of the dino is above the Math.PI * 2, revert it 
        if (game.dino.angle[0] > (Math.PI * 2)) {
            game.dino.angle[0] -= (Math.PI * 2);
        }

        //how micro so we want these ticks
        var ticks = 32;
        var increment = Math.PI / ticks * 4;
        var canMove = true;
        if (true) {
            game.dino.angle[0] = game.dino.angle[1]
            canMove = true;
        } else if (game.dino.angle[2] === 1 && (diff > Math.PI / ticks)) {
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

    function determineDirection(alpha, beta, x, y, radius) {
        // are we going to go left 0 or right 1
        // we need to compare these to our current angle
        var current = game.dino.angle[0];

        var ifLeft = beta - alpha;
        var ifRight = beta + alpha;

        // which quadrant (in relation to dino) is the destination in?
        // we need to take it's angle into account
        var quadrant;
        if (game.dino.pos[0] <= x) {
            // right side
            quadrant = (game.dino.pos[1] >= y) ? -Math.PI / 2 : Math.PI / 2;
        } else {
            //left side
            quadrant = (game.dino.pos[1] >= y) ? Math.PI * 1.5 : -Math.PI * 1.5;
        }

        console.log('quadrant: ' + quadrant);

        var testLeft = Math.abs(ifLeft + quadrant);
        var testRight = Math.abs(ifRight + quadrant);

        // what is the distance to rotate?
        var distanceLeft = Math.abs(testLeft - current);
        var distanceRight = Math.abs(testRight - current);

        if (distanceLeft > distanceRight) {
            // we'll be turning right
            game.dino.angle[2] = 0;
            // tangent = beta + alpha;
            tangentPoints[0] = game.dino.pos[0] + radius * Math.sin(ifLeft);
            tangentPoints[1] = game.dino.pos[1] + radius * -Math.cos(ifLeft);

            return testRight;
        } else {
            // we'll be turning left
            game.dino.angle[2] = 0;
            // tangent = beta - alpha;
            tangentPoints[0] = game.dino.pos[0] + radius * -Math.sin(ifRight);
            tangentPoints[1] = game.dino.pos[1] + radius * Math.cos(ifRight);

            return testLeft
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