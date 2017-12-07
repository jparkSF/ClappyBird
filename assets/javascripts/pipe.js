class Pipe{
  constructor(){
    // recommended this.y values are betwee -270 to -75
    // recommended this.x values are between -40 to 350
    
    this.y = this.getRandomInt(-270, -75);
    this.x = 450;
    this.space = 550;
    this.pipe = document.getElementById('sheet');
  }
 

  getRandomInt() {
    const min = Math.ceil(-270);
    const max = Math.floor(-50);
    return Math.floor(Math.random() * (max - min)) + min
  }


  update(){
    this.x -= 2;
    console.log(this.x); 
  }

  render(ctx){
    // console.log(this.x);
    //top pipe


    ctx.drawImage(this.pipe, 554, 0, 52, 650, this.x, this.y, 40, 600);

    //botton pipe
    ctx.drawImage(this.pipe, 502, 0, 52, 650, this.x, this.y+this.space, 40, 600);
    
    
  }
}

export default Pipe;