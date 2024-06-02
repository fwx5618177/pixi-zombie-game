import { Application } from '@pixi/app';
import Item from '../components/Item';
import Map from '../components/Map';
import CharacterFactory from '../components/CharacterFactory';
import { ICharacter } from '../interfaces/ICharacter';
import SceneManager from '../scenes/SceneManager';
import ButtonManager from '../scenes/ButtonManager';

class Game {
  app: Application;
  characterFactory: CharacterFactory;
  characters: ICharacter[];
  items: Item[];
  map: Map;
  gameWidth: number;
  gameHeight: number;
  buttonManager: ButtonManager;
  sceneManager: SceneManager;

  constructor(app: Application, gameWidth: number, gameHeight: number) {
    this.app = app;

    this.characterFactory = new CharacterFactory(app, gameWidth, gameHeight);
    this.characters = [];
    this.items = [];
    this.map = new Map(app, 0, 0);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.buttonManager = new ButtonManager(app);
    this.sceneManager = new SceneManager(app);
    
    this.init();
  }

  init(): void {
    console.log('Game initialized');
    this.app.stage.addChild(this.map);

    this.sceneChange('game');
  }

  sceneChange(scene = 'game'): void {
    this.sceneManager.changeScene(scene);
    
    this.app.stage.on('startGame', () => {
        this.sceneManager.changeScene('game');
      });
  
      this.app.stage.on('endGame', () => {
        this.sceneManager.changeScene('end');
      });
  
      this.app.stage.on('restartGame', () => {
        this.sceneManager.changeScene('menu');
      });
  }

  gameLoop(delta: number): void {
    // Game loop logic
    this.characterFactory.simulateInteractions(this.characters);
    this.characters.forEach(character => {
      if (character.isAlive()) {
        character.animate(delta);
      } else {
        this.app.stage.removeChild(character.getDisplayObject());
      }
    });

    // Map animation logic
    this.map.animate(delta);
  }
}

export default Game;
