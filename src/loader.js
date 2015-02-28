(function() {
    "use strict"

    // set our sizes for the two elements on screen
    elements.canvas.width = window.innerWidth;
    elements.canvas.height = window.innerHeight - 40;

    // start loading our game assets
    // elements.dino.src = 'assets/dinosaur.png';
    elements.dino.src = 'assets/dino_spritesheet.png';
    elements.dino.addEventListener('load', allLoaded, false);

    //this will detect the ratio/size multiplier for the game
    detectSize();




    //////

    function allLoaded() {
        console.log('all loaded');
        game.ready = true;

        elements.dino.removeEventListener('load', allLoaded);
    }

    function detectSize() {
        if (elements.width > 1200) {
            elements.multiplier = 1.5;
        } else if (elements.width > 1000 && elements.width <= 1200) {
            elements.multiplier = 1;
        } else if (elements.width > 800 && elements.width <= 1000) {
            elements.multiplier = 0.75;
        } else {
            elements.multiplier = 0.5;
        }

        // properly set the dinosaur starting position
        game.dino.pos[0] = (elements.width / 2) - (elements.dinoSize.fx * elements.multiplier / 2);
    }

})();