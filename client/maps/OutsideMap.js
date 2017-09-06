export default class OutsideMap extends Phaser.Tilemap {

    constructor(State){

        super(State.game, "outside");

        this.addTilesetImage('large-map', 'large-map');
        let layer = this.createLayer('Base');
        layer.resizeWorld();
        let collisionLayer = this.createLayer('Collision');
        this.collisionLayer = collisionLayer;
        collisionLayer.visible = false;
        this.setCollisionByExclusion([], true, this.collisionLayer);
        collisionLayer.resizeWorld();

        //finds designated points on map
        this.exit = this.objects.meta.find(o => o.name == 'exit');
        this.exitRectangle = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);
        this.entrance = this.objects.meta.find(o => o.name == 'entrance');
        this.start = this.objects.meta.find(o => o.name == 'start');

        this.spawnPoints = [];
        let spawn1 = this.objects.meta.find(o => o.name == 'spawn1');
        let spawn2 = this.objects.meta.find(o => o.name == 'spawn2');
        let spawn3 = this.objects.meta.find(o => o.name == 'spawn3');
        let spawn4 = this.objects.meta.find(o => o.name == 'spawn4');
        this.spawnPoints.push(spawn1, spawn2, spawn3, spawn4);

        //add Tower and Boss spawn points

    }

}