import Preload from './Preload';

let background,
  playBtn,
  soundGameOver,
  gameOver;

class GameOver extends Preload {
  create() {
    background = this.add.sprite(0,0,'background');
    gameOver = this.add.sprite(this.game.world.centerX - 232, this.game.world.centerY - 200,'timeOut');

    playBtn = this.add.button(this.game.world.centerX - 184, this.game.world.centerY, 'btnPlay', startPlay, this, 2, 1, 0);

    soundGameOver = this.add.audio('gameOver', 1, false);

    this.time.events.add(Phaser.Timer.SECOND * 0.5, timeUp, this);
  }
}

function timeUp() {
  soundGameOver.play();
}

function startPlay() {
  this.world.remove(gameOver);
  this.world.remove(playBtn);
  this.game.state.start('Play');
}

export default GameOver;
