const Phaser = require('../phaser.min.js');

class InsideMap extends Phaser.Tilemap {

    constructor(State){

        super(State.game, "inside");
        this.addTilesetImage('inside-tileset', 'inside-tileset');

        let layer = this.createLayer('Base');
        layer.resizeWorld();
        let collisionLayer = this.createLayer('Collision');
        this.collisionLayer = collisionLayer;
        collisionLayer.visible = false;
        this.setCollisionByExclusion([], true, this.collisionLayer);
        collisionLayer.resizeWorld();

        this.exit = this.objects.meta.find(o => o.name == 'exit');
        this.exitRect = new Phaser.Rectangle(this.exit.x, this.exit.y, this.exit.width, this.exit.height);
        this.entrance = this.objects.meta.find(o => o.name == 'entrance');
        this.start = this.objects.meta.find(o => o.name == 'start');

    }

}

module.exports = InsideMap;