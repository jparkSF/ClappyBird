# ScreamBird (Javascript Game)

## Game Concept
ScreamBird is another version of [Flappy Bird](https://www.google.com/search?q=flappy+bird&oq=flappy+bird&aqs=chrome..69i57.5039j0j1&sourceid=chrome&ie=UTF-8).
However, the key difference of this game from the original version is to use audio device(built-in microphone) to simulate the touch function to keep the bird flying in the air.

* This game will not work if user does not allow microphone access from the browser. 
* If that is the case, developing the game to use keys or mouse click to activate the movement of the bird.

## Game Play

* Once the game starts, the progress is the same as the original game.
* User attempts to fly the bird between columns of green pipes without hitting them. 
* As the bird travels furthur down, the difficulty of passing each oncoming pipes will get harder. 

## Key Dev Point

* The distance of the bird's each jump depends on the audio level that the user has input.
* The louder the user screams, the higher the bird will fly within the range


## Expected Struggles in Dev

* Integrating audio component and browser api with JS
* Adequate UI




