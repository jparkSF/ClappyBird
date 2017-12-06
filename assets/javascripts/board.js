

class Board {
  setup() {
    this.backgroundPos = 0;
    this.foregroundPos = 0;
    this.backgroundSpeed = 0.7;
    this.foregroundSpeed = 2;
    this.backgroundWidth = 350;
    this.birdPosY = 250;
    this.freeFall = 7;

    this.fillBoard();
    this.loop();
  }

  loop() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // add eventlistener to boost the bird's position up
    document.addEventListener('keypress', (e) => {
      if (e.which === 32) {
        this.birdPosY -= 2.5;
        // console.log(e.key)
        console.log(this.birdPosY);
      }
    })
    this.updatePosition();

    this.render();
  }

  fillBoard() {

    this.canvas = document.getElementById('canvas');
    this.canvas.width = 350;
    this.canvas.height = 600;


    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillRect(0, 0, 350, 600);

    // Drawing sky background
    this.backgroundSky = document.getElementById('sky');
    this.ctx.drawImage(this.backgroundSky, 0, 0, 350, 400);
    // Drawing inner layer
    this.background = document.getElementById('sheet');
    this.ctx.drawImage(this.background, 0, 0, 275, 350, 0, 250, 350, 600);
    // Drawing outter layer(top layer)
    this.foreground = document.getElementById('sheet');
    this.ctx.drawImage(this.foreground, 277, 0, 222, 252, 0, 480, 350, 300);
    // drawing bird
    this.bird = document.getElementById('sheet');
    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);

  }

  updatePosition() {
    this.backgroundPos -= this.backgroundSpeed;
    this.foregroundPos -= this.foregroundSpeed;
    this.birdPosY += this.freeFall;

    if (this.backgroundPos < -this.backgroundWidth) {
      this.backgroundPos = 0;
    }

    if (this.foregroundPos < -this.backgroundWidth) {
      this.foregroundPos = 0;
    }

    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);

   
  }



  render() {
    this.ctx.drawImage(this.backgroundSky, 0, 0, 350, 400);
    for (let i = 0; i <= this.canvas.width / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.background, 0, 0, 275, 350, this.backgroundPos + i * this.backgroundWidth, 250, this.backgroundWidth, 600);
    }

    for (let i = 0; i <= this.backgroundWidth / this.backgroundWidth + 1; i++) {
      this.ctx.drawImage(this.foreground, 277, 0, 222, 252, this.foregroundPos + i * this.backgroundWidth, 482, this.backgroundWidth, 300);
    }

    this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);
    window.requestAnimationFrame(this.loop.bind(this));

  }
}

export default Board;