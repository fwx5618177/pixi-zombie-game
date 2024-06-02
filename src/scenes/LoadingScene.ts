import { Container } from '@pixi/display';
import { Application } from '@pixi/app';
import { Text, TextStyle } from '@pixi/text';
import { IScene } from '../interfaces/IScene';
import { Sprite } from '@pixi/sprite';

class LoadingScene extends Container implements IScene {
  app: Application;
  background: Sprite;
  loadingText: Text;
  fullText: string;
  currentIndex: number;

  constructor(app: Application) {
    super();
    this.app = app;
    this.fullText = "Loading...";
    this.currentIndex = 0;
    this.init();
  }

  init(): void {
    // Load and display background image
    this.background = Sprite.from('path/to/loadingBackground.png');
    this.addChild(this.background);

    // Initialize loading text
    const textStyle = new TextStyle({ fill: 'white', fontSize: 30 });
    this.loadingText = new Text('', textStyle);
    this.loadingText.x = this.app.screen.width / 2;
    this.loadingText.y = this.app.screen.height / 2;
    this.loadingText.anchor.set(0.5);
    this.addChild(this.loadingText);

    // Start typing effect
    this.typeText();
  }

  typeText(): void {
    const interval = setInterval(() => {
      if (this.currentIndex < this.fullText.length) {
        this.loadingText.text += this.fullText[this.currentIndex];
        this.currentIndex++;
      } else {
        clearInterval(interval);
        // After loading is complete, you can emit an event to change the scene
        setTimeout(() => {
          this.app.stage.emit('startGame');
        }, 1000); // wait 1 second before starting the game
      }
    }, 150); // interval time in milliseconds
  }

  update(delta: number): void {
    // Update logic for loading scene
  }

  destroy(): void {
    // Cleanup logic for loading scene
    this.removeChildren();
  }
}

export default LoadingScene;
