/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = undefined;

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

var _bird = __webpack_require__(2);

var _bird2 = _interopRequireDefault(_bird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
var bird = new _bird2.default();

var game = exports.game = function game() {
  board.setup();
  bird.setup();
};

game();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pipe = __webpack_require__(3);

var _pipe2 = _interopRequireDefault(_pipe);

var _clappybird = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);
  }

  _createClass(Board, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      var that = this;
      this.backgroundPos = 0;
      this.foregroundPos = 0;
      this.backgroundSpeed = 0.7;
      this.foregroundSpeed = 2;
      this.backgroundWidth = 350;
      this.gravity = 1; //deafult G is 0.75
      this.negativeG = -10;
      this.frequency = 1000;
      this.dX = 0; //deafult dX is 3
      this.birdPosY = 250;
      this.freeFall = 0;
      this.pipeX = 350;
      this.frames = 0;
      this.spriteIndex = 0;

      this.canvas = document.getElementById('canvas');
      this.background = document.getElementById('sheet');
      this.canvas.width = 400;
      this.canvas.height = 600;

      this.ctx = this.canvas.getContext('2d');
      this.ctx.fillRect(0, 0, 350, 600);

      this.pipes = [];

      this.collided = false;
      this.intervalHandle = null;
      this.init = null;

      this.score = 1;

      if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      }

      var context = new AudioContext();

      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true }, function (e) {

          var filter = context.createBiquadFilter();
          that.microphone = context.createMediaStreamSource(e);

          // const meter = createAudioMeter(context)

          // console.log(meter);


          // microphone -> filter -> destination.
          that.microphone.connect(filter);
          filter.connect(context.destination);

          // console.log(that.microphone);

        }, function (e) {
          alert('Error capturing audio.');
        });
      } else {
        alert('getUserMedia not supported in this browser.');
      }

      this.intervalHandle = setInterval(function () {

        var pipe = new _pipe2.default(that.dX);
        that.pipes.push(pipe);

        if (that.pipes.length >= 4) {
          that.pipes.shift();

          that.score += 1;
        }

        // console.log('# of elements in pipes array: ',that.pipes.length);
      }, this.frequency);

      // add eventlistener to boost the bird's position up
      document.addEventListener('keypress', function (e) {
        if (e.which === 32) {
          _this.freeFall = _this.negativeG;
        }
      });

      // add eventlistener to boost the bird's position up
      window.addEventListener('click', function (e) {
        _this.freeFall = _this.negativeG;
      });

      document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        _this.freeFall = _this.negativeG;
      });

      this.fillBoard();
    }
  }, {
    key: 'loop',
    value: function loop() {
      // console.log(this.microphone.context.listener);

      // const vol = this.mic.getLevel();
      // console.log(this.mic);
      // console.log(vol);
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.updatePosition();
      this.render();
    }
  }, {
    key: 'fillBoard',
    value: function fillBoard() {
      // Drawing sky background
      this.backgroundSky = document.getElementById('sky');
      this.ctx.drawImage(this.backgroundSky, 0, 0, 400, 400);
      // Drawing inner layer
      this.background = document.getElementById('sheet');
      this.ctx.drawImage(this.background, 0, 0, 275, 350, 0, 250, 400, 600);
      // Drawing outter layer(top layer)
      this.foreground = document.getElementById('sheet');
      this.ctx.drawImage(this.foreground, 277, 0, 222, 252, 0, 500, 400, 300);

      // Drawing bird 
      this.bird = document.getElementById('sheet');
      this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, 200, 45, 30);

      //Title
      this.ctx.drawImage(this.background, 118, 229, 190, 40, this.canvas.width / 2 - 130, this.canvas.height / 2 - 60, 260, 80);
      //Tap button image
      // this.ctx.drawImage(this.background, 0, 229, 117, 100, this.canvas.width / 2 - 75, this.canvas.height / 2 + 50, 150, 150);
      var that = this;

      document.addEventListener('keypress', function initWithKey(e) {
        // 's' on key
        if (e.which === 115) {
          that.dX = 3;
          that.loop();
        }
      });
      document.addEventListener('keypress', function initWithKey(e) {
        // 's' on key
        if (e.which === 61) {
          that.dX = 5;
          this.negativeG = -25;
          this.gravity = 0.7;
          this.frequency = 2000;
          that.loop();
        }
      });

      // document.removeEventListener('keypress', initWithKey);

      // document.addEventListener('touchstart', function init(){
      //   e.preventDefault();
      //   that.dX = 3;
      //   that.loop();
      // })

    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      this.backgroundPos -= this.backgroundSpeed;
      this.foregroundPos -= this.foregroundSpeed;
      this.freeFall += this.gravity;
      this.birdPosY += this.freeFall;
      var xOffset = 127;

      if (this.backgroundPos < -this.backgroundWidth) {
        this.backgroundPos = 0;
      }

      if (this.foregroundPos < -this.backgroundWidth) {
        this.foregroundPos = 0;
      }

      if (this.birdPosY >= this.canvas.height - xOffset) {
        this.freeFall = 0;
        this.birdPosY = this.canvas.height - xOffset;
      } else if (this.birdPosY <= 0) {
        this.birdPosY = 0;
      }

      this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);
    }
  }, {
    key: 'drawPipes',
    value: function drawPipes() {
      var that = this;

      this.pipes.forEach(function (pipe) {

        pipe.update();
        pipe.render(that.ctx);

        that.checkCollision(pipe);
        if (that.collided === true) {
          pipe.dX = 0;
          clearInterval(that.intervalHandle);
          that.handleCollision();
        }
      });
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(pipe) {

      if (this.birdPosY < 370 + pipe.y && pipe.x < 95 && pipe.x <= 95 && pipe.x + 40 >= 50 && this.birdPosY < 370 + pipe.y) {
        this.collided = true;
      }

      if (this.birdPosY + 30 > 370 + pipe.y + 130 && pipe.x < 95 && pipe.x <= 95 && pipe.x + 40 >= 50 && this.birdPosY > 370 + pipe.y + 130) {
        this.collided = true;
      }
    }
  }, {
    key: 'handleCollision',
    value: function handleCollision() {
      this.ctx.drawImage(this.background, 118, 273, 190, 36, this.canvas.width / 2 - 130, this.canvas.height / 2 - 40, 260, 80);
      this.ctx.font = "30px Arial";
      this.ctx.fillText('Score: ' + this.score, 10, 50);
      //  this.setup();
    }
  }, {
    key: 'render',
    value: function render() {
      this.frames++;

      this.ctx.drawImage(this.backgroundSky, 0, 0, 400, 400);
      for (var i = 0; i <= this.canvas.width / this.backgroundWidth + 1; i++) {
        this.ctx.drawImage(this.background, 0, 0, 275, 350, this.backgroundPos + i * this.backgroundWidth, 250, this.backgroundWidth, 600);
      }

      this.drawPipes();

      for (var _i = 0; _i <= this.backgroundWidth / this.backgroundWidth + 1; _i++) {
        this.ctx.drawImage(this.foreground, 277, 0, 222, 252, this.foregroundPos + _i * this.backgroundWidth, 500, this.backgroundWidth, 300);
      }

      if (this.frames % 15 === 0) {

        this.spriteIndex = (this.spriteIndex + 1) % 3;
      }

      // 311,230(up)  311,256(mid)  311,282(down)
      switch (this.spriteIndex) {
        case 0:
          this.ctx.drawImage(this.bird, 311, 230, 37, 24, 50, this.birdPosY, 45, 30);
          break;
        case 1:
          this.ctx.drawImage(this.bird, 311, 256, 37, 24, 50, this.birdPosY, 45, 30);
          break;
        case 2:
          this.ctx.drawImage(this.bird, 311, 282, 37, 24, 50, this.birdPosY, 45, 30);
          break;

      }

      window.requestAnimationFrame(this.loop.bind(this));
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bird = function () {
  function Bird() {
    _classCallCheck(this, Bird);
  }

  _createClass(Bird, [{
    key: "setup",
    value: function setup() {

      // this.initBird();

    }
  }, {
    key: "initBird",
    value: function initBird() {
      // const canvas = document.getElementById('canvas');
      // const ctx = canvas.getContext('2d');
      // const bird = document.getElementById('sheet');

      // this.ctx.drawImage(bird, 311, 230, 37, 24, 50, 200, 45, 30);

    }
  }]);

  return Bird;
}();

exports.default = Bird;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pipe = function () {
  function Pipe(x) {
    _classCallCheck(this, Pipe);

    // recommended this.y values are betwee -270 to -75
    // recommended this.x values are between -40 to 350

    this.y = this.getRandomInt(-300, -100);

    this.x = 400; //starting point offset screen
    this.space = 500; //space between top and bottom of same col
    this.pipe = document.getElementById('sheet');
    this.dX = x;
  }

  _createClass(Pipe, [{
    key: 'getRandomInt',
    value: function getRandomInt() {
      var min = Math.ceil(-270);
      var max = Math.floor(-50);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }, {
    key: 'update',
    value: function update() {
      this.x -= this.dX;
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      //top pipe
      ctx.drawImage(this.pipe, 554, 0, 52, 650, this.x, this.y, 40, 600);

      //bottom pipe
      ctx.drawImage(this.pipe, 502, 0, 52, 650, this.x, this.y + this.space, 40, 600);
    }
  }]);

  return Pipe;
}();

exports.default = Pipe;

/***/ })
/******/ ]);