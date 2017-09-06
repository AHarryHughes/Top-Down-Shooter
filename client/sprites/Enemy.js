
export default class Enemy extends Phaser.Group{

    constructor(State){

        super(State);

        let enemiesTotal = State.player.playerLevel * 15;
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        for (let i = 0; i < enemiesTotal; i++) {
            let spawn = this.chooseSpawn(State.spawnPoints);
            let randomX = Math.random() * 300;
            let randomY = Math.random() * 300;
            let enemy = this.create(spawn.x + randomX, spawn.y + randomY, 'flashlight-enemy');
            enemy.animations.add('melee', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, true);
            enemy.animations.add('move', [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 46, true);
            enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14, true);
            enemy.play('idle');
            enemy.anchor.setTo(0.5, 0.5);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.immovable = true;
            enemy.body.collideWorldBounds = true;
            enemy.body.allowGravity = true;
            enemy.scale.setTo(0.3);
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y = 0;
            enemy.health = 100;
        }

    }

    chooseSpawn (spawnPoints) {
        return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    };

    updateEnemies(State){

        this.enemyColliders(State);
        this.enemyOverlap(State);
        this.enemyMovementAttack(State);

    }

    enemyColliders(State){

        State.game.physics.arcade.collide(State.enemies, State.map.collisionLayer);
        State.game.physics.arcade.collide(State.enemies, State.enemies);
        State.game.physics.arcade.collide(State.enemies, State.shotgunEnemies);

    }

    enemyOverlap(State){

        State.game.physics.arcade.overlap(State.enemies, State.player, this.meleePlayer, null, State);
        State.game.physics.arcade.overlap(State.enemies, State.mercs, this.meleeMerc, null, State);

    }

    enemyShot (bullet, enemy) {
        enemy.damage(20);
        bullet.kill();
    };

    meleePlayer () {
        game.camera.shake(0.005, 500);
        State.player.damage(1);
    };

    meleeMerc (merc, bullet) {
        game.camera.shake(0.005, 500);
        merc.damage(1);
    };

    enemyMovementAttack (State) {
        State.enemies.body.collideWorldBounds = true;
        State.enemies.body.velocity.x = 0;
        State.enemies.body.velocity.y = 0;
        State.enemies.rotation = State.game.physics.arcade.angleToXY(State.enemies, State.player.x, State.player.y);
        this.chasePlayer(State, State.enemies);
    };

    chasePlayer(State, enemy) {
        if (
            (State.player.alive && game.physics.arcade.distanceBetween(State.player, enemy) > 30) &&
            (State.player.alive && game.physics.arcade.distanceBetween(State.player, enemy) < 600)
        ) {
            game.physics.arcade.moveToObject(enemy, State.player, 300);
            enemy.animations.play('move');
        }
        else if (State.player.alive && game.physics.arcade.distanceBetween(State.player, enemy) <= 30) {
            enemy.animations.play('melee');
        }
        else {
            enemy.animations.play('idle');
        }
    };

}




