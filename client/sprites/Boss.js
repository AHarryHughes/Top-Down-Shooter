import Bullets from './Bullets';

export default class Boss extends Phaser.Sprite{

    constructor(State){

        let spawnPoint = this.chooseSpawn(State.map.spawnPoints);

        super(spawnPoint.x, spawnPoint.y, 'player');

        this.MOVE_SPEED = 500;
        this.tint = 0xff0000;
        this.anchor.set(0.5);
        this.scale.set(0.2);
        this.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
        this.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
        this.play('move');
        this.maxHealth = 500;
        this.health = this.maxHealth;
        State.game.physics.arcade.enable(this);
        this.body.setSize(200, 300, 100, 50);
        this.body.collideWorldBounds = true;
        this.shootTime = 0;

        this.bullets = Bullets(1, 0xff0000, 100);

    }

    chooseSpawn (spawnPoints) {
        return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    };

    updateBoss(State){

        this.bossColliders(State);
        this.bossOverlap(State);
        this.bulletColliders(State);
        this.bossMovementAttack(State);

    }

    bossColliders(State){


        State.game.physics.arcade.collide(State.boss, State.map.collisionLayer);
        State.game.physics.arcade.collide(State.boss, State.enemies);
        State.game.physics.arcade.collide(State.boss, State.shotgunEnemies);

    }

    bossOverlap(State){

        State.game.physics.arcade.overlap(State.boss, State.player, this.bossMeleePlayer, null, LevelOutside);

    }

    bulletColliders(State){

        State.game.physics.arcade.collide(State.boss.bullets, State.map.collisionLayer, function(bullet){bullet.kill();});
        State.game.physics.arcade.overlap(State.boss, State.mercs, this.bossmeleeMerc, null, State);

    }

    bossShot (boss, playerbullet) {
        boss.damage(10);
        playerbullet.kill();
    };

    bossMeleePlayer () {
        game.camera.shake(0.005, 500);
        State.player.damage(5);
    };

    bossmeleeMerc (merc) {
        game.camera.shake(0.005, 500);
        merc.damage(5);
    };

    bossMovementAttack (State) {
        if(State.boss.alive) {
            State.boss.body.collideWorldBounds = true;
            State.boss.body.velocity.x = 0;
            State.boss.body.velocity.y = 0;
            State.boss.rotation = game.physics.arcade.angleToXY(boss, State.player.x, State.player.y);
            this.bossShootPlayer(State, State.boss);
        }
    };

    bossShootPlayer(State, boss) {
        if (
            (State.player.alive && game.physics.arcade.distanceBetween(State.player, boss) > 30) &&
            (State.player.alive && game.physics.arcade.distanceBetween(State.player, boss) < 600)
        ) {
            game.physics.arcade.moveToObject(boss, State.player, 150);
            boss.animations.play('move');
        }
        if (State.player.alive && game.physics.arcade.distanceBetween(State.player, boss) <= 400) {
            boss.animations.play('shoot');
            this.bossFireBullets(boss, State.player, State);
        }
        else {
            boss.animations.play('idle');
        }
    };

    bossFireBullets (boss, player, State) {
        if (game.time.now > boss.shootTime) {
            let bullet = State.boss.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(boss.x, boss.y + 8);
                bullet.body.velocity.x = 100;
                State.bossBullets.shootTime = game.time.now + 200;
                bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 500);
                bullet.lifespan = 1000;
            }
        }
    };

}
