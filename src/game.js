require('../views/game.html');
// Phaser itself, duh.
require('./state/phaser.min.js');

var Boot = require('./state/Boot');
var Preloader = require('./state/Preloader');
var MainMenu = require('./state/MainMenu');
var levelOutside = require('./state/levelOutside');
var levelHouse = require('./state/levelHouse');

var game = window.game = new Phaser.Game({
    width: 800,
    height: 800,
    renderer: Phaser.CANVAS,
    state: new Boot(),
    transparent: false,
    antialias: false,
    canvasStyle: ''
});
game.state.add('Preloader', new Preloader());
game.state.add('MainMenu', new MainMenu());
game.state.add('levelOutside', new levelOutside());
game.state.add('levelHouse', new levelHouse());
