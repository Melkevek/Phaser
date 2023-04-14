import Phaser from "phaser";

//const canvas = document.querySelector('canvas')
//const C = canvas.getContext('2d')

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
class Player{
  constructor(){
    this.position={
      x: 200,
      y: 200
    }
    this.velocity = {
      x:0,
      y:0
    }
    this.rotation = 0

    const image = new image()
    image.src ='./assets/nave.png'
    image.onload = () => {
      const scale = 0.15
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position ={
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }  
    }
   
  }
  draw() {
    C.save()
    C.translate(player.position.x + player.width / 2,
    player.position.y + player.height / 2 )

    C.rotate(this.rotation)

    C.translate(
      -player.position.x - player.width / 2,
    -player.position.y - player.height / 2 )

    C.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
    C.restore()
  }
  udate(){
    if(this.image){
      this.draw()
      this.position.x += this.velocity.x
    }
  }
}
const player = new player()
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: { 
    pressed: false
  }
}

function animate (){
  requestAnimationFrame (animate)
  C.flellStyle = 'black'
  C.fillRect(0,0,canvas.width,Canvas.height)
  player.udate()

  if(keys.a.pressed && player.preload.x >= 0){
    player.velocity.x = -7
    player.rotate = -0.15
  }else if (
    keys.d.pressed && 
    player.position.x + player.width <= canvas.clientWidth
  ){
    player.velocity.x = 7
    player.rotate = 0.15
  }else{
    player.velocity.x = 0
    player.rotate = 0
  }
}

animate()




new Phaser.Game(config);

function preload () {
  this.load.image('sky', 'assets/sky.png');
}

function create () {
  this.add.image(400, 300, 'sky');
}
