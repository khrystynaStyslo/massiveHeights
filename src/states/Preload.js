class Preload extends Phaser.State {
  preload() {
    this.load.spritesheet('gems', 'assets/images/game/gem.png', 70,70);

    this.load.image('timeOut', 'assets/images/timeup.png');
    this.load.image('logo', 'assets/images/donuts_logo.png');
    this.load.image('btnPlay', 'assets/images/btn-play.png');
    this.load.image('background', 'assets/images/backgrounds/background.jpg');
    this.load.image('btnSound', 'assets/images/btn-sfx.png');
    this.load.image('score','assets/images/bg-score.png');

    this.load.image('gem2', 'assets/images/game/gem-02.png');
    this.load.image('gem3', 'assets/images/game/gem-03.png');
    this.load.image('gem4', 'assets/images/game/gem-04.png');
    this.load.image('gem5', 'assets/images/game/gem-05.png');
    this.load.image('gem6', 'assets/images/game/gem-06.png');

    this.load.audio('backgroundSound', 'assets/audio/background.mp3');
    this.load.audio('gameOver', 'assets/audio/kill.mp3');
    this.load.audio('killGems', 'assets/audio/select-3.mp3');
  }

  create() {
    this.state.start('StartGame');
  }
}

export default Preload;
