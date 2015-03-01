(function() {
    "use strict"    

    window.elements = {
        // dom elements
        container: document.getElementsByClassName('game-container')[0],
        canvas: document.getElementById('game'),
        infoContainer: document.getElementsByClassName('points')[0],

        // images and assets
        dino: document.createElement('img'),
        dinoSize: {
            fx: 2417 / 8, fy: 1208 / 2,
            px: 2417, py: 1208 
        },

        // data storage
        width: window.innerWidth,
        height: window.innerHeight,
        multiplier: 1,
    };

    window.canvas = elements.canvas.getContext('2d');

    window.game = {
        ready: false,
        interval: null,
        running: false,
        timeStart: null,
        timeEnd: null,

        score: 0,
        highscore: 0,

        things: [],
        pointer: [],
        dino: {
            status: 1,
            tick: 0,
            // angle => current, intended, direction
            angle: [0, 0, 0],
            pos: [elements.width / 2, elements.height / 2],
            destination: [null, null]
        }
    };
})();