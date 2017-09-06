import Bullets from './Bullets';

export default class ShotgunEnemy extends Phaser.Group{

    constructor(State) {

        super(State);

        let shotgunEnemiesTotal = State.player.playerLevel * 10;
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        for (let i = 0; i < shotgunEnemiesTotal; i++) {
            let spawn = this.chooseSpawn(this);
            let randomX = Math.random() * 300;
            let randomY = Math.random() * 300;
            let shotgunEnemy = this.create(spawn.x + randomX, spawn.y + randomY, 'shotgun-enemy');
            shotgunEnemy.animations.add('shoot', [7, 15, 23], 7, true);
            shotgunEnemy.animations.add('move', [0, 4, 5, 6, 12, 13, 14, 19, 20, 21, 22], 0, true);
            shotgunEnemy.animations.add('idle', [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18], 0, true);
            shotgunEnemy.play('idle');
            shotgunEnemy.anchor.setTo(0.5, 0.5);
            game.physics.enable(shotgunEnemy, Phaser.Physics.ARCADE);
            shotgunEnemy.body.immovable = false;
            shotgunEnemy.body.collideWorldBounds = true;
            shotgunEnemy.body.allowGravity = true;
            shotgunEnemy.scale.setTo(0.3);
            shotgunEnemy.body.velocity.x = 0;
            shotgunEnemy.body.velocity.y = 0;
            shotgunEnemy.health = 100;

            this.shootTime = 0;

            this.bullets = new Bullets(.5, 0xff0000, 100);

        }
    }

    updateShotgunEnemies(State){

        this.shotgunEnemyColliders(State);
        this.shotgunEnemyOverlap(State);
        this.shotgunEnemyBulletColliders(State);
        this.shotgunEnemyAttackMovement(State);

    }

    shotgunEnemyColliders(State){

        State.game.physics.arcade.collide(State.shotgunEnemies, State.map.collisionLayer);
        State.game.physics.arcade.collide(State.shotgunEnemies, State.shotgunEnemies);

    }

    shotgunEnemyOverlap(State){

        State.game.physics.arcade.overlap(State.shotgunEnemies, State.player, this.meleePlayer, null, State);

    }

    shotgunEnemyBulletColliders(State){

        State.game.physics.arcade.collide(State.shotgunEnemies.bullets, State.map.collisionLayer, function(bullet){bullet.kill();});

    }

    meleePlayer () {
        game.camera.shake(0.005, 500);
        State.player.damage(1);
    };

    shotgunEnemyShot (bullet, shotgunEnemy) {
        shotgunEnemy.damage(20);
        bullet.kill();
    };

    shotgunEnemyAttackMovement (State) {
        State.shotgunEnemies.body.collideWorldBounds = true;
        State.shotgunEnemies.body.velocity.x = 0;
        State.shotgunEnemies.body.velocity.y = 0;
        State.shotgunEnemies.rotation = game.physics.arcade.angleToXY(State.shotgunEnemies, State.player.x, State.player.y);
        this.shootPlayer(State, State.shotgunEnemies);
    };

    chooseSpawn (spawnPoints) {
        return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    };

    shootPlayer(State, shotgunEnemy) {
        if (
            (State.player.alive && game.physics.arcade.distanceBetween(State.player, shotgunEnemy) > 30) &&
            (State.player.alive && game.physics.arcade.distanceBetween(State.player, shotgunEnemy) < 600)
        ) {
            game.physics.arcade.moveToObject(shotgunEnemy, State.player, 150);
            shotgunEnemy.animations.play('move');
        }
        if (State.player.alive && game.physics.arcade.distanceBetween(State.player, shotgunEnemy) <= 400) {
            shotgunEnemy.animations.play('shoot');
            this.fireBullets(shotgunEnemy, State.player, State);
        }
        else {
            shotgunEnemy.animations.play('idle');
        }
    };

    fireBullets (shotgunEnemy, player, State) {
        if (game.time.now > State.shotgunEnemies.shootTime) {
            let bullet = State.shotgunEnemies.Bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(shotgunEnemy.x, shotgunEnemy.y + 8);
                bullet.body.velocity.x = 100;
                State.shotgunEnemies.shootTime = game.time.now + 200;
                bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 500);
                bullet.lifespan = 1000;
            }
        }
    };

};
