require('./phaser.min.js');

const Boot = require('./states/Boot');
const Preloader = require('./states/Preloader');
const MainMenu = require('./states/MainMenu');
const LevelOutside = require('./states/LevelOutside');
const LevelHouse = require('./states/LevelHouse');

var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, document.getElementById('game'));
game.state.add('Boot', new Boot());
game.state.add('Preloader', new Preloader());
game.state.add('MainMenu', new MainMenu());
game.state.add('LevelOutside', new LevelOutside());
game.state.add('LevelHouse', new LevelHouse());
game.state.start('Boot');



