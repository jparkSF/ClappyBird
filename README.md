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

## Architecture and Technologies

* Vanilla Javascript for overall structure and game logic
* `HTML5 Canvas` for DOM manipulation and rendering
* `Web Audio API` for sound generation, processing
* `p5.js` for creating graphic and interactive experiences
* Webpack to bundle and serve up the various scripts.


`bird.js` will contain the basic logic and movement of the bird object
`board.js` will hand the logic for creating and updating DOM elements and background.
`audio.js` will handle the audio logic and the creation of `AudioEvents` based on the input




## Key Dev Point

* The distance of the bird's each jump depends on the audio level that the user has input.
* The louder the user screams, the higher the bird will fly within the range

## Implementation Timeline

### Day 1: 
- [ ] Setup all necessary Node modules, and get the webpack up and running.
- [ ] create and render basic visual components of the map and bird.
- [ ] set the initial position of the bird before the games starts, and apply `gravity` after it starts

### Day 2:
- [ ] implement logic for accepting keyboard or mouse input to increase the y-position from the bird's position.
- [ ] set the limit on the y-position, so the bird doesn't go out of the canvas frame.

### Day 3:
- [ ] build the pipes block with different lengths and have them move to the left at certain speed.
- [ ] detect when the bird runs into one of the pipes, and reset the game.
- [ ] set the top and bottom pipes at the same column to have consistent space in between

### Day 4:
- [ ] develop the game to a point that it is playable without any bugs.
- [ ] implement `Web Audio API` to trigger the jump of the bird.
- [ ] add the time component to capture the duration of the game for records.
- [ ] finalize the app with graphics

### Day 5:
- [ ] Final touch up
- [ ] Debug if any


## Expected Struggles in Dev

* Integrating audio component and browser api with JS
* Adequate UI




