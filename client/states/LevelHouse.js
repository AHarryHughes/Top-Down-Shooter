const Phaser = require('../phaser.min.js');
const InsideMap = require('../maps/InsideMap');
const Player = require('../sprites/Player');
const keyConfig = require('../keyConfig');
const insideEvents = require('../events/insideEvents');

export default class LevelHouse extends Phaser.State(){

    create() {
        //creates inside map
        this.map = InsideMap(this);

        //creates player
        this.player = Player(this);

        //lays foreground ontop of sprites so they walk under it
        map.createLayer('Foreground');

        //keyboard set-up
        keyConfig(this);

        //opening tween
        insideEvents.insideOpeningTween(this);

    }

    update() {

        this.player.updatePlayer(this);

        if (Phaser.Rectangle.containsPoint(this.exitRect, this.player.position)) {
            this.state.start('levelOutside');
        }
    }

    render() {
        if (this.collisionLayer.visible) {
            game.debug.body(this.player);
        }
        game.debug.text(game.time.fps, 5, 14, '#00ff00');
    }

}
