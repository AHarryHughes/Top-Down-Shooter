const Phaser = require('../phaser.min.js');

const Bullets = require('./Bullets');

class Merc extends Phaser.Group{

    constructor(amount){

        super();

        for(let i = 0; i < mercsTotal; i++){
            let merc = this.create(2977 + i, 1060 + i, 'player');
            merc.tint = 0x00ff00;
            merc.MOVE_SPEED = 500;
            merc.anchor.set(0.5);
            merc.scale.set(0.2);
            merc.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
            merc.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
            merc.play('move');
            merc.maxHealth = 100;
            merc.health = merc.maxHealth;
            game.physics.arcade.enable(merc);
            merc.body.setSize(100, 150, 100, 50);
            merc.body.collideWorldBounds = true;
        }

        this.shootTime = 0;

        this.bullets = new Bullets(.5, 0x00ff00, 100);

    }

    updateMercs(State){

        this.mercColliders(State);
        this.mercOverlap(State);
        this.bulletColliders(State);
        this.bulletOverlap(State);
        //break these loops to when found an enemy in range, so he doesn't attack all of them at once
        State.shotgunEnemies.forEachAlive(this.mercsMovementAttack, State);
        State.enemies.forEachAlive(this.mercsMovementAttack, State);
        if(State.boss.alive){this.mercsMovementAttack(State.boss);}

    }

    mercColliders(State){

        State.game.physics.arcade.collide(State.mercs, State.map.collisionLayer);
        State.game.physics.arcade.collide(State.mercs, State.mercs);

    }

    mercOverlap(State){

        State.game.physics.arcade.overlap(State.mercs, State.boss.bullets, this.mercShot, null, State);
        State.game.physics.arcade.overlap(State.mercs, State.shotgunEnemy.bullets, State.mercShot, null, State);

    }

    bulletColliders(State){

        State.game.physics.arcade.overlap(State.mercs.bullets, State.boss, State.boss.bossShot, null, State);
        State.game.physics.arcade.overlap(State.mercs.bullets, State.enemies, State.enemies.enemyShot, null, State);
        State.game.physics.arcade.overlap(State.mercs.bullets, State.shotgunEnemies, State.shotgunEnemies.shotgunEnemyShot, null, State);

    }

    bulletOverlap(State){

        State.game.physics.arcade.collide(State.mercBullets, State.map.collisionLayer, function(bullet){bullet.kill();});

    }

    mercShot(merc, shotgunEnemyBullet) {
        merc.damage(10);
        shotgunEnemyBullet.kill();
    };

    mercsMovementAttack(enemy) {
        State.mercs.forEachAlive(function(merc){
            State.mercs.body.collideWorldBounds = true;
            State.mercs.body.velocity.x = 0;
            State.mercs.body.velocity.y = 0;
            this.followPlayerShootEnemy(State, enemy, merc);
        });
    };

    followPlayerShootEnemy(State, enemy, merc) {
        if (
            (merc.alive && game.physics.arcade.distanceBetween(merc, State.player) > 50)
        ) {
            merc.rotation = game.physics.arcade.angleToXY(merc, State.player.x, State.player.y);
            game.physics.arcade.moveToObject(merc, State.player, merc.MOVE_SPEED);
            merc.animations.play('move');
        }
        if (
            (merc.alive && game.physics.arcade.distanceBetween(merc, enemy) <= 400)

        ) {
            merc.rotation = game.physics.arcade.angleToXY(merc, enemy.x, enemy.y);
            merc.animations.play('move');
            this.mercShoot(State, enemy, merc);
        }
        else {
            merc.rotation = game.physics.arcade.angleToXY(merc, State.player.x, State.player.y);
            merc.animations.play('idle');
        }
    };

    mercShoot (State, enemy, merc) {
        if (game.time.now > State.mercs.shootTime) {
            let bullet = State.merc.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(merc.x, merc.y + 8);
                bullet.body.velocity.x = 100;
                merc.shootTime = game.time.now + 200;
                bullet.rotation = game.physics.arcade.moveToObject(bullet, enemy, 500);
                bullet.lifespan = 1000;
            }
        }
    };


}


module.exports = Merc;