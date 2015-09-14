"use strict";
var Soon = function(game) {};

Soon.prototype = {

    preload: function() {},

    create: function() {
        //  This will run in Canvas mode, so let's gain a little speed and display
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;

        // text
        this.text = this.game.add.text(10, 330, "Escape the space", {
            font: "55px Arial",
            fill: "#BDBDBD",
            align: "center"
        });

        this.text = this.game.add.text(10, 400, "New levels are coming soon...", {
            font: "35px Arial",
            fill: "#BDBDBD",
            align: "center"
        });

        // background stars
        this.game.world.setBounds(0, 0, 3000, 1500);
        this.game.add.tileSprite(0, 0, 3000, 1500, 'starfield');

        //ship 
        this.ship = this.game.add.sprite(this.game.width / 2 + 100, this.game.height / 2, 'ship');
        this.ship.animations.add('accelerate', [1, 2, 3, 4]);
        this.ship.anchor.set(0.5);
        this.ship.scale.setTo(1.2, 1.2);
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.maxVelocity.set(5000);
        this.ship.body.collideWorldBounds = true;
    },

    update: function() {
         this.ship.animations.play('accelerate', 10, true);
    }
};