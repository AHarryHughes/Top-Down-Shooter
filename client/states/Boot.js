export default class Boot extends Phaser.State {

    init(){
        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = true;
    }

    create(){
        this.game.state.start('Preloader');
    }

};
