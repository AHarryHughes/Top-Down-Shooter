//*******************************************************************************INIT VARS*******************************

Game.LevelOutside = function (game) { };
//*******************************************************************************REQUIRED FILES******************************
const mapCreation = require('../creation/levelOutsideMap.js');
//require is not defined the whole thing is going to have to be classes...









//*******************************************************************************GAME CLASS*******************************

Game.LevelOutside.prototype = {
  //*******************************************************************************CREATE*******************************
  create: function (game) {

    //*******************************************************************************PLAYER*******************************
    var player = game.add.sprite(100, 240, 'player');
    this.player = player;
    this.player.MOVE_SPEED = 500;
    this.player.anchor.set(0.5);
    this.player.scale.set(0.2);
    this.player.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
    this.player.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
    this.player.play('move');
    this.player.maxHealth = 100;
    this.player.health = this.player.maxHealth;
    game.physics.arcade.enable(this.player);
    this.player.body.setSize(100, 150, 100, 50);
    game.camera.follow(player);
    this.player.body.collideWorldBounds = true;

    //*******************************************************************************FIND SPAWN LOCATIONS*******************************
    let spawnPoints = [];
    let spawn1 = this.map.objects.meta.find(o => o.name == 'spawn1');
    let spawn2 = this.map.objects.meta.find(o => o.name == 'spawn2');
    let spawn3 = this.map.objects.meta.find(o => o.name == 'spawn3');
    let spawn4 = this.map.objects.meta.find(o => o.name == 'spawn4');
    spawnPoints.push(spawn1, spawn2, spawn3, spawn4);

    //*******************************************************************************PUNCHERS*******************************
    enemiesTotal = 15;
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < enemiesTotal; i++) {
      let spawn = chooseSpawn(spawnPoints);
      var randomX = Math.random() * 300;
      var randomY = Math.random() * 300;
      var enemy = enemies.create(spawn.x + randomX, spawn.y + randomY, 'flashlight-enemy');
      enemy.animations.add('melee', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, true);
      enemy.animations.add('move', [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 46, true);
      enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14, true);
      enemy.play('idle');
      enemy.anchor.setTo(0.5, 0.5);
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.immovable = true;
      enemy.body.collideWorldBounds = true;
      enemy.body.allowGravity = true;
      enemy.scale.setTo(0.3);
      enemy.body.velocity.x = 0;
      enemy.body.velocity.y = 0;
    }
    console.log("enemies:", enemies);
    enemies.setAll('health', 100);

    //*******************************************************************************SHOOTERS*******************************
    shotgunEnemiesTotal = 10;
    shotgunEnemies = game.add.group();
    shotgunEnemies.enableBody = true;
    shotgunEnemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < shotgunEnemiesTotal; i++) {
      let spawn = chooseSpawn(spawnPoints);
      var randomX = Math.random() * 300;
      var randomY = Math.random() * 300;
      var shotgunEnemy = shotgunEnemies.create(spawn.x + randomX, spawn.y + randomY, 'shotgun-enemy');
      shotgunEnemy.animations.add('shoot', [7, 15, 23], 7, true);
      shotgunEnemy.animations.add('move', [0, 4, 5, 6, 12, 13, 14, 19, 20, 21, 22], 0, true);
      shotgunEnemy.animations.add('idle', [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18], 0, true);
      shotgunEnemy.play('idle');
      shotgunEnemy.anchor.setTo(0.5, 0.5);
      game.physics.enable(shotgunEnemy, Phaser.Physics.ARCADE);
      shotgunEnemy.body.immovable = false;
      shotgunEnemy.body.collideWorldBounds = true;
      shotgunEnemy.body.allowGravity = true;
      shotgunEnemy.scale.setTo(0.3);
      shotgunEnemy.body.velocity.x = 0;
      shotgunEnemy.body.velocity.y = 0;
    }
    shotgunEnemies.setAll('health', 100);
    this.map.createLayer('Foreground');

    //*******************************************************************************KEYBOARD SET UP*******************************
    this.keyboardCursors = game.input.keyboard.createCursorKeys();
    this.moveSpeed = { x: 0, y: 0 };
    this.playerInteraction = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
    game.input.keyboard.addKey(Phaser.KeyCode.C).onDown.add(() => {
      this.collisionLayer.visible = !this.collisionLayer.visible;
    });
    this.showDebug = false;
    game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(() => {
      this.showDebug = !this.showDebug;
    });

    //*******************************************************************************SHOOTERS*******************************
    let exit = this.map.objects.meta.find(o => o.name == 'exit');
    this.exitRectangle = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);
    let entrance = this.map.objects.meta.find(o => o.name == 'entrance');
    let start = this.map.objects.meta.find(o => o.name == 'start');
    this.cutscene = true;
    this.player.position.set(entrance.x, entrance.y + 30);
    this.player.angle = 0;
    let tween = game.add.tween(this.player).to({ x: start.x, y: start.y }, 1500);
    tween.onComplete.add(() => {
      this.cutscene = false;
    });
    tween.start();

    //*******************************************************************************CAMERA*******************************
    game.camera.x = game.world.centerX - game.width / 2;

    //*******************************************************************************PLAYER BULLETS*******************************
    this.playerBullets = game.add.group();
    this.playerBullets.enableBody = true;
    this.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.playerBullets.createMultiple(5, 'bullet');
    this.playerBullets.setAll('anchor.x', -1);
    this.playerBullets.setAll('anchor.y', -1);
    this.playerBullets.setAll('scale.x', 0.5);
    this.playerBullets.setAll('scale.y', 0.5);
    this.playerBullets.setAll('outOfBoundsKill', true);
    this.playerBullets.setAll('checkWorldBounds', true);

    //*******************************************************************************ENEMY BULLETS*******************************
    this.shotgunEnemyBullets = game.add.group();
    this.shotgunEnemyBullets.enableBody = true;
    this.shotgunEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.shotgunEnemyBullets.createMultiple(100, 'bullet');
    this.shotgunEnemyBullets.setAll('anchor.x', -1);
    this.shotgunEnemyBullets.setAll('anchor.y', -1);
    this.shotgunEnemyBullets.setAll('scale.x', 0.5);
    this.shotgunEnemyBullets.setAll('scale.y', 0.5);
    this.shotgunEnemyBullets.setAll('outOfBoundsKill', true);
    this.shotgunEnemyBullets.setAll('checkWorldBounds', true);

    //*******************************************************************************FOG*************************************
    this.fogOfWar = this.game.add.bitmapData(this.game.width, this.game.height);
    this.playerLight = this.game.add.image(this.game.camera.x, this.game.camera.y, this.fogOfWar);
    this.playerLight.blendMode = Phaser.blendModes.MULTIPLY;

    //*******************************************************************************STAT TEXT*******************************
    this.healthText = this.add.text(0, 0, "health", { fontSize: '32px', fill: '#fff' });
    this.healthText.fixedToCamera = true;
    levelText = this.add.text(0, 30, "level", { fontSize: '32px', fill: '#fff' });
    levelText.fixedToCamera = true;
  },

  //*******************************************************************************UPDATE*******************************
  update: function (game) {

    //*******************************************************************************SETTING VARS*******************************
    if (this.cutscene) return;
    this.playerLight.reset(this.game.camera.x, this.game.camera.y);
    let keyboardCursors = this.keyboardCursors;
    let playerInteraction = this.playerInteraction;
    let moveSpeed = this.moveSpeed;
    let playerLight = this.playerLight;
    let fogOfWar = this.fogOfWar;
    dayNightCycle(playerLight, fogOfWar, this.player);
    let health = this.player.health;
    maxHealth = this.player.maxHealth;
    this.healthText.text = 'Player Health: ' + health + "/" + maxHealth;
    levelText.text = 'Player Level: ' + this.playerLevel;
    //*******************************************************************************COLLIDERS SET*******************************
    game.physics.arcade.collide(this.player, this.collisionLayer);
    game.physics.arcade.collide(this.player, this.foregroundCollisionLayer);

    //*******************************************************************************LEVEL UPGRADES SET*******************************
    this.playerLevelUpgrades(this.player);

    //*******************************************************************************OVERLAP TRIGGERS SET*******************************
    game.physics.arcade.overlap(this.playerBullets, enemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(this.playerBullets, shotgunEnemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(enemies, this.player, meleePlayer);
    game.physics.arcade.overlap(this.player, this.shotgunEnemyBullets, this.playerShot, null, this);

    //*******************************************************************************COLLIDERS SET*******************************
    function meleePlayer () {
      game.camera.shake(0.005, 500);
      this.player.health -= 1;
    }

    //*******************************************************************************CLICK SET TO SHOOT*******************************
    if (game.input.mousePointer.isDown) {
      this.shootBullet(this.player);
    }

    //*******************************************************************************MAKE SURE THEY DON'T SLIDE*******************************
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    //*******************************************************************************CLICK TO MOVE*******************************
    if (keyboardCursors.left.isDown || playerInteraction.left.isDown) moveSpeed.x = -this.player.MOVE_SPEED;
    else if (keyboardCursors.right.isDown || playerInteraction.right.isDown) moveSpeed.x = this.player.MOVE_SPEED;
    else moveSpeed.x = 0;
    if (keyboardCursors.up.isDown || playerInteraction.up.isDown) moveSpeed.y = -this.player.MOVE_SPEED;
    else if (keyboardCursors.down.isDown || playerInteraction.down.isDown) moveSpeed.y = this.player.MOVE_SPEED;
    else moveSpeed.y = 0;
    if (Math.abs(moveSpeed.x) > 0 || Math.abs(moveSpeed.y) > 0) {
      this.player.body.velocity.x = moveSpeed.x;
      this.player.body.velocity.y = moveSpeed.y;
    }
    //*******************************************************************************SET SPRITE IMAGES*******************************
    if (Math.abs(this.player.body.velocity.x) > 0 || Math.abs(this.player.body.velocity.y) > 0) {
      this.player.play('move');
    } else {
      this.player.play('idle');
    }

    //*******************************************************************************TRIGGERS INSIDE AT DOOR*******************************
    if (Phaser.Rectangle.containsPoint(this.exitRectangle, this.player.position)) {
      this.state.start('levelHouse');
    }

    //*******************************************************************************PLAYER FACES MOUSE*******************************
      this.player.rotation = game.physics.arcade.angleToPointer(this.player);

    //*******************************************************************************ANGLES PUNCHERS AND SENDS TO PLAYER*******************************
    enemies.forEachAlive(function (enemies) {
        enemies.body.collideWorldBounds = true,
        enemies.body.velocity.x = 0,
        enemies.body.velocity.y = 0,
        enemies.rotation = game.physics.arcade.angleToXY(enemies, this.player.x, this.player.y);
      chasePlayer(this.player, enemies, game);
    });

    //*******************************************************************************ANGLES SHOOTERS AND SENDS TO PLAYER*******************************
    shotgunEnemies.forEachAlive(function (shotgunEnemies) {
      shotgunEnemies.body.collideWorldBounds = true,
        shotgunEnemies.body.velocity.x = 0;
      shotgunEnemies.body.velocity.y = 0;
      shotgunEnemies.rotation = game.physics.arcade.angleToXY(shotgunEnemies, this.player.x, this.player.y);
      this.shootPlayer(this.player, shotgunEnemies, game);
    });

    //*******************************************************************************XP AND HEALTH HANDLERS*******************************
    this.calculateDeadEnemies(enemies);

    if (this.player.health <= 0) {
      this.state.start('levelHouse');
    }
    if (this.player.health <= 30) {
      this.player.tint = Math.random() * 0xffffff;
    }

    let gameXPsteps = 15;
    this.playerLevel = Math.round(Math.log(this.playerXP, gameXPsteps));


    //*******************************************************************************TIMER TO HANDLE FOG*******************************
    function dayNightCycle(playerLight, fogOfWar, player) {
      console.log('count:', this.count);
      this.count += 1;
      if (this.count >= 500) {
        this.count = 0;
        this.day = !this.day;
      }
      if (this.day === false) {
        updatefogOfWar(playerLight, fogOfWar, player);
        
        enemies.moveSpeed = 1000;
      }
      else if (this.day === true) {
        playerLight.kill();
        enemies.moveSpeed = 150
      }
    }

    //*******************************************************************************FOG ON OR OFF*******************************
    function updatefogOfWar(playerLight, fogOfWar, player) {
      fogOfWar.context.fillStyle = 'rgb(10, 10, 10)';
      fogOfWar.context.fillRect(0, 0, game.width + 500, game.height + 500);
      var radius = 200 + game.rnd.integerInRange(1, 20),
        heroX = player.x - game.camera.x,
        heroY = player.y - game.camera.y;
      var gradient = fogOfWar.context.createRadialGradient(
        heroX, heroY, 100 * 0.75,
        heroX, heroY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      fogOfWar.context.beginPath();
      fogOfWar.context.fillStyle = gradient;
      fogOfWar.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
      fogOfWar.context.fill();
      fogOfWar.dirty = true;
    }
  },
  //*******************************************************************************RENDER*******************************
  render(game) {
    // if (this.collisionLayer.visible) {
    //   game.debug.body(this.player);
    // }
    // game.debug.text(game.time.fps, 5, 14, '#00ff00');
  },
  //*******************************************************************************INFLICTS DAMAGE TO ENEMY*******************************
  enemyShot: function (bullets, enemies) {
    enemies.damage(20);
    bullets.kill();
  },
  //*******************************************************************************INFLICTS DAMAGE TO ENEMY*******************************
  playerShot: function (player, shotgunEnemyBullets) {
    console.log('PLAYER SHOT');
    player.damage(10);
    shotgunEnemyBullets.kill();
  },
  //*******************************************************************************PLAYER FIRES A BULLET*******************************
  shootBullet: function (player) {
    if (this.time.now > this.shootTime) {
      bullet = this.playerBullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(player.x, player.y);
        bullet.body.velocity.x = 10000;
        this.shootTime = this.time.now + 100;
        bullet.rotation = this.physics.arcade.moveToPointer(bullet, 10000, this.input.activePointer, 100);
        bullet.lifespan = 3000;
      }
    }
  },
    //*******************************************************************************ENEMY FIRES A BULLET*******************************
  fireBullets: function (shotgunEnemies, player, game) {
    if (game.time.now > this.enemyShootTime) {
        bullet = shotgunEnemyBullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(shotgunEnemies.x, shotgunEnemies.y + 8);
            bullet.body.velocity.x = 100;
            this.enemyShootTime = game.time.now + 200;
            bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 500);
        }
    }
  },
  count: 0,
  day: false,
  deadEnemies: 0,
  deadShotgunEnemies: 0,
  levelText: null,
  playerLevel: 1,
  playerXP: 1,
  healthText: null,
  map: mapCreation(game),
  enemyShootTime: 0,
  shootTime: 0,
  player: null,
  playerBullets: null,
  shotgunEnemyBullets: null,
  //*******************************************************************************GIVES XP FOR KILLS*******************************
  calculateDeadEnemies: function(enemies) {
    if (this.deadEnemies < enemies.countDead()) {
        this.deadEnemies = enemies.countDead();
        this.playerXP += 5;
    }
    if (this.deadShotgunEnemies < shotgunEnemies.countDead()) {
        this.deadShotgunEnemies = shotgunEnemies.countDead();
        this.playerXP += 10;
    }
  },
  //*******************************************************************************UPGRADES PLAYER BASED ON LEVEL*******************************
  playerLevelUpgrades: function (player) {
    if (this.playerLevel >= 2) {
        player.MOVE_SPEED = 400;
    } else if (this.playerLevel >= 3) {
        player.MOVE_SPEED = 600;
        player.damage = player.damage += 10;
    }
  }, //*******************************************************************************HANDLES ENEMY SHOOTER ATTACKS*******************************
  shootPlayer: function (player, shotgunEnemies, game) {
    if (
        (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) > 200) &&
        (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) < 400)
    ) {
        game.physics.arcade.moveToObject(shotgunEnemies, player, 150);
        shotgunEnemies.animations.play('move');
    }
    else if (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) <= 200) {
        shotgunEnemies.animations.play('shoot');
        this.fireBullets(shotgunEnemies, player, game);
    }
    else {
        shotgunEnemies.animations.play('idle');
    }
  },
};



//*******************************************************************************HANDLES ENEMY CHASE*******************************
function chasePlayer(player, enemies, game) {
  if (
    (player.alive && game.physics.arcade.distanceBetween(player, enemies) > 30) &&
    (player.alive && game.physics.arcade.distanceBetween(player, enemies) < 400)
  ) {
    game.physics.arcade.moveToObject(enemies, player, 300);
    enemies.animations.play('move');
  }
  else if (player.alive && game.physics.arcade.distanceBetween(player, enemies) <= 30) {
    enemies.animations.play('melee');
  }
  else {
    enemies.animations.play('idle');
  }
}

//*******************************************************************************RANDOM SPAWN LOC SELECT*******************************
function chooseSpawn(spawnPoints) {
  return spawnPoints[Math.ceil(Math.random() * spawnPoints.length)];
}
