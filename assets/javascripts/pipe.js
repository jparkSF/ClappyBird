class Pipe{
  draw(y,x,length,ctx){
    // recommended this.y values are betwee -270 to -50
    this.y = y;
    // recommended this.x values are between -40 to 350
    this.x = x;
    this.space = 500;
    this.length = length;
    
    this.ctx = ctx;


    
    this.pipe = document.getElementById('sheet');
    
    this.render();

  }

  render(){

    //top pipe
    this.ctx.drawImage(this.pipe, 554, 0, 52, 650, this.x, this.y, 40, 600);

    //botton pipe
    this.ctx.drawImage(this.pipe, 502, 0, 52, 650, this.x, this.y+this.space, 40, 600);
    
    
  }
}

export default Pipe;