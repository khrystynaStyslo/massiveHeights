(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _StartGame = require('states/StartGame');

var _StartGame2 = _interopRequireDefault(_StartGame);

var _Preload = require('states/Preload');

var _Preload2 = _interopRequireDefault(_Preload);

var _Play = require('states/Play');

var _Play2 = _interopRequireDefault(_Play);

var _GameOver = require('states/GameOver');

var _GameOver2 = _interopRequireDefault(_GameOver);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null));

		_this.state.add('Preload', _Preload2.default, false);
		_this.state.add('StartGame', _StartGame2.default, false);
		_this.state.add('Play', _Play2.default, false);
		_this.state.add('GameOver', _GameOver2.default, false);
		_this.state.start('Preload');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/GameOver":2,"states/Play":3,"states/Preload":4,"states/StartGame":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Preload2 = require('./Preload');

var _Preload3 = _interopRequireDefault(_Preload2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var background = void 0,
    playBtn = void 0,
    soundGameOver = void 0,
    gameOver = void 0;

var GameOver = function (_Preload) {
  _inherits(GameOver, _Preload);

  function GameOver() {
    _classCallCheck(this, GameOver);

    return _possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
  }

  _createClass(GameOver, [{
    key: 'create',
    value: function create() {
      background = this.add.sprite(0, 0, 'background');
      gameOver = this.add.sprite(this.game.world.centerX - 232, this.game.world.centerY - 200, 'timeOut');

      playBtn = this.add.button(this.game.world.centerX - 184, this.game.world.centerY, 'btnPlay', startPlay, this, 2, 1, 0);

      soundGameOver = this.add.audio('gameOver', 1, false);

      this.time.events.add(Phaser.Timer.SECOND * 0.5, timeUp, this);
    }
  }]);

  return GameOver;
}(_Preload3.default);

function timeUp() {
  soundGameOver.play();
}

function startPlay() {
  this.world.remove(gameOver);
  this.world.remove(playBtn);
  this.game.state.start('Play');
}

exports.default = GameOver;

},{"./Preload":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Preload2 = require('./Preload');

var _Preload3 = _interopRequireDefault(_Preload2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var background = void 0,
    soundBtn = void 0,
    scoreIcon = void 0,
    gems = void 0,
    gem = void 0,
    text = void 0,
    BOARD_COLS = void 0,
    BOARD_ROWS = void 0,
    backgroundMusic = void 0,
    killGemsSound = void 0,
    selectedGem = void 0,
    MARGIN_LEFT = void 0,
    MARGIN_TOP = void 0,
    selectedStartPos = void 0;

var tempShiftedGem = null,
    GEM_SIZE = 70,
    MATCH_MIN = 3;

var Play = function (_Preload) {
  _inherits(Play, _Preload);

  function Play() {
    _classCallCheck(this, Play);

    return _possibleConstructorReturn(this, (Play.__proto__ || Object.getPrototypeOf(Play)).apply(this, arguments));
  }

  _createClass(Play, [{
    key: 'create',
    value: function create() {
      background = this.add.sprite(0, 0, 'background');

      var scoreFont = { font: "30px Fredoka One", fill: "#fff", align: "center" };
      scoreIcon = this.add.sprite(window.innerWidth - 220, 0, 'score');
      scoreIcon.width = 200;
      scoreIcon.height = 150;

      text = this.add.text(window.innerWidth - 130, 45, "", scoreFont);
      text.score = 0;

      soundBtn = this.add.button(window.innerWidth - 120, window.innerHeight - 120, 'btnSound', handleMusic, this, 2, 1, 0);
      soundBtn.width = 100;
      soundBtn.height = 100;

      backgroundMusic = this.add.audio('backgroundSound', 1, true);
      backgroundMusic.play();

      killGemsSound = this.add.audio('killGems', 1, false);

      this.time.events.add(Phaser.Timer.MINUTE * 3, gameOver, this);

      MARGIN_LEFT = this.game.world.centerX - 280;
      MARGIN_TOP = this.game.world.centerY - 240;

      gems = this.add.group();
      gems.x = MARGIN_LEFT;
      gems.y = MARGIN_TOP;

      this.time.events.add(100, createBoard, this);

      selectedStartPos = {
        x: MARGIN_LEFT,
        y: MARGIN_TOP
      };

      this.input.addMoveCallback(slideGem, this);
    }
  }, {
    key: 'update',
    value: function update() {
      text.text = ~~text.score;
    }
  }, {
    key: 'render',
    value: function render() {
      this.game.debug.text('You time: ' + (this.game.time.events.duration / 60000).toFixed(1) + ' minutes', 15, 30, '#646464', '20px Fredoka One');
      this.game.debug.text("", window.innerWidth - 155, 45);
    }
  }]);

  return Play;
}(_Preload3.default);

function handleMusic() {
  backgroundMusic.mute = !backgroundMusic.mute;
}

function gameOver() {
  backgroundMusic.pause();
  this.game.state.start('GameOver');
}

function createBoard() {
  BOARD_COLS = 7;
  BOARD_ROWS = 7;

  for (var i = 0; i < BOARD_COLS; i++) {
    for (var j = 0; j < BOARD_ROWS; j++) {
      gem = gems.create(i * GEM_SIZE, j * GEM_SIZE, "gems");
      gem.name = 'gem' + i.toString() + 'x' + j.toString();
      gem.inputEnabled = true;
      gem.events.onInputDown.add(selectGem, this);
      gem.events.onInputUp.add(releaseGem, this);
      gem.frame = Math.floor(Math.random() * gem.animations.frameTotal);
      setGemPos(gem, i, j);
    }
  }

  removeGems();

  this.time.events.add(200, dropGems, this);

  selectedGem = null;
  tempShiftedGem = null;
}

function releaseGem() {

  if (tempShiftedGem === null) {
    selectedGem = null;
    return;
  }

  var canKill = getAndKillMatches(selectedGem);
  canKill = getAndKillMatches(tempShiftedGem) || canKill;

  if (!canKill) {
    var _gem = selectedGem;

    if (_gem.posX !== selectedStartPos.x || _gem.posY !== selectedStartPos.y) {
      swapGemPosition(_gem, tempShiftedGem, this);
    }
  }

  removeGems();

  this.time.events.add(200, dropGems, this);
  this.time.events.add(300, changeBoard, this);

  selectedGem = null;
  tempShiftedGem = null;
}

function slideGem(pointer) {

  if (selectedGem && pointer.isDown) {

    var cursorGemPosX = Math.floor((this.input.x - MARGIN_LEFT) / GEM_SIZE);
    var cursorGemPosY = Math.floor((this.input.y - MARGIN_TOP) / GEM_SIZE);

    if (!(cursorGemPosY > BOARD_ROWS - 1 || cursorGemPosY < 0) && !(cursorGemPosX > BOARD_COLS - 1 || cursorGemPosX < 0)) {

      if (cursorGemPosX !== selectedGem.posX || cursorGemPosY !== selectedGem.posY) {

        if (tempShiftedGem !== null) {
          swapGemPosition(selectedGem, tempShiftedGem, this);
        }

        tempShiftedGem = getGem(cursorGemPosX, cursorGemPosY);

        if (tempShiftedGem === selectedGem) {
          tempShiftedGem = null;
        } else {
          swapGemPosition(selectedGem, tempShiftedGem, this);
        }
      }
    }
  }
}

function swapGemPosition(gem1, gem2, game) {
  game.add.tween(gem1).to({ x: gem2.posX * GEM_SIZE, y: gem2.posY * GEM_SIZE }, 200, Phaser.Easing.Linear.In, true);
  game.add.tween(gem2).to({ x: gem1.posX * GEM_SIZE, y: gem1.posY * GEM_SIZE }, 200, Phaser.Easing.Linear.In, true);

  var tempPosX = gem1.posX;
  var tempPosY = gem1.posY;

  setGemPos(gem1, gem2.posX, gem2.posY);
  setGemPos(gem2, tempPosX, tempPosY);
}

function getAndKillMatches(gem) {

  if (gem === null) {
    return;
  }

  var canKill = false;

  var countUp = countSameColorGems(gem, 0, -1);
  var countDown = countSameColorGems(gem, 0, 1);
  var countLeft = countSameColorGems(gem, -1, 0);
  var countRight = countSameColorGems(gem, 1, 0);

  var countHoriz = countLeft + countRight + 1;
  var countVert = countUp + countDown + 1;

  if (countVert >= MATCH_MIN) {
    killGemRange(gem.posX, gem.posY - countUp, gem.posX, gem.posY + countDown);
    addAmount(countVert > 4 ? 10 : countVert > 3 ? 5 : 3);
    killGemsSound.play();
    canKill = true;
  }

  if (countHoriz >= MATCH_MIN) {
    killGemRange(gem.posX - countLeft, gem.posY, gem.posX + countRight, gem.posY);
    addAmount(countHoriz > 4 ? 10 : countHoriz > 3 ? 5 : 3);
    killGemsSound.play();
    canKill = true;
  }

  return canKill;
}

function countSameColorGems(startGem, moveX, moveY) {

  var curX = startGem.posX + moveX;
  var curY = startGem.posY + moveY;
  var count = 0;

  while (curX >= 0 && curY >= 0 && curX < BOARD_COLS && curY < BOARD_ROWS && getGemColor(getGem(curX, curY)) === getGemColor(startGem)) {
    count++;
    curX += moveX;
    curY += moveY;
  }

  return count;
}

function killGemRange(fromX, fromY, toX, toY) {

  fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
  fromY = Phaser.Math.clamp(fromY, 0, BOARD_ROWS - 1);
  toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
  toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);

  for (var i = fromX; i <= toX; i++) {
    for (var j = fromY; j <= toY; j++) {
      var _gem2 = getGem(i, j);
      _gem2.kill();
    }
  }
}

function removeGems() {
  gems.forEach(function (gem) {
    if (!gem.alive) {
      setGemPos(gem, -1, -1);
    }
  });
}

function changeBoard() {
  for (var i = 0; i < BOARD_COLS; i++) {
    var gemsMissingFromCol = 0;

    for (var j = BOARD_ROWS - 1; j >= 0; j--) {
      var _gem3 = getGem(i, j);

      if (_gem3 === null) {
        gemsMissingFromCol++;
        _gem3 = gems.getFirstDead();
        _gem3.reset(i * GEM_SIZE, -gemsMissingFromCol * GEM_SIZE);
        _gem3.dirty = true;
        _gem3.frame = Math.floor(Math.random() * _gem3.animations.frameTotal);
        setGemPos(_gem3, i, j);
        this.add.tween(_gem3).to({ x: _gem3.posX * GEM_SIZE, y: _gem3.posY * GEM_SIZE }, 300, Phaser.Easing.Linear.In, true);
      }
    }
  }
}

function dropGems() {
  for (var i = 0; i < BOARD_COLS; i++) {
    var dropRowCount = 0;

    for (var j = BOARD_ROWS - 1; j >= 0; j--) {
      var _gem4 = getGem(i, j);

      if (_gem4 === null) {
        dropRowCount++;
      } else if (dropRowCount > 0) {
        _gem4.dirty = true;
        setGemPos(_gem4, _gem4.posX, _gem4.posY + dropRowCount);
        this.add.tween(_gem4).to({ x: _gem4.posX * GEM_SIZE, y: _gem4.posY * GEM_SIZE }, 200, Phaser.Easing.Linear.In, true);
      }
    }
  }
}

function setGemPos(gem, posX, posY) {
  gem.posX = posX;
  gem.posY = posY;
  gem.id = posX + posY * BOARD_COLS;
}

function getGemColor(gem) {
  return gem.frame;
}

function getGem(posX, posY) {
  return gems.iterate("id", posX + posY * BOARD_COLS, Phaser.Group.RETURN_CHILD);
}

function selectGem(gem) {
  selectedGem = gem;
  selectedStartPos.x = gem.posX;
  selectedStartPos.y = gem.posY;
}

function addAmount(amount) {
  text.score += amount;
}

exports.default = Play;

},{"./Preload":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Preload = function (_Phaser$State) {
  _inherits(Preload, _Phaser$State);

  function Preload() {
    _classCallCheck(this, Preload);

    return _possibleConstructorReturn(this, (Preload.__proto__ || Object.getPrototypeOf(Preload)).apply(this, arguments));
  }

  _createClass(Preload, [{
    key: 'preload',
    value: function preload() {
      this.load.spritesheet('gems', 'assets/images/game/gem.png', 70, 70);

      this.load.image('timeOut', 'assets/images/timeup.png');
      this.load.image('logo', 'assets/images/donuts_logo.png');
      this.load.image('btnPlay', 'assets/images/btn-play.png');
      this.load.image('background', 'assets/images/backgrounds/background.jpg');
      this.load.image('btnSound', 'assets/images/btn-sfx.png');
      this.load.image('score', 'assets/images/bg-score.png');

      this.load.image('gem2', 'assets/images/game/gem-02.png');
      this.load.image('gem3', 'assets/images/game/gem-03.png');
      this.load.image('gem4', 'assets/images/game/gem-04.png');
      this.load.image('gem5', 'assets/images/game/gem-05.png');
      this.load.image('gem6', 'assets/images/game/gem-06.png');

      this.load.audio('backgroundSound', 'assets/audio/background.mp3');
      this.load.audio('gameOver', 'assets/audio/kill.mp3');
      this.load.audio('killGems', 'assets/audio/select-3.mp3');
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.start('StartGame');
    }
  }]);

  return Preload;
}(Phaser.State);

exports.default = Preload;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _Preload2 = require('./Preload');

var _Preload3 = _interopRequireDefault(_Preload2);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var logo = void 0,
    soundBtn = void 0,
    background = void 0,
    backgroundMusic = void 0,
    playBtn = void 0;

var StartGame = function (_Preload) {
	_inherits(StartGame, _Preload);

	function StartGame() {
		_classCallCheck(this, StartGame);

		return _possibleConstructorReturn(this, (StartGame.__proto__ || Object.getPrototypeOf(StartGame)).apply(this, arguments));
	}

	_createClass(StartGame, [{
		key: 'create',
		value: function create() {
			var center = { x: this.game.world.centerX, y: this.game.world.centerY };

			background = this.add.sprite(0, 0, 'background');

			soundBtn = this.add.button(window.innerWidth - 120, window.innerHeight - 120, 'btnSound', handleMusic, this, 2, 1, 0);
			soundBtn.width = 100;
			soundBtn.height = 100;

			backgroundMusic = this.add.audio('backgroundSound', 1, true);
			backgroundMusic.play();

			this.physics.startSystem(Phaser.Physics.ARCADE);

			logo = this.add.sprite(center.x - 302, 20, 'logo');

			playBtn = this.add.button(center.x - 143, window.innerHeight - 250, 'btnPlay', startPlay, this, 2, 1, 0);
		}
	}]);

	return StartGame;
}(_Preload3.default);

function startPlay() {
	backgroundMusic.pause();
	this.world.remove(playBtn);
	this.world.remove(logo);
	this.game.state.start('Play');
}

function handleMusic() {
	backgroundMusic.mute = !backgroundMusic.mute;
}

exports.default = StartGame;

},{"./Preload":4}]},{},[1])
//# sourceMappingURL=game.js.map
