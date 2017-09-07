
var path = require('path');
var webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var p2 = path.join(phaserModule, 'build/custom/p2.min.js');
var pixi = path.join(__dirname, '/node_modules/pixi.js/');

module.exports = {
    entry: "./client/game.js",
    output: {
        filename: "./bundle.js"
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'p2': p2,
            'pixi': pixi
        }
    }
};