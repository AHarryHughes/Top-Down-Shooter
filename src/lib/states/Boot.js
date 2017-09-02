define(function(require){

    Boot = function Boot(){};

    Boot.prototype = {

        preload: function () {


            // this.load.image('preloaderBar', 'assets/preloader.png');
            // console.log('loader bar');


        },

        create: function() {

            this.game.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = true;

            this.game.state.start('Preloader');
        }

    };

    return Boot;

});


