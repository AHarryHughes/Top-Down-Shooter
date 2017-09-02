define(function (require) {

    MainMenu = function(){};


    MainMenu.prototype = {
        create:function(){
            background = this.add.sprite(0,0);
            background.width = 800;
            background.height = 800;
            filter = this.add.filter('Fire', 800,800);
            filter.alpha = 0.0;
            background.filters = [filter];

            this.createButton(this,"Play",this.world.centerX,this.world.centerY +32, 300, 100, function(){
                this.game.state.start('levelOutside');
            });
            this.createButton(this,"About",this.world.centerX,this.world.centerY +110, 300, 100, function(){
                console.log("Top down, survival tower defence built with phaser library");
            });
            titlescreen = this.add.sprite(this.world.centerX,this.world.centerY - 192, 'menu-image');
            titlescreen.anchor.setTo(0.5,0.5);
        },
        update:function(){
            filter.update();

        },
        createButton:function(game,string,x,y,width,height,callback){
            var button1 = game.add.button(x,y,'button',callback,this,2,1,0);
            button1.anchor.setTo(0.5,0.5);
            button1.width = width;
            button1.height = height;
            var text = game.add.text(button1.x,button1.y, string, {font:"14px Arial", fill:"#fff", align:"center"});
            text.anchor.setTo(0.5,0.5);
        }

    };

    return MainMenu;

});



