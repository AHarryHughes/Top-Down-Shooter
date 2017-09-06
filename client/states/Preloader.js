export default class Preload extends Phaser.State {

    preload(){
        var blackURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6AzYGAAAAByAAHo7e7HAAAAAElFTkSuQmCC';
        var fireFilter = 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Fire.js';


        this.game.load.tilemap('outside', './client/assets/TMX/BETA-MAP/outside-beta.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('large-map', './client/assets/TMX/BETA-MAP/large-map.png');


        this.game.load.tilemap('inside', './client/assets/maps/level-inside.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('inside-tileset', './client/assets/maps/inside-tileset.png');


        this.game.load.atlas('player', './client/assets/animations/player-rifle.png', './client/assets/animations/player-rifle.json');
        this.game.load.atlas('flashlight-enemy', './client/assets/sprites/flashlight-enemy.png', './client/assets/sprites/flashlight-enemy.json');
        this.game.load.atlas('shotgun-enemy', './client/assets/sprites/shotgun-enemy.png', './client/assets/sprites/shotgun-enemy.json');


        this.game.load.image('button', './client/assets/sprites/button.png');
        this.game.load.image('menu-image', './client/assets/sprites/menu-image.png');
        this.game.load.image('bullet', './client/assets/sprites/bullet.png');
        this.game.load.image('fog-of-war', blackURI);

        this.game.load.script('filter', fireFilter);
    }

    create(){
        this.game.state.start('MainMenu');
    }

};
