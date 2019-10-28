import Preload from './Preload';

let background,
  soundBtn,
  scoreIcon,
  gems,
  gem,
  text,
  BOARD_COLS,
  BOARD_ROWS,
  backgroundMusic,
  killGemsSound,
  selectedGem,
  MARGIN_LEFT,
  MARGIN_TOP,
  selectedStartPos;

var tempShiftedGem = null,
  GEM_SIZE = 70,
  MATCH_MIN = 3;

class Play extends Preload {
  create() {
    background = this.add.sprite(0,0,'background');

    var scoreFont = { font: "30px Fredoka One", fill: "#fff", align: "center" };
    scoreIcon = this.add.sprite(window.innerWidth - 220,0,'score');
    scoreIcon.width = 200;
    scoreIcon.height = 150;

    text = this.add.text(window.innerWidth - 130,45,"",scoreFont);
    text.score = 0;

    soundBtn = this.add.button(window.innerWidth - 120,window.innerHeight - 120, 'btnSound', handleMusic, this, 2, 1, 0);
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
      y: MARGIN_TOP,
    };

    this.input.addMoveCallback(slideGem, this);
  }

  update() {
    text.text=~~text.score;
  }

  render() {
    this.game.debug.text(`You time: ${(this.game.time.events.duration / 60000).toFixed(1)} minutes`, 15, 30, '#646464', '20px Fredoka One');
    this.game.debug.text("",window.innerWidth - 155,45);
  }

}

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

  for (let i = 0; i < BOARD_COLS; i++)
  {
    for (let j = 0; j < BOARD_ROWS; j++)
    {
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

  let canKill = getAndKillMatches(selectedGem);
  canKill = getAndKillMatches(tempShiftedGem) ||  canKill;

  if(!canKill) {
    let gem = selectedGem;

    if (gem.posX !== selectedStartPos.x || gem.posY !== selectedStartPos.y)
    {
      swapGemPosition(gem, tempShiftedGem, this);
    }
  }

  removeGems();

  this.time.events.add(200, dropGems, this);
  this.time.events.add( 300, changeBoard, this);

  selectedGem = null;
  tempShiftedGem = null;

}

function slideGem(pointer) {

  if (selectedGem && pointer.isDown) {

    let cursorGemPosX = Math.floor((this.input.x - MARGIN_LEFT) / GEM_SIZE);
    let cursorGemPosY = Math.floor((this.input.y - MARGIN_TOP) / GEM_SIZE);

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
  game.add.tween(gem1).to({x:gem2.posX * GEM_SIZE, y:gem2.posY * GEM_SIZE}, 200, Phaser.Easing.Linear.In, true);
  game.add.tween(gem2).to({x:gem1.posX * GEM_SIZE, y:gem1.posY * GEM_SIZE}, 200, Phaser.Easing.Linear.In, true);

  const tempPosX = gem1.posX;
  const tempPosY = gem1.posY;

  setGemPos(gem1, gem2.posX, gem2.posY);
  setGemPos(gem2, tempPosX, tempPosY);
}

function getAndKillMatches(gem) {

  if (gem === null) { return; }

  let canKill = false;

  const countUp = countSameColorGems(gem, 0, -1);
  const countDown = countSameColorGems(gem, 0, 1);
  const countLeft = countSameColorGems(gem, -1, 0);
  const countRight = countSameColorGems(gem, 1, 0);

  const countHoriz = countLeft + countRight + 1;
  const countVert = countUp + countDown + 1;

  if (countVert >= MATCH_MIN)
  {
    killGemRange(gem.posX, gem.posY - countUp, gem.posX, gem.posY + countDown);
    addAmount(countVert > 4 ? 10 : countVert > 3 ? 5 : 3);
    killGemsSound.play();
    canKill = true;
  }

  if (countHoriz >= MATCH_MIN)
  {
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

  while (curX >= 0 && curY >= 0 && curX < BOARD_COLS && curY < BOARD_ROWS && getGemColor(getGem(curX, curY)) === getGemColor(startGem))
  {
    count++;
    curX += moveX;
    curY += moveY;
  }

  return count;

}

function killGemRange(fromX, fromY, toX, toY) {

  fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
  fromY = Phaser.Math.clamp(fromY , 0, BOARD_ROWS - 1);
  toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
  toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);

  for (let i = fromX; i <= toX; i++)
  {
    for (let j = fromY; j <= toY; j++)
    {
      let gem = getGem(i, j);
      gem.kill();
    }
  }

}

function removeGems() {
  gems.forEach(function(gem) {
    if (!gem.alive) {
      setGemPos(gem, -1,-1);
    }
  });
}

function changeBoard() {
  for (let i = 0; i < BOARD_COLS; i++)
  {
    let gemsMissingFromCol = 0;

    for (let j = BOARD_ROWS - 1; j >= 0; j--)
    {
      let gem = getGem(i, j);

      if (gem === null)
      {
        gemsMissingFromCol++;
        gem = gems.getFirstDead();
        gem.reset(i * GEM_SIZE, -gemsMissingFromCol * GEM_SIZE);
        gem.dirty = true;
        gem.frame = Math.floor(Math.random() * gem.animations.frameTotal);
        setGemPos(gem, i, j);
        this.add.tween(gem).to({x:gem.posX * GEM_SIZE, y:gem.posY * GEM_SIZE}, 300, Phaser.Easing.Linear.In, true);
      }
    }
  }
}

function dropGems() {
  for (let i = 0; i < BOARD_COLS; i++)
  {
    let dropRowCount = 0;

    for (let j = BOARD_ROWS - 1; j >= 0; j--)
    {
      let gem = getGem(i, j);

      if (gem === null)
      {
        dropRowCount++;
      }
      else if (dropRowCount > 0)
      {
        gem.dirty = true;
        setGemPos(gem, gem.posX, gem.posY + dropRowCount);
        this.add.tween(gem).to({x:gem.posX * GEM_SIZE, y:gem.posY * GEM_SIZE}, 200, Phaser.Easing.Linear.In, true);
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

function addAmount(amount){
  text.score += amount;
}

export default Play;
