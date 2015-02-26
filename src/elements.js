(function() {
    "use strict"    

    window.elements = {
        // dom elements
        container: document.getElementsByClassName('game-container')[0],
        canvas: document.getElementById('game'),

        // images and assets
        dino: document.createElement('img'),

        // data storage
        width: window.innerWidth,
        height: window.innerHeight
    };

    window.game = {
        ready: ready: false,
        interval: null,
        running: false,
        timeStart: null,
        timeEnd: null,

        score: 0,
        highscore: 0,

        things: [],
        dino: {
            
        }
    };
})();