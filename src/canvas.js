(function() {
    "use strict"

    //start the game
    game.interval = window.setInterval(update, 1000);





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
        canvas.fillStyle = (game.dino.status) ? "#8CC63E" : "#f1f1f1";

        var w = (elements.dinoSize.fx * elements.multiplier);
        var h = (elements.dinoSize.fy * elements.multiplier);
        // console.log(game.dino.pos[0] + ' ' + game.dino.pos[1] + ' ' + w + ' ' + h);

        var translateX = game.dino.pos[0];
        var translateY = game.dino.pos[1];

        console.log( translateX + ' ' + translateY);

        canvas.translate(translateX, translateY);
        canvas.rotate(game.dino.angle[0]);
        canvas.fillRect(0, 0, w, h);

        // put it all back
        canvas.rotate(-game.dino.angle[0]);
        canvas.translate(-(translateX), -(translateY));
    }

    function drawPointer() {

    }

    function drawFlashies() {

    }
        
})();