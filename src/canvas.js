(function() {
    "use strict";

    //start the game
    game.interval = window.setInterval(update, 100);





    //////

    function update() {
        // the flashy bits

        // the pointer
        pointer.update();

        // the dino
        dino.update();

        // clean up
        canvas.clearRect(0, 0, elements.width, elements.height);

        // now draw
        draw();
    }

    function draw() {
        //draw the flashy bits

        //draw the pointer
        drawPointer();

        //draw the dino
        drawDino();
    }

    function drawDino() {
        //where do we start drawing?
        var translateX = game.dino.pos[0];
        var translateY = game.dino.pos[1];
        //how big do we draw?
        var w = (elements.dinoSize.fx * elements.multiplier);
        var h = (elements.dinoSize.fy * elements.multiplier);
        //where are we cutting from the dino image
        var sx = game.dino.tick * elements.dinoSize.fx;
        var sy = game.dino.status * elements.dinoSize.fy;


        canvas.translate(translateX, translateY);
        // canvas.translate(elements.dinoSize.fx * elements.multiplier / 2, 0);
        canvas.rotate(game.dino.angle[0]);

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        canvas.drawImage(elements.dino, sx, sy, elements.dinoSize.fx, elements.dinoSize.fy, 0, 0, w, h);
        
        // mid and left side lines
        // canvas.strokeStyle = '#fff';
        // canvas.beginPath();
        // canvas.arc(0, 0, elements.dinoSize.fx * elements.multiplier / 2, 0, Math.PI * 2);
        // canvas.moveTo(elements.dinoSize.fx * elements.multiplier / 2, 0);
        // canvas.lineTo(elements.dinoSize.fx * elements.multiplier / 2, elements.dinoSize.fy * elements.multiplier);
        // canvas.moveTo(0, 0);
        // canvas.lineTo(0, elements.dinoSize.fy * elements.multiplier);
        // canvas.stroke();

        // put it all back
        canvas.rotate(-(game.dino.angle[0]));
        canvas.translate(-(translateX), -(translateY));
        
        //tangent line
        // canvas.moveTo(tangentPoints[0], tangentPoints[1]);
        // canvas.lineTo(game.dino.destination[0], game.dino.destination[1]);
        // canvas.stroke();
    }


    function drawPointer() {
        var x, y, multiplier = 10 * elements.multiplier;
        for (var i = 0; i < game.pointer.length; i++) {
            var p = game.pointer[i];

            if (p.active) {
                x = p.coordinates[0];
                y = p.coordinates[1];

                // for each step in the tick we're at
                var steps = pointer.steps[p.tick];
                for (var j = 0; j < steps.length; j++) {
                    if (steps[j][2] === 'other') {
                        canvas.fillStyle = 'tomato';
                        canvas.strokeStyle = 'tomato';
                    } else {
                        canvas.fillStyle = 'white';
                        canvas.strokeStyle = 'white';
                    }
                    canvas.beginPath();
                    canvas.arc(x, y, steps[j][1] * multiplier, 0, Math.PI * 2);

                    if (steps[j][0] === 'fill') {
                        canvas.fill();
                    } else {
                        canvas.stroke();
                    }
                    canvas.closePath();
                    
                }

                
            }
        }

    }

    function drawFlashies() {

    }
        
})();