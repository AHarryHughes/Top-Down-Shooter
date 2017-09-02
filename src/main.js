(function () {

    requirejs.config({
        baseUrl: 'src/lib',
        paths: {
            phaser:   'libs/phaser/build/phaser.min'
        },
        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });

    define(function(require, exports, module) {
        var Phaser = require('phaser'),
            Boot = require('Boot'),
            Preloader = require('Preloader'),
            MainMenu = require('MainMenu'),
            levelOutside = require('levelOutside'),
            levelHouse = require('levelHouse');

        var game = new Phaser.Game(800, 800, Phaser.AUTO, "GameDiv");
        game.state.add('Boot', Boot);
        game.state.add('Preloader', Preloader);
        game.state.add('MainMenu', MainMenu);
        game.state.add('levelOutside', levelOutside);
        game.state.add('levelHouse', levelHouse);
        game.state.start('Boot');
    });

}());