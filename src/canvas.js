(function() {
    "use strict"

    //start the game
    game.interval = window.setInterval(update, 100);





    //////

    function update() {
        // the flashy bits

        // the pointer

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

        // console.log(game.dino.pos[0] + ' ' + game.dino.pos[1] + ' ' + w + ' ' + h);
        // console.log(translateX + ' ' + translateY);

        canvas.translate(translateX, translateY);
        // canvas.translate(elements.dinoSize.fx * elements.multiplier / 2, 0);
        // if (game.dino.angle[2]) {
            canvas.rotate(game.dino.angle[0]);
        // } else {
        //     canvas.rotate(-(game.dino.angle[0]));
        // }

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        canvas.drawImage(elements.dino, sx, sy, elements.dinoSize.fx, elements.dinoSize.fy, 0, 0, w, h);
        canvas.strokeStyle = '#fff';
        canvas.beginPath();
        canvas.moveTo(elements.dinoSize.fx * elements.multiplier / 2, 0);
        canvas.lineTo(elements.dinoSize.fx * elements.multiplier / 2, elements.dinoSize.fy * elements.multiplier);
        canvas.moveTo(0, 0);
        canvas.lineTo(0, elements.dinoSize.fy * elements.multiplier);
        canvas.stroke();

        // put it all back
        // if (game.dino.angle[2]) {
            canvas.rotate(-(game.dino.angle[0]));
        // } else {
        //     canvas.rotate(game.dino.angle[0]);
        // }
        // canvas.translate(-(elements.dinoSize.fx * elements.multiplier / 2), 0);
        canvas.translate(-(translateX), -(translateY));
    }

    function drawPointer() {

    }

    function drawFlashies() {

    }
        
})();