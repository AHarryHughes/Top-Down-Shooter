module.exports = function (game) {
    //*******************************************************************************TILE POSITIONS*************************
    let map = game.add.tilemap("outside");
    map.addTilesetImage('outside-tileset', 'outside-tileset');

    //*******************************************************************************MAP CREATION::BASE*******************************
    let layer = map.createLayer('Base');
    layer.resizeWorld();

    //*****************************************************************************MAP CREATION::COLLISION*********
    let collisionLayer = map.createLayer('Collision');
    game.collisionLayer = collisionLayer;
    collisionLayer.visible = true;
    map.setCollisionByExclusion([], true, this.collisionLayer);
    collisionLayer.resizeWorld();

    //*******************************************************************************MAP CREATION::FOREGROUND*******************************
    let foregroundCollisionLayer = map.createLayer('ForegroundObjects');
    game.foregroundCollisionLayer = foregroundCollisionLayer;
    foregroundCollisionLayer.visible = true;
    map.setCollisionByExclusion([], true, this.foregroundCollisionLayer);
    foregroundCollisionLayer.resizeWorld();

    return map;
};