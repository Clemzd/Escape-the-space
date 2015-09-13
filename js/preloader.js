var Preloader = function(game) {};

Preloader.prototype = {
    preload: function() {
        this.game.load.image('starfield', 'assets/starfield.png');
        this.game.load.spritesheet('ship', 'assets/ship.png', 64, 29);
        this.game.load.spritesheet('station', 'assets/station.png', 400, 400);
        this.game.load.spritesheet('blackhole', 'assets/blackhole.png', 256, 256);
        
    },

    create: function() {
        // a message during loading of all the assets
        text = this.game.add.text(0, 0, "Loading...", {
            font: "65px Consolas",
            fill: "#BDBDBD",
            align: "center"
        });
        
        
        // start the game
        this.game.state.start('Level1');
    },

    update: function() {

    }
};