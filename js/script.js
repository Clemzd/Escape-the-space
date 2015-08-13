// constants 
var width = window.innerWidth - 20;
var height = window.innerHeight - 20;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    end: end
});
var text;

function preload() {
    game.load.image('starfield', 'assets/starfield.png');
    game.load.image('farback', 'assets/farback.gif');
    
    //game.load.image('bg_galaxy', 'assets/bg_galaxy.png');
    // game.load.image('bg_planetsunrise', 'assets/bg_planetsunrise.png');
    // game.load.image('bg_spacialanomaly', 'assets/bg_spacialanomaly.png');

    game.load.spritesheet('ship', 'assets/ship.png', 64, 29);
    
}

function create() {
    //music = game.add.audio('interstellar');
    // music.play();
    // music.volume += 3.0;
    game.world.setBounds(0, 0, 10000, 10000);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // background stars
    starfield = game.add.tileSprite(0, 0, 10000, 10000, 'starfield');
    farback = game.add.tileSprite(0, 0, 'farback');
    //bgPlanetSunrise = game.add.sprite(500, 0, 'bg_planetsunrise');
    // bgSpacialAnomaly = game.add.sprite(1600, 300, 'bg_spacialanomaly');

    // spacedust.fixedToCamera = true;
    // bgGalaxy.fixedToCamera = true;
    // bgPlanetSunrise.fixedToCamera = true;
    // bgSpacialAnomaly.fixedToCamera = true;

    // ship
    ship = game.add.sprite(game.width / 2, game.height / 2, 'ship');
    ship.animations.add('accelerate', [1, 2, 3, 4]);
    ship.animations.add('stop', [0]);
    ship.anchor.set(0.5);
    game.physics.enable(ship, Phaser.Physics.ARCADE);
    ship.body.maxVelocity.set(400);
    ship.rotation = -(Math.PI / 2);
    ship.body.collideWorldBounds = true;

    // camera
    game.camera.follow(ship);

    // Game input
    cursors = game.input.keyboard.createCursorKeys();

    text = game.add.text(0, 0, "Find the way out", {
        font: "65px Consolas",
        fill: "#BDBDBD",
        align: "center"
    });
    text.fixedToCamera = true;

}

var timeBeginning = new Date().getTime();

function update() {
    // input to move the ship
    if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(ship.rotation, 200, ship.body.acceleration);
        ship.animations.play('accelerate', 10, true);
    } else {
        // stopper the acceleration 
        ship.body.acceleration.set(0);
        ship.animations.play('stop', true);
    }

    if (cursors.left.isDown) {
        ship.body.angularVelocity = -300;
    } else if (cursors.right.isDown) {
        ship.body.angularVelocity = 300;
    } else {
        // stop the rotation
        ship.body.angularVelocity = 0;
    }

    if (!cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown) {
        if (new Date().getTime() - timeBeginning > 5000) {
            end();
        }
    } else {
        timeBeginning = new Date().getTime();
    }
}

function end() {
    ship.animations.play('accelerate', 10, true);   
    ship.body.collideWorldBounds = false;
    ship.rotation = 2 * Math.PI;
    ship.body.maxVelocity.set(1000);
    game.physics.arcade.accelerationFromRotation(2 * Math.PI, 500, ship.body.acceleration);
    text.setText("Congrats! You made it!");
    setTimeout(
        function() {
            game.gamePaused();
        },
        8000
    )
}