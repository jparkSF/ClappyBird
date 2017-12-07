import Pipe from './pipe';

class Board {
  setup() {
    this.backgroundPos = 0;
    this.foregroundPos = 0;
    this.backgroundSpeed = 0.7;
    this.foregroundSpeed = 2;
    this.backgroundWidth = 350;
    this.negativeG = -10;
    this.frequency = 1500;
    this.birdPosY = 250;
    this.freeFall = 0;

    this.pipeX = 350;

    // recommended this.y values are betwee -270 to -50
 

    this.canvas = document.getElementById('canvas');
    this.canvas.width = 350;
    this.canvas.height = 600;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillRect(0, 0, 350, 600);
    
    const pipe = new Pipe();
    this.pipes = [pipe];
    const that = this;

    setInterval(function(){
      const pipe = new Pipe();
      that.pipes.push(pipe);
    },this.frequency)

    this.fillBoard();
    this.loop();


    // add eventlistener to boost the bird's position up
    document.addEventListener('keypress', e => {
      if (e.which === 32) {
        this.freeFall = this.negativeG;

      }
    })

    window.addEventListener('click', e => {
      this.freeFall = this.negativeG; 
    })
    
  }

  loop() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updatePosition();
    this.render();
  }

  fillBoard() {
    // Drawing sky background
    this.backgroundSky = document.getElementById('sky');
    this.ctx.drawImage(this.backgroundSky, 0, 0, 350, 400);
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
    this.freeFall += 0.75;
    this.birdPosY += this.freeFall;
    
    

    if (this.backgroundPos < -this.backgroundWidth) {
      this.backgroundPos = 0;
    }

    if (this.foregroundPos < -this.backgroundWidth) {
      this.foregroundPos = 0;
    }

    if (this.birdPosY >= this.canvas.height-30){
      this.freeFall = 0;
      this.birdPosY = this.canvas.height-30;
      
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
  
    })
  }

  render() {
    this.ctx.drawImage(this.backgroundSky, 0, 0, 350, 400);
    for (let i = 0; i <= this.canvas.width / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.background, 0, 0, 275, 350, this.backgroundPos + i * this.backgroundWidth, 250, this.backgroundWidth, 600);
    }

    this.drawPipes();  

    for (let i = 0; i <= this.backgroundWidth / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.foreground, 277, 0, 222, 252, this.foregroundPos + i * this.backgroundWidth, 500, this.backgroundWidth, 300);
    }

    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);
    window.requestAnimationFrame(this.loop.bind(this));  
  }
}

export default Board;