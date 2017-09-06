function outsideOpeningTween(State){

    State.cutscene = true;
    State.player.position.set(entrance.x, entrance.y + 30);
    State.player.angle = 0;
    let tween = State.game.add.tween(State.player).to({ x: State.map.start.x, y: State.map.start.y }, 1500);
    tween.onComplete.add(() => {
        State.cutscene = false;
    });
    tween.start();

}

export { outsideOpeningTween }