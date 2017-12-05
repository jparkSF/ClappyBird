import { backgroundLoop } from './clappybird';

class Board{

  setup() {
    this.backgroundPos = 0;
    this.foregroundPos = 0;
    this.backgroundSpeed = 0.6;
    this.foregroundSpeed = 0.6;
    this.backgroundWidth = 350;
    
    this.fillBoard();
    this.loop();
    

  }


  
  loop(){
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.updatePosition();
    this.render();
  }
  


  fillBoard(){
    
    this.canvas = document.getElementById('canvas');
    this.canvas.width = 350;
    this.canvas.height = 600;

    this.ctx = this.canvas.getContext('2d');
    // this.ctx.fillStyle = "#70C5CF";
    this.ctx.fillRect(0 ,0,350,600);

    this.backgroundSky = document.getElementById('sky');
    this.ctx.drawImage(this.backgroundSky, 0, 0, 350, 400);

    
    
    this.background = document.getElementById('sheet');
    this.ctx.drawImage(this.background, 0,0,275,350,0,250,350, 600);
    
    this.foreground = document.getElementById('sheet');
    this.ctx.drawImage(this.foreground, 277, 0, 222, 252, 0, 480, 350, 300);
   
  }

  updatePosition(){
 
    this.backgroundPos -= this.backgroundSpeed;
    this.foregroundPos -= this.foregroundSpeed;
    this.foregroundPos = this.foregroundPos % this.canvas.width
    if (this.backgroundPos < -this.backgroundWidth){
      this.backgroundPos = 0;
    }

    // if (this.foregroundPos < -this.backgroundWidth){
    //   this.foregroundPos = 0;
    // }
    
  }



  render() {
    this.ctx.drawImage(this.backgroundSky, 0, 0, 350, 400);
    for(let i = 0; i <= this.canvas.width/this.backgroundWidth+1; i++){
      this.ctx.drawImage(this.background, 0, 0, 275, 350, this.backgroundPos+i*this.backgroundWidth, 250, this.backgroundWidth, 600);
      this.ctx.drawImage(this.foreground, 277, 0, 222, 252, this.foregroundPos+i*this.backgroundWidth, 482, this.backgroundWidth, 300);
      
      
    }
    window.requestAnimationFrame(this.loop.bind(this));  
    
  }
}

export default Board;