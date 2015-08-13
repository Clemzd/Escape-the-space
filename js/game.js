"use strict";
var Game = function(game) {};

Game.prototype = {
    hasActionOccured: true,
    cutscene: false,
    timerEvents: [],

    preload: function() {},

    create: function() {
        //music = this.game.add.audio('interstellar');
        // music.play();
        // music.volume += 3.0;
        this.game.world.setBounds(0, 0, 5000, 5000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // background stars
        this.starfield = this.game.add.sprite(0, 0, 'starfield');
        //this.farback = this.game.add.tileSprite(0, 0, 'farback');
        // this.station = this.game.add.sprite(2000, this.game.height / 2, 'station');
        // this.game.physics.enable(this.station, Phaser.Physics.ARCADE);  
        //bgPlanetSunrise = this.game.add.sprite(500, 0, 'bg_planetsunrise');
        // bgSpacialAnomaly = this.game.add.sprite(1600, 300, 'bg_spacialanomaly');

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

        this.text = this.game.add.text(0, 0, "Find the way out from space! (version 1.1)", {
            font: "35px Consolas",
            fill: "#BDBDBD",
            align: "center"
        });
        this.text.fixedToCamera = true;
        this.game.time.events.loop(5 * Phaser.Timer.SECOND, this.checkEnd, this);
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

            if (this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.down.inDown) {
                this.hasActionOccured = true;
            }
        } else {
            this.ship.rotation = this.game.physics.arcade.moveToXY(this.ship, 5100, this.game.height / 2, 500);
            this.ship.animations.play('accelerate', 10, true);
        }
    },

    end: function() {
        // otherwise the event loops and end is calling back again
        this.game.time.events.removeAll();
        this.text.setText("Congrats! You made it!");
        this.cutscene = true;

        this.ship.body.collideWorldBounds = false;
        this.ship.animations.play('accelerate', 10, true);

        // rotate the ship to the right
        // this.ship.rotation = this.game.physics.arcade.moveToXY(this.ship, 200, this.station, 500);
        
    },

    render: function(){
        this.game.debug.spriteInfo(this.ship, 32, 100);
    }
}