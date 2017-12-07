class Pipe{
  constructor(x = 3){
    // recommended this.y values are betwee -270 to -75
    // recommended this.x values are between -40 to 350
    
    this.y = this.getRandomInt(-300, -100);
    
    this.x = 400; //starting point offset screen
    this.space = 500; //space between top and bottom of same col
    this.pipe = document.getElementById('sheet');
    this.dX = x

 
    
  }
 

  getRandomInt() {
    const min = Math.ceil(-270);
    const max = Math.floor(-50);
    return Math.floor(Math.random() * (max - min)) + min
  }


  update(){
    this.x -= this.dX;





  }
 

  render(ctx){
    //top pipe
    ctx.drawImage(this.pipe, 554, 0, 52, 650, this.x, this.y, 40, 600);
  
    //bottom pipe
    ctx.drawImage(this.pipe, 502, 0, 52, 650, this.x, this.y+this.space, 40, 600);
  }
}

export default Pipe;