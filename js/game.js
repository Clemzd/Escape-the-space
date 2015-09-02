"use strict";
var Game = function(game) {};

Game.prototype = {
    hasActionOccured: true,
    cutscene: false,
    timerEvents: [],
    tween: null,

    preload: function() {},

    create: function() {
        //  This will run in Canvas mode, so let's gain a little speed and display
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;

        //  We need arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // background star
        this.game.world.setBounds(0, 0, 1000, 600);
        this.game.add.tileSprite(0, 0, 1000, 600, 'starfield');


        //music = this.game.add.audio('interstellar');
        // music.play();
        // music.volume += 3.0;


        // background stars
        this.station = this.game.add.sprite(0, this.game.height / 2, 'station');
        this.game.physics.enable(this.station, Phaser.Physics.ARCADE);

        // ship
        this.ship = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'ship');
        this.ship.animations.add('accelerate', [1, 2, 3, 4]);
        this.ship.animations.add('stop', [0]);
        this.ship.anchor.set(0.5);
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.maxVelocity.set(5000);
        this.ship.body.collideWorldBounds = true;

        // camera
        this.game.camera.follow(this.ship);

        // Game input
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.text = this.game.add.text(0, 0, "Find the way out from space!", {
            font: "35px Consolas",
            fill: "#BDBDBD",
            align: "center"
        });
        this.text.fixedToCamera = true;
        this.game.time.events.loop(1 * Phaser.Timer.SECOND, this.checkEnd, this);
        // this.game.height / 2, y:
        // game.add.tween(sprites.cursor).to( { y: 500 }, 2000, Phaser.Easing.Bounce.Out, true);
    },

    checkEnd: function() {
        if (this.hasActionOccured) {
            this.hasActionOccured = false; // resetting the variable
        } else {
            this.end();
        }
    },

    update: function() {
        if (!this.cutscene) {

            // input to move the ship
            if (this.cursors.up.isDown) {
                this.game.physics.arcade.accelerationFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
                this.ship.animations.play('accelerate', 10, true);
            } else {
                // stopper the acceleration 
                this.ship.body.acceleration.set(0);
                this.ship.animations.play('stop', true);
            }

            if (this.cursors.left.isDown) {
                this.ship.body.angularVelocity = -300;
            } else if (this.cursors.right.isDown) {
                this.ship.body.angularVelocity = 300;
            } else {
                // stop the rotation
                this.ship.body.angularVelocity = 0;
            }

            if (this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.down.isDown) {
                this.hasActionOccured = true;
            }
        } else {
            if (!this.tween.isRunning) {
                this.game.state.start('Game');
            }
        }
    },

    end: function() {
        // otherwise the event loops and end is calling back again
        this.game.time.events.removeAll();

        // informer l'utilisateur de la fin
        this.text.setText("Congrats! You made it!");

        // lancer l'animation
        this.cutscene = true;

        // lancer l'animation pour les réacteurs
        this.ship.animations.play('accelerate', 10, true);

        // mettre le vaisseau vers la droite
        this.ship.rotation = this.game.physics.arcade.moveToXY(this.ship, 200, this.station, 500);
        this.tween = this.game.add.tween(this.ship);

        // bouger le vaisseau vers la droite
        this.tween.to({
            x: 2000
        }, 4000, Phaser.Easing.Linear.None, true);
    },

    render: function() {
        //this.game.debug.spriteInfo(this.ship, 32, 100);
    }
};