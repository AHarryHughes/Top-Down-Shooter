export default class Bullets extends Phaser.Group{

    constructor(size, tint, amount){

        super();

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.createMultiple(amount, 'bullet');
        this.setAll('anchor.x', -1);
        this.setAll('anchor.y', -1);
        this.setAll('scale.x', size);
        this.setAll('scale.y', size);
        this.setAll('outOfBoundsKill', true);
        this.setAll('checkWorldBounds', true);

        if(tint){
            this.setAll('tint', tint);
        }

    }

}