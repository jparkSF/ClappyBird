import Board from './board';
import Bird from './bird';


const board = new Board();
const bird = new Bird();


export const backgroundLoop = () => {
  
  board.setup();
  // bird.setup();
}



backgroundLoop();



