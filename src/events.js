(function() {
    'use strict'

    /* this handles events like clicking and touching */
    elements.canvas.addEventListener('touchstart', handleTouch, false);
    elements.canvas.addEventListener('click', handleClick, false);





    //////

    function handleTouch(e) {
        // where is it?
        // console.log(e.changedTouches[0]);
        var x = e.changedTouches[0].clientX;
        var y = e.changedTouches[0].clientY;
        // console.log(x + ' ' + y);

        makeThingsHappen(x, y);
    }

    function handleClick(event) {
        // where is it?
        // console.log(event);
        var x = event.clientX;
        var y = event.clientY;

        makeThingsHappen(x, y);   

        // stop a touch event from firing
        event.stopPropagation();
    }

    function makeThingsHappen(x, y) {
        // this is the destination of the dinosaur
        // make it so!
        game.dino.destination = [x, y];
        dino.walk();

        // calculate the angle the dino should get to
        var addThis;
        if (x <= game.dino.pos[0]) {
            if (y <= game.dino.pos[1]) {
                // quadrant 4 => add 270
                addThis = 270;
            } else {
                // quadrant 3 => add 180
                addThis = 180;
            }
        } else {
            if (y <= game.dino.pos[1]) {
                // quadrant 1 => add 0
                addThis = 0;
            } else {
                // quadrant 2 => add 90
                addThis = 90;
            }
        }
        var rad1 = Math.atan(y / x);
        var rad2 = addThis * (Math.PI / 180);
        var radianFinal = rad1 + rad2;

        game.dino.angle[0] = radianFinal;
        game.dino.angle[1] = radianFinal;

        // add this to the pointer collection
        // because we're letting people know they clicked
    }
})();