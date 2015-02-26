(function() {
    "use strict"

    elements.canvas.width = window.innerWidth;
    elements.canvas.height = window.innerHeight;

    // elements.dino.src = 'assets/dinosaur.png';
    elements.dino.src = 'assets/gom.png';
    elements.dino.addEventListener('load', allLoaded, false);

    //////

    function allLoaded() {
        console.log('all loaded');
        game.ready = true;
    }

})();