var Preloader = function(game) {};

Preloader.prototype = {
    preload: function() {
        this.game.load.image('starfield', 'assets/starfield.png');
        this.game.load.spritesheet('ship', 'assets/ship.png', 64, 29);
        this.game.load.spritesheet('station', 'assets/station.png', 400, 400);
        this.game.load.audio('interstellar', 'music/interstellar.mp3');
    },

    create: function() {
        text = this.game.add.text(0, 0, "Loading...", {
            font: "65px Consolas",
            fill: "#BDBDBD",
            align: "center"
        });
        console.log('loading...');
        this.game.state.start('Game');
    },

    update: function() {

    }
}