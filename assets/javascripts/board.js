import Pipe from './pipe';
import P5Lib from './p5/p5.sound.js';

class Board {
  setup() {
    this.backgroundPos = 0;
    this.foregroundPos = 0;
    this.backgroundSpeed = 0.7;
    this.foregroundSpeed = 2;
    this.backgroundWidth = 350;
    this.gravity = 1; //deafult G is 0.75
    this.negativeG = -10;
    this.frequency = 1000;
    this.birdPosY = 250;
    this.freeFall = 0;
    this.pipeX = 350;
    this.frames = 0;
    this.spriteIndex = 0;

    this.canvas = document.getElementById('canvas');
    this.canvas.width = 400;
    this.canvas.height = 600;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillRect(0, 0, 350, 600);
    
    
    this.pipes = [];
    const that = this;

    this.collided = false;

    

    setInterval(function(){
      const pipe = new Pipe();
     

      that.pipes.push(pipe);
      // console.log('# of elements in pipes array: ',that.pipes.length);
    },this.frequency)

    this.fillBoard();
    this.loop();


    // add eventlistener to boost the bird's position up
    document.addEventListener('keypress', e => {
      if (e.which === 32) {
        this.freeFall = this.negativeG;
        
      }
    })

    // add eventlistener to boost the bird's position up
  
    window.addEventListener('click', e => {
      this.freeFall = this.negativeG; 
    })

    document.addEventListener('touchstart', e => {
      e.preventDefault();
      this.freeFall = this.negativeG;
    })

    
    
    
  }

  loop() {
  
    // const vol = this.mic.getLevel();
    // console.log(this.mic);
    // console.log(vol);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
 

    this.updatePosition();
    this.render();
  }

  fillBoard() {
    // Drawing sky background
    this.backgroundSky = document.getElementById('sky');
    this.ctx.drawImage(this.backgroundSky, 0, 0, 400, 400);
    // Drawing inner layer
    this.background = document.getElementById('sheet');
    this.ctx.drawImage(this.background, 0, 0, 275, 350, 0, 250, 350, 600);
    // Drawing outter layer(top layer)
    this.foreground = document.getElementById('sheet');
    this.ctx.drawImage(this.foreground, 277, 0, 222, 252, 0, 500, 350, 300);

    // Drawing bird 
    this.bird = document.getElementById('sheet');
    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, 200, 45, 30);

  }

  updatePosition() {
    this.backgroundPos -= this.backgroundSpeed;
    this.foregroundPos -= this.foregroundSpeed;
    this.freeFall += this.gravity;
    this.birdPosY += this.freeFall;
    const xOffset = 127;

    if (this.backgroundPos < -this.backgroundWidth) {
      this.backgroundPos = 0;
    }

    if (this.foregroundPos < -this.backgroundWidth) {
      this.foregroundPos = 0;
    }

    if (this.birdPosY >= this.canvas.height-xOffset){
      this.freeFall = 0;
      this.birdPosY = this.canvas.height-xOffset;
      
    } else if (this.birdPosY <= 0) {
      this.birdPosY = 0
    }

      // console.log(this.birdPosY);

    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);   
  }

  drawPipes(){
    const that = this;

    this.pipes.forEach(function(pipe){
      pipe.update();
      pipe.render(that.ctx);
      
      
      that.checkCollision(pipe);

      if (that.collided === true) {
        pipe.dX = 0;
      }
    })    
  }

  checkCollision(pipe){
    
    // if ((this.birdPosY < 370+pipe.y) && (pipe.x < 95)){
    //   // this.collided = true;
    //   console.log('==============')  
    //   console.log('bird position x: ',95);
    //     console.log('bird position y: ',this.birdPosY);
    //   console.log('----------------')
    //   console.log('pipe position x: ', pipe.x);
    //     console.log('pipe position y: ',270+pipe.y);
    //     console.log('==============')
    
    // } else {
     
    // }
    // if ((this.birdPosY+30 > 370-pipe.y+500 ) && (pipe.x < 95)){
    //   this.collided = true;
    // }
  }

  render() {
    this.frames++;

    
    this.ctx.drawImage(this.backgroundSky, 0, 0, 400, 400);
    for (let i = 0; i <= this.canvas.width / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.background, 0, 0, 275, 350, this.backgroundPos + i * this.backgroundWidth, 250, this.backgroundWidth, 600);
    }

    this.drawPipes();  

    for (let i = 0; i <= this.backgroundWidth / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.foreground, 277, 0, 222, 252, this.foregroundPos + i * this.backgroundWidth, 500, this.backgroundWidth, 300);
    }

    if (this.frames % 15 === 0) {
      
      this.spriteIndex = (this.spriteIndex + 1) % 3;
    }
    
    
    // 311,230(up)  311,256(mid)  311,282(down)
    switch(this.spriteIndex){
      case 0:
        this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);
        break;
      case 1:
        this.ctx.drawImage(this.bird, 311, 256, 37, 24, 50, this.birdPosY, 45, 30);
        break;
      case 2:
        this.ctx.drawImage(this.bird, 311, 282, 37, 24, 50, this.birdPosY, 45, 30);
        break;

    }
    
    window.requestAnimationFrame(this.loop.bind(this));  
  }
}

export default Board;