import OutsideMap from '../maps/OutsideMap';
import Player from '../sprites/Player';
import Merc from '../sprites/Merc';
import Boss from '../sprites/Boss';
import Enemy from '../sprites/Enemy';
import ShotgunEnemy from '../sprites/ShotgunEnemy';
import { outsideOpeningTween } from '../events/outsideEvents';
import { keyConfig } from '../keyConfig';
import { textSetUp, textUpdate } from '../helpers/outsideText';

export default class LevelOutside extends Phaser.State {

    create(){
        //game state passed to the map class
        this.map = OutsideMap(this);

        //game state passed to the player, mercs, boss, and enemy sprite constuctors
        this.player = Player(this);
        this.mercs = Merc(this);
        this.boss = Boss(this);
        this.enemies = Enemy(this);
        this.shotgunEnemies = ShotgunEnemy(this);

        //sets wave number
        this.wave = 1;

        //state passed to opening tween event in outside events
        outsideOpeningTween(this);

        //lays foreground ontop of the map so sprites can walk under it
        let layerForeground = this.map.createLayer('Foreground');
        layerForeground.resizeWorld();

        //keyboard set-up
        keyConfig(this);

        //sets up text for game stats
        textSetUp(this)

    }

    update(){

        //updates game stats text
        textUpdate(this);


        //for testing, but when mvp remove so the player can only access the inside when the 5th wave is over
        if (Phaser.Rectangle.containsPoint(this.map.exitRectangle, this.player.position)) {
            game.state.start('levelHouse');
        }

        //sprite updates
        this.player.updatePlayer(this);
        this.mercs.updateMercs(this);
        this.boss.updateBoss(this);
        this.enemies.updateEnemies(this);
        this.shotgunEnemies.updateShotgunEnemies(this);


        //wave refreshing
        this.waveHandler();



    }

    waveHandler = function(){

        this.waveEnemies = this.enemies.length + this.shotgunEnemies.length;

        if(this.waveEnemies == this.enemies.countDead() + this.shotgunEnemies.countDead()){
            this.wave += 1;
            this.player.playerXPStart = this.player.playerXP;
            //SET IF STATEMENT SO IF MOD 5 LEVELHOUSE STARTS AND PLAYER/TOWERS/MERCS/MONEY/WAVE/WEAPONS SAVED
            this.boss = Boss(this);
            this.enemies = Enemy(this);
            this.shotgunEnemies = ShotgunEnemy(this);
        }

    };

}



