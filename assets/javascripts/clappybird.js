import Board from './board';
import Bird from './bird';


const board = new Board();
const bird = new Bird();


export const game = () => {
  board.setup();
  bird.setup();
}



game();





