require('../views/game.mustache');
require('./bin/phaser.min.js');

var Boot = require('./bin/boot');
var Preloader = require('./bin/Preloader');
var MainMenu = require('./levels/MainMenu');
var levelHouse = require('./levels/levelHouse');
var levelOutside = require('./levels/levelOutside');

var game = window.game = new Phaser.Game({
    width: 800,
    height: 800,
    renderer: Phaser.AUTO,
    state: new Boot(),
    transparent: false,
    antialias: false,
    canvasStyle: ''
});
game.state.add('Boot', Game.Boot);
game.state.add('Preloader', Game.Preloader);
game.state.add('MainMenu', Game.MainMenu);
game.state.add('levelOutside', Game.LevelOutside);
game.state.add('levelHouse', Game.LevelHouse);
game.state.start('Boot');