import Preload from './Preload';

let logo,
	soundBtn,
	background,
	backgroundMusic,
	playBtn;

class StartGame extends Preload {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY };

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		background = this.add.tileSprite(0,0, window.innerWidth, window.innerHeight,'background');

		soundBtn = this.add.button(window.innerWidth - 120,window.innerHeight - 120, 'btnSound', handleMusic, this, 2, 1, 0);
		soundBtn.width = 100;
		soundBtn.height = 100;

		backgroundMusic = this.add.audio('backgroundSound', 1, true);
		backgroundMusic.play();

		this.physics.startSystem(Phaser.Physics.ARCADE);

    logo = this.add.sprite(center.x - 302, 20, 'logo');

		playBtn = this.add.button(center.x - 143, window.innerHeight - 250, 'btnPlay', startPlay, this, 2, 1, 0);

	}
}

function startPlay() {
	backgroundMusic.pause();
	this.world.remove(playBtn);
	this.world.remove(logo);
	this.game.state.start('Play');
}

function handleMusic() {
	backgroundMusic.mute = !backgroundMusic.mute;
}

export default StartGame;
