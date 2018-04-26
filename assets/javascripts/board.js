import Pipe from './pipe';
import {game} from './clappybird';

class Board {
  setup() {
    const that = this;
    this.backgroundPos = 0;
    this.foregroundPos = 0;
    this.backgroundSpeed = 0.7;
    this.foregroundSpeed = 2;
    this.backgroundWidth = 350;
    this.gravity = 1; //deafult G is 0.75
    this.negativeG = -10;
    this.frequency = 1000;
    this.dX = 0; //deafult dX is 3
    this.birdPosY = 250;
    this.freeFall = 0;
    this.pipeX = 350;
    this.frames = 0;
    this.spriteIndex = 0;

    this.canvas = document.getElementById('canvas');
    this.background = document.getElementById('sheet');
    this.canvas.width = 400;
    this.canvas.height = 600;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillRect(0, 0, 350, 600);
    
    this.pipes = [];

    this.collided = false;
    this.intervalHandle = null;
    this.init = null;

    this.score = 1;

    


    
    if (!navigator.getUserMedia) {
      navigator.getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;


    }

    // const context = new AudioContext();

    // if (navigator.getUserMedia) {
    //   navigator.getUserMedia({ audio: true },function(e){ 
        
        
        // const filter = context.createBiquadFilter();
        // that.microphone = context.createMediaStreamSource(e);

        // const meter = createAudioMeter(context)

        // console.log(meter);
        

        // microphone -> filter -> destination.
        // that.microphone.connect(filter);
        // filter.connect(context.destination);

        // console.log(that.microphone);

        

      

    // }, function (e) {
    //     alert('Error capturing audio.');
    //   });
    // } else {
    //   alert('getUserMedia not supported in this browser.');
    // }




    
    this.intervalHandle = setInterval(function(){
      
      const pipe = new Pipe(that.dX);
      that.pipes.push(pipe);
      
      if (that.pipes.length >= 4){
        that.pipes.shift();
        
        that.score += 1;
        
      }
      
      // console.log('# of elements in pipes array: ',that.pipes.length);
    },this.frequency)
  




    
    


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

   
    
    this.fillBoard();
  }

  loop() {
    // console.log(this.microphone.context.listener);
    
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
    this.ctx.drawImage(this.background, 0, 0, 275, 350, 0, 250, 400, 600);
    // Drawing outter layer(top layer)
    this.foreground = document.getElementById('sheet');
    this.ctx.drawImage(this.foreground, 277, 0, 222, 252, 0, 500, 400, 300);

    // Drawing bird 
    this.bird = document.getElementById('sheet');
    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, 200, 45, 30);
    
    //Title
    this.ctx.drawImage(this.background, 118, 229, 190, 40, this.canvas.width / 2 - 130, this.canvas.height / 2 - 60, 260, 80);
    //Tap button image
    // this.ctx.drawImage(this.background, 0, 229, 117, 100, this.canvas.width / 2 - 75, this.canvas.height / 2 + 50, 150, 150);
    const that = this;
    
      document.addEventListener('keypress',function initWithKey(e){
        // 's' on key
        if (e.which === 115){
          that.dX = 3;
          that.loop();
        }
      });
    document.addEventListener('keypress', function initWithKey(e) {
      // 's' on key
      if (e.which === 61) {
        that.dX = 5;
        this.negativeG = -25;
        this.gravity = 0.7;
        this.frequency = 2000;
        that.loop();
      }
    });
  
      // document.removeEventListener('keypress', initWithKey);

    // document.addEventListener('touchstart', function init(){
    //   e.preventDefault();
    //   that.dX = 3;
    //   that.loop();
    // })



      
    

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
          clearInterval(that.intervalHandle)
          that.handleCollision();
        }
      })   
    }

  checkCollision(pipe){
    
    if (((this.birdPosY < 370+pipe.y) && (pipe.x < 95)) &&
      (pipe.x <= 95 && pipe.x+40 >= 50 && this.birdPosY < 370 + pipe.y)){
      this.collided = true;
    }

    if (((this.birdPosY+30 > 370 + pipe.y + 130) && (pipe.x < 95)) &&
      ((pipe.x <= 95 && pipe.x + 40 >= 50 && this.birdPosY > 370 + pipe.y + 130))) {
      this.collided = true;      
    }
   }

   handleCollision(){  
     this.ctx.drawImage(this.background, 118, 273 , 190, 36, this.canvas.width/2-130, this.canvas.height/2 - 40, 260,80);
     this.ctx.font = "30px Arial";
     this.ctx.fillText(`Score: ${this.score}`, 10, 50);
    //  this.setup();
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