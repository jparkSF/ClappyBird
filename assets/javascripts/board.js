import Pipe from './pipe';

class Board {
  setup() {
    this.backgroundPos = 0;
    this.foregroundPos = 0;
    this.backgroundSpeed = 0.7;
    this.foregroundSpeed = 2;
    this.backgroundWidth = 350;
    this.negativeG = -16
    
    this.birdPosY = 250;
    this.freeFall = 0;

    this.pipeX = 350;

    // recommended this.y values are betwee -270 to -50
    this.pipeY = this.getRandomInt(-270, -50);

    this.canvas = document.getElementById('canvas');
    this.canvas.width = 350;
    this.canvas.height = 600;


    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillRect(0, 0, 350, 600);

    
    

    

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
    this.freeFall += 1.25;
    this.birdPosY += this.freeFall;
    this.pipeX -= 2
    

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
  getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min
  }

  drawPipes(){
    
    // recommended this.x values are between -40 to 350
    this.pipe1 = new Pipe(200, 200, 100, 5, this.ctx);
    this.pipe2 = new Pipe(200, 200, 100, 5, this.ctx);
    this.pipe3 = new Pipe(200, 200, 100, 5, this.ctx);
    const pipes = [this.pipe1, this.pipe2, this.pipe3];
    const pipeX = this.pipeX;
    
    for(let i=0; i<pipes.length; i++){
      pipes[i].draw(this.pipeY, pipeX, this.pipeY, this.ctx);
    }
    
    
    this.pipe1.draw(this.pipeY, pipeX, this.pipeY, this.ctx);
  }

  render() {
    this.ctx.drawImage(this.backgroundSky, 0, 0, 350, 400);
    for (let i = 0; i <= this.canvas.width / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.background, 0, 0, 275, 350, this.backgroundPos + i * this.backgroundWidth, 250, this.backgroundWidth, 600);
    }

    for (let i = 0; i <= this.backgroundWidth / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.foreground, 277, 0, 222, 252, this.foregroundPos + i * this.backgroundWidth, 500, this.backgroundWidth, 300);
    }

    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);
    window.requestAnimationFrame(this.loop.bind(this));

    this.drawPipes();  
    
  }


}

export default Board;