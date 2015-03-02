(function() {
    'use strict';

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
        dino.setTurn(x, y);
        dino.walk();


        // add this to the pointer collection
        // because we're letting people know they clicked
        var pointer = new Pointer(x, y);
        game.pointer.push(pointer);
    }
})();