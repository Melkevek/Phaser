import Phaser from "phaser";

const canvas = document.querySelector('canvas')
const C = canvas.getContext('2d')

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
    //this.image =
    this.width = 100
    this.height - 100
  }
}
draw() {

  C.fillStyle = 'red'
  C.drawImage()
}

new Phaser.Game(config);

function preload () {
  this.load.image('sky', 'assets/sky.png');
}

function create () {
  this.add.image(400, 300, 'sky');
}
