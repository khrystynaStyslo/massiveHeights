import StartGame from 'states/StartGame';
import Preload from 'states/Preload';
import Play from 'states/Play';
import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

	constructor() {
		super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
		this.state.add('Preload', Preload,false);
		this.state.add('StartGame', StartGame,false);
		this.state.add('Play', Play, false);
		this.state.add('GameOver', GameOver, false);
		this.state.start('Preload');
	}
}

new Game();
