"use strict";
var Level2 = function(game) {};

Level2.prototype = {
    hasActionOccured: true,
    cutscene: false,
    tween: null,

    preload: function() {},

    create: function() {
        //  This will run in Canvas mode, so let's gain a little speed and display
        this.game.renderer.clearBeforeRender = false;
        this.game.renderer.roundPixels = true;

        //  We need arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // background stars
        this.game.world.setBounds(0, 0, 3000, 1500);
        this.game.add.tileSprite(0, 0, 3000, 1500, 'starfield');

        // black hole
        this.blackhole = this.game.add.sprite(2000, 300, 'blackhole');
        this.blackhole.alpha = 0.2;
        this.game.physics.enable(this.blackhole, Phaser.Physics.ARCADE);
        this.blackhole.body.setSize(50, 50, 100, 100);
        this.blackhole.body.collideWorldBounds = true;
        this.blackhole.body.immovable = true;

        // station
        this.station = this.game.add.sprite(1000, this.game.height / 2, 'station');
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

        this.text = this.game.add.text(10, 0, "Find the way out from space! LVL2", {
            font: "35px Arial",
            fill: "#BDBDBD",
            align: "center"
        });
        this.text.fixedToCamera = true;
    },

   update: function() {
        // check collision between the ship and the black hole
        this.game.physics.arcade.collide(this.ship, this.blackhole, this.collisionHandler, null, this);

        if (!this.cutscene) {

            // input to move the ship
            if (this.cursors.up.isDown)
            {
                this.game.physics.arcade.accelerationFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
                this.ship.animations.play('accelerate', 10, true);
            }
            else
            {
                // stopper the acceleration 
                this.ship.body.acceleration.set(0);
                this.ship.animations.play('stop', true);
            }

            if (this.cursors.left.isDown)
            {
                this.ship.body.angularVelocity = -300;
            }
            else if (this.cursors.right.isDown)
            {
                this.ship.body.angularVelocity = 300;
            }
            else
            {
                // stop the rotation
                this.ship.body.angularVelocity = 0;
            }

            if (this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.down.isDown)
            {
                this.hasActionOccured = true;
            }
        }
        else
        {
            if (!this.tween.isRunning)
            {
                // start the next level
                this.game.state.start('Soon');
            }
        }
    },

    collisionHandler: function(ship, blackhole) {
         // informer l'utilisateur de la fin
       this.text.setText("Congrats! You made it!");

        // lancer l'animation
        this.cutscene = true;

        this.tween = this.game.add.tween(this.ship);
        this.tween.to({
            angle: '+900',
            alpha: 0
        }, 3000, Phaser.Easing.Linear.None, true);
    },

   render: function() {
        //this.game.debug.spriteInfo(this.ship, 32, 100);
        // this.game.debug.body(this.blackhole);
    }
};