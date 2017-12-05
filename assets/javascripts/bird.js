class Bird{
  setup(){
    this.initBird();

  }

  initBird(){
    const canvas = document.getElementById('canvas');

    const ctx = canvas.getContext('2d');
    
    const bird = document.getElementById('sheet');
    
    ctx.drawImage(bird, 311, 230, 37, 24, 50, 200, 45, 30);
  }
}

export default Bird;