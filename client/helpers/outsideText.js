function textSetUp(State){

    State.healthText = State.game.add.text(0, 0, "health", { fontSize: '32px', fill: '#fff' });
    State.healthText.fixedToCamera = true;
    State.levelText = State.game.add.text(0, 30, "level", { fontSize: '32px', fill: '#fff' });
    State.levelText.fixedToCamera = true;
    State.XPText = State.game.add.text(0, 60, "XP", { fontSize: '32px', fill: '#fff' });
    State.XPText.fixedToCamera = true;
    State.waveText = State.game.add.text(620, 0, "wave", { fontSize: '32px', fill: '#fff' });
    State.waveText.fixedToCamera = true;
    State.mercText = State.game.add.text(1200, 0, "merc", { fontSize: '32px', fill: '#fff' });
    State.mercText.fixedToCamera = true;
    State.bossText = State.game.add.text(620, 30, "boss", { fontSize: '32px', fill: '#fff' });
    State.bossText.fixedToCamera = true;
    //Set text for house
    //Add some color??

}

function textUpdate(State){

    if (State.cutscene) return;
    State.healthText.text = 'Player Health: ' + State.player.health + "/" + State.player.maxHealth;
    State.levelText.text = 'Player Level: ' + State.player.playerLevel;
    State.XPText.text = 'Player XP: ' + State.player.playerXP + "/" + Math.pow(2, (State.player.playerLevel+1));
    State.waveText.text = 'Wave: ' + State.wave;
    State.mercText.text = 'Mercs: ' + (State.mercs.length - State.mercs.countDead()) + "/" + State.mercs.length;
    State.bossText.text = 'Boss Health: ' + State.boss.health + "/" + State.boss.maxHealth;
    //Update text for house

}



export { textSetUp, textUpdate };


