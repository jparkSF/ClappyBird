class Board{
  setup(){
    this.initBoard();
  }

  initBoard(){
    const canvas = document.getElementById('canvas');
    canvas.width = 350;
    canvas.height = 600;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#70C5CF";
    ctx.fillRect(0 ,0,350,600);

    
    const background = document.getElementById('sheet');
    ctx.drawImage(background, 0,0,275,350,0,250,350, 600);
    
    const foreground = document.getElementById('sheet');
    ctx.drawImage(background, 276, 0, 223, 250, 0, 480, 350, 300);

  }
}

export default Board;