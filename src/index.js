
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
    create: create,
    update: update
  }

};
keys:
new Phaser.Game(config);

var player= null;
var bullets= null;
var enemies;
var score = 0;
var highScore = localStorage.getItem('highscore') || 0;
var scoreText;

  
function preload() 
  {
    //load assets like player image, enemy spritesheet, etc.
    this.load.image('sky', 'assets/Background.png');
    this.load.image('player','assets/spaceship.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('bala', 'assets/Bala.png');
  }
  
function create() 
  {
    // Create player object
    this.add.image(400, 300, 'sky');
    player = this.physics.add.sprite(config.width /2 , 500, 'player');
    this.keys = this.input.keyboard.addKeys("A,D,SPACE");
    //player.anchor.setTo(0.5, 0.5);
    
    // // Set up bullets as a group with object pooling
    bullets = this.physics.add.group({
      defaultKey:"bala", maxSize: 100
    });
    // bullets.enableBody = true;
    // bullets.physicsBodyType = Phaser.Physics.ARCADE;
    // bullets.createMultiple(30, 'bullet');
    // bullets.setAll('anchor.x', 0.5);
    // bullets.setAll('anchor.y', 1);
    // bullets.setAll('outOfBoundsKill', true);
    // bullets.setAll('checkWorldBounds', true);
    
    // // Create enemy group with physics enabled
   enemies = this.physics.add.group({
    key:'enemy', repeat: 5,  setXY: {x:20, y:45, stepX: 50} 
   });
  
    
    // // Add enemy sprites to the group
    // for (var i = 0; i < 10; i++) 
    // {
    //   var enemy = enemies.create(i * 48, 0, 'enemy');
    //   enemy.anchor.setTo(0.5, 0.5);
    //   enemy.animations.add('move', [0, 1, 2, 3], 10, true);
    //   enemy.play('move');
    //   enemy.body.velocity.y = 50 + Math.random() * 100;
    // }
  
    // // Add keyboard event listeners to move the player
    
    // // Set up score and high score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '30px', fill: '#00ff00' });
    //highScoreText = this.add.text(600, 16, 'High Score: ' + highScore, { fontSize: '32px', fill: '#fff' });
  }
  
  function update() 
  {
    if(score > highScore )
    {
      highScore = score;
    }
    scoreText.setText("Score: " + score + "   High Score: "+highScore);
    this.physics.add.overlap(bullets, enemies, hitEnemy, null, this);
    
    if(this.keys.SPACE.isDown)
    {
      fireBullet();
    }
    if (this.keys.A.isDown)
    {
        if(player.body.x > 0)
      {
           player.body.velocity.x = -150;
      }
      else
      {
        player.body.velocity.x = 0;
      }
    }
    else if (this.keys.D.isDown)
    {
        if(player.body.x < config.width - player.width)
      {
           player.body.velocity.x = 150;
      }
      else
      {
        player.body.velocity.x = 0;
      }
    }
     else
      {
        player.body.velocity.x = 0;
      }
    
    // // Check for bullet and enemy collision
    // this.physics.arcade.overlap(bullets, enemies, bulletHitEnemy, null, this);
    
    // // Check for player and enemy collision
    //this.physics.arcade.overlap(player, enemies, playerHitEnemy, null, this);
    
    // // Generate bullets on spacebar press
    // if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    //   fireBullet();
    // }
    
    // // Move enemies and update score
    // enemies.forEach(function(enemy) {
    //   enemy.body.position.y += enemy.body.velocity.y * this.time.physicsElapsed;
    //   if (enemy.body.position.y > this.world.height) 
    //   {
    //     enemy.body.position.y = 0;
    //     enemy.body.position.x = Math.random() * this.world.width;
    //     score++;
    //     scoreText.text = 'Score: ' + score;
    //     if (score > highScore) 
    //     {
    //       highScore = score;
    //       localStorage.setItem('highscore', highScore);
    //       highScoreText.text = 'High Score: ' + highScore;
    //     }
    //   }
    // });
  }

  function hitEnemy(bullet, alien)
{
  score += 100;
  bullet.destroy();
  var alienX = (Math.random() * 500);
  var alienY = (Math.random() * 500);
  alien.body.x = alienX;
  alien.body.y = alienY;
}
  
   function fireBullet() 
  {
   var bullet = bullets.get(player.x, player.y);
   if (bullet)
   {
    bullet.body.velocity.y = -200;
   }  
  }
  
  
  // function bulletHitEnemy(bullet, enemy) 
  // {
  //   bullet.kill();
  //   enemy.kill();
  //   score++;
  //   scoreText.text = 'Score: ' + score;
  //   if (score > highScore) 
  //   {
  //     highScore = score;
  //     localStorage.setItem('highscore', highScore);
  //     highScoreText.text = 'High Score: ' + highScore;
  //   }
  // }
  
  // function playerHitEnemy(player, enemy) 
  // {
  //   enemy.kill();
  //   player.kill();
  //   alert('this over! Your score is ' + score);
  //   if (score > highScore) 
  //   {
  //     highScore = score;
  //     localStorage.setItem('highscore', highScore);
  //     highScoreText.text = 'High Score: ' + highScore;
  //   }
    
  // }
   
  
  
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




