const Phaser = require('../phaser.min.js');
class MainMenu extends Phaser.State {

    create(){
        background = this.game.add.sprite(0,0);
        background.width = 800;
        background.height = 800;
        this.filter = this.game.add.filter('Fire', 800,800);
        this.filter.alpha = 0.0;
        background.filters = [this.filter];

        this.createButton(this.game,"Play",this.game.world.centerX,this.game.world.centerY +32, 300, 100, function(){
            this.game.state.start('LevelOutside');
        });
        this.createButton(this.game,"About",this.game.world.centerX,this.game.world.centerY +110, 300, 100, function(){
            console.log("Top down, survival tower defence built with phaser library");
        });
        titlescreen = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY - 192, 'menu-image');
        titlescreen.anchor.setTo(0.5,0.5);
    }

    update(){
        this.filter.update();
    }

    createButton(game,string,x,y,width,height,callback){
        var button1 = game.add.button(x,y,'button',callback,game,2,1,0);
        button1.anchor.setTo(0.5,0.5);
        button1.width = width;
        button1.height = height;
        var text = game.add.text(button1.x,button1.y, string, {font:"14px Arial", fill:"#fff", align:"center"});
        text.anchor.setTo(0.5,0.5);
    }

};

module.exports = MainMenu;