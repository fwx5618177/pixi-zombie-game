import { Application } from '@pixi/app';
import { sound } from '@pixi/sound';
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
    
    this.addSounds();
    this.sceneChange('game');
  }

  sceneChange(scene = 'game'): void {
    sound.play('loop1', { loop: true })
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

  addSounds() {
    const soundResources = [
      { name: 'applause', url: '/assets/sounds/resources/applause.mp3' },
      { name: 'applause', url: '/assets/sounds/resources/applause.ogg' },
      { name: 'bird', url: '/assets/sounds/resources/bird.mp3' },
      { name: 'boing', url: '/assets/sounds/resources/boing.mp3' },
      { name: 'buzzer', url: '/assets/sounds/resources/buzzer.mp3' },
      { name: 'car', url: '/assets/sounds/resources/car.mp3' },
      { name: 'chime', url: '/assets/sounds/resources/chime.mp3' },
      { name: 'mechanical', url: '/assets/sounds/resources/mechanical.mp3' },
      { name: 'musical', url: '/assets/sounds/resources/musical.mp3' },
      { name: 'sprite', url: '/assets/sounds/resources/sprite.mp3' },
      { name: 'success', url: '/assets/sounds/resources/success.mp3' },
      { name: 'sword', url: '/assets/sounds/resources/sword.mp3' },
      { name: 'whistle', url: '/assets/sounds/resources/whistle.mp3' },
      {
        name: 'loop1',
        url: '/assets/sounds/resources/loops/loop1.mp3',
      },
      {
        name: 'loop2',
        url: '/assets/sounds/resources/loops/loop2.mp3',
      },
      {
        name: 'loop3',
        url: '/assets/sounds/resources/loops/loop3.mp3',
      },
      {
        name: 'loop4',
        url: '/assets/sounds/resources/loops/loop4.mp3',
      },
    ];

    soundResources?.forEach(sounds => {
      sound.add(sounds.name, sounds.url)
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
