
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload: preload,
    create: create
  }
};

//new Phaser.Game(config);
var player;
var bullet;
var bullets;
var enemies;
var score = 0;
var highScore = localStorage.getItem('highscore') || 0;
var scoreText;
var highScoreText;
  
function preload() 
  {
    //load assets like player image, enemy spritesheet, etc.
    game.load.image('player' , './assets/spaceship.png');
    game.load.spritesheet('enemy', './assets/enemy.png', 32, 32);
    game.load.image('sky', 'assets/Background.png');

  }
  
function create() 
  {
    // Create player object
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    
    // Set up bullets as a group with object pooling
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    
    // Create enemy group with physics enabled
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    
    // Add enemy sprites to the group
    for (var i = 0; i < 10; i++) 
    {
      var enemy = enemies.create(i * 48, 0, 'enemy');
      enemy.anchor.setTo(0.5, 0.5);
      enemy.animations.add('move', [0, 1, 2, 3], 10, true);
      enemy.play('move');
      enemy.body.velocity.y = 50 + Math.random() * 100;
    }
  
    // Add keyboard event listeners to move the player
    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    var cursors = game.input.keyboard.createCursorKeys();
    leftKey.onDown.add(function() { player.body.velocity.x = -200; });
    rightKey.onDown.add(function() { player.body.velocity.x = 200; });
    cursors.left.onDown.add(function() { player.body.velocity.x = -200; });
    cursors.right.onDown.add(function() { player.body.velocity.x = 200; });
    leftKey.onUp.add(function() { player.body.velocity.x = 0; });
    rightKey.onUp.add(function() { player.body.velocity.x = 0; });
    cursors.left.onUp.add(function() { player.body.velocity.x = 0; });
    cursors.right.onUp.add(function() { player.body.velocity.x = 0; });
    
    // Set up score and high score text
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    highScoreText = game.add.text(600, 16, 'High Score: ' + highScore, { fontSize: '32px', fill: '#fff' });
  }
  
  function update() 
  {
    // Check for bullet and enemy collision
    game.physics.arcade.overlap(bullets, enemies, bulletHitEnemy, null, this);
    
    // Check for player and enemy collision
    game.physics.arcade.overlap(player, enemies, playerHitEnemy, null, this);
    
    // Generate bullets on spacebar press
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      fireBullet();
    }
    
    // Move enemies and update score
    enemies.forEach(function(enemy) {
      enemy.body.position.y += enemy.body.velocity.y * game.time.physicsElapsed;
      if (enemy.body.position.y > game.world.height) 
      {
        enemy.body.position.y = 0;
        enemy.body.position.x = Math.random() * game.world.width;
        score++;
        scoreText.text = 'Score: ' + score;
        if (score > highScore) 
        {
          highScore = score;
          localStorage.setItem('highscore', highScore);
          highScoreText.text = 'High Score: ' + highScore;
        }
      }
    });
  }
  
  function fireBullet() 
  {
    bullet = bullets.getFirstExists(false);
    if (bullet) {
      bullet.reset(player.x, player.y - 20);
      bullet.body.velocity.y = -400;
    }
  }
  
  function bulletHitEnemy(bullet, enemy) 
  {
    bullet.kill();
    enemy.kill();
    score++;
    scoreText.text = 'Score: ' + score;
    if (score > highScore) 
    {
      highScore = score;
      localStorage.setItem('highscore', highScore);
      highScoreText.text = 'High Score: ' + highScore;
    }
  }
  
  function playerHitEnemy(player, enemy) 
  {
    enemy.kill();
    player.kill();
    alert('Game over! Your score is ' + score);
    if (score > highScore) 
    {
      highScore = score;
      localStorage.setItem('highscore', highScore);
      highScoreText.text = 'High Score: ' + highScore;
    }
    function create () 
    {
      this.add.image(400, 300, 'sky');
    }
  }
   
  
  
  // no lo borro por que quiero tener este codigo para futuras referencias
  
  
  //const canvas = document.querySelector('canvas')
  //const C = canvas.getContext('2d')
  
  // class Player{
//   constructor(){
//     this.velocity = {
//       x:0,
//       y:0
//     }
//     this.rotation = 0

//     const image = new image()
//     image.src ='Nave','./assets/spaceship.png'
//     image.onload = () => {
//       const scale = 0.15
//       this.image = image
//       this.width = image.width * scale
//       this.height = image.height * scale
//       this.position ={
//         x: canvas.width / 2 - this.width / 2,
//         y: canvas.height - this.height - 20
//       }  
//     }
   
//   }
//   draw() {
//     C.save()
//     C.translate(player.position.x + player.width / 2,
//     player.position.y + player.height / 2 )

//     C.rotate(this.rotation)

//     C.translate(
//       -player.position.x - player.width / 2,
//     -player.position.y - player.height / 2 )

//     C.drawImage(
//       this.image,
//       this.position.x,
//       this.position.y,
//       this.width,
//       this.height
//     )
//     C.restore()
//   }
//   udate(){
//     if(this.image){
//       this.draw()
//       this.position.x += this.velocity.x
//     }
//   }
// }
// const player = new player()
// const keys = {
//   a: {
//     pressed: false
//   },
//   d: {
//     pressed: false
//   },
//   space: { 
//     pressed: false
//   }
// }

// function animate (){
//   requestAnimationFrame (animate)
//   //C.flellStyle = 'black'
//   //C.fillRect(0,0,canvas.width,Canvas.height)
//   player.udate()

//   if(keys.a.pressed && player.preload.x >= 0){
//     player.velocity.x = -7
//     player.rotate = -0.15
//   }else if (
//     keys.d.pressed && 
//     player.position.x + player.width <= canvas.clientWidth
//   ){
//     player.velocity.x = 7
//     player.rotate = 0.15
//   }else{
//     player.velocity.x = 0
//     player.rotate = 0
//   }
// }

// animate()




