import Bullets from './Bullets';

export default class Player extends Phaser.Sprite{

    constructor(State){

        super(State.game, 100, 240, 'player');

        State.game.physics.arcade.enable(this);
        State.game.camera.follow(this);
        this.body.collideWorldBounds = true;

        this.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
        this.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
        this.play('move');
        this.anchor.set(0.5);
        this.scale.set(0.2);
        this.body.setSize(100, 150, 100, 50);

        this.MOVE_SPEED = 500;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.playerLevel = 1;
        this.playerXP = 1;
        this.playerXPStart = this.playerXP;
        this.shootTime = 0;

        this.bullets = new Bullets(0.5, null, 100);

    }

    updatePlayer(State){

        this.bulletColliders(State);
        this.bulletOverlap(State);
        this.playerColliders(State);
        this.playerOverlap(State);
        this.playerUserInput(State);
        this.playerStats(State);

    }

    bulletColliders(State){

        State.game.physics.arcade.collide(State.player.bullets, State.map.collisionLayer, function(bullet){bullet.kill();});

    }

    bulletOverlap(State){

        State.game.physics.arcade.overlap(State.player.bullets, State.enemies, State.enemies.enemyShot, null, State);
        State.game.physics.arcade.overlap(State.player.bullets, State.shotgunEnemies, State.shotgunEnemies.shotgunEnemyShot, null, State);
        State.game.physics.arcade.overlap(State.player.bullets, State.boss, State.boss.bossShot, null, State);

    }

    playerColliders(State){

        State.game.physics.arcade.collide(State.player, State.map.collisionLayer);

    }

    playerOverlap(State){

        State.game.physics.arcade.overlap(State.player, State.shotgunEnemy.bullets, this.playerShot, null, LevelOutside);
        State.game.physics.arcade.overlap(State.player, State.boss.bullets, this.playerShot, null, LevelOutside);

    }

    playerUserInput(State){

        //no sliding
        State.player.body.velocity.x = 0;
        State.player.body.velocity.y = 0;

        //checking key press for sprite movement
        if (State.keyboardCursors.left.isDown || State.playerInteraction.left.isDown) State.moveSpeed.x = -State.player.MOVE_SPEED;
        else if (State.keyboardCursors.right.isDown || State.playerInteraction.right.isDown) State.moveSpeed.x = State.player.MOVE_SPEED;
        else State.moveSpeed.x = 0;
        if (State.keyboardCursors.up.isDown || State.playerInteraction.up.isDown) State.moveSpeed.y = -State.player.MOVE_SPEED;
        else if (State.keyboardCursors.down.isDown || State.playerInteraction.down.isDown) State.moveSpeed.y = State.player.MOVE_SPEED;
        else State.moveSpeed.y = 0;
        if (Math.abs(State.moveSpeed.x) > 0 || Math.abs(State.moveSpeed.y) > 0) {
            State.player.body.velocity.x = State.moveSpeed.x;
            State.player.body.velocity.y = State.moveSpeed.y;
        }

        //changes player to face mouse
        State.player.rotation = game.physics.arcade.angleToPointer(State.player);

        //shoot on mouse click
        if (State.game.input.mousePointer.isDown) {
            State.player.playerShoot(State);
        }

        //update player sprite sheet
        if (Math.abs(State.player.body.velocity.x) > 0 || Math.abs(State.player.body.velocity.y) > 0) {
            State.player.play('move');
        } else {
            State.player.play('idle');
        }

    }

    playerStats(State){

        this.updateXP(State);
        this.updateHealth(State);
        this.updateLvl(State);
        this.updateUpgrades(State);

    }

    updateXP(State) {
        let XPBoost = (State.enemies.countDead() * 2) + (State.shotgunEnemies.countDead() * 4);
        if(!State.boss.alive){XPBoost += 20;}
        State.player.playerXP = State.player.playerXPStart + XPBoost;
    }

    updateHealth(State){
        if (State.player.health <= 0) {
            State.game.state.start('levelHouse');
        }
        if (State.player.health <= 30) {
            State.player.tint = Math.random() * 0xffffff;
        }
    };

    updateLvl(State){
        let currentLvl = State.player.playerLevel;
        State.player.playerLevel = Math.floor(Math.log2(State.player.playerXP));
        if(currentLvl < State.player.playerLevel){
            State.player.health = State.player.maxHealth;
        }
    };

    updateUpgrades(State) {
        if(State.player.playerLevel > 1) {
            State.player.MOVE_SPEED = 500 + State.player.playerLevel * 5;
            State.mercs.MOVE_SPEED = State.player.MOVE_SPEED;
            State.player.maxHealth = 100 + (10 * State.player.playerLevel);
        }
    }

    playerShoot(State){
        if (State.game.time.now > State.player.shootTime) {
            let bullet = State.playerBullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(State.player.x, State.player.y);
                bullet.body.velocity.x = 10000;
                State.player.shootTime = State.game.time.now + 100;
                bullet.rotation = State.game.physics.arcade.moveToPointer(bullet, 10000, game.input.activePointer, 100);
                bullet.lifespan = 1000;
            }
        }
    }

    playerShot(player, shotgunEnemyBullet) {
        State.player.damage(10);
        shotgunEnemyBullet.kill();
    }

}