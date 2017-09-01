
export default class Boot extends Phaser.State {

    preload() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    }

    create() {
        this.game.state.start('Preloader');
    }

};


// var Game = {};
//
// Game.Boot = function (game) {
//
//
//
// };
//
// Game.Boot.prototype = {
//     init: function () {
//
//         this.input.maxPointers = 1;
//         this.stage.disableVisibilityChange = true;
//     },
//
//
//     preload: function () {
//
//
//         // this.load.image('preloaderBar', 'assets/preloader.png');
//         // console.log('loader bar');
//
//
//     },
//
//     create: function() {
//
//         this.state.start('Preloader');
//     }
// };