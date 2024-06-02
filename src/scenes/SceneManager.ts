import { Application } from "@pixi/app";
import MenuScene from "./MenuScene";
import { IScene } from "../interfaces/IScene";
import GameScene from "./GameScene";
import EndScene from "./EndScene";

class SceneManager {
    app: Application;
    currentScene: IScene | null;
  
    constructor(app: Application) {
      this.app = app;
      this.currentScene = null;
    }
  
    changeScene(scene: string): void {
      if (this.currentScene) {
        this.app.stage.removeChild(this.currentScene);
        this.currentScene.destroy();
      }
  
      switch (scene) {
        case 'menu':
          this.currentScene = new MenuScene(this.app);
          break;
        case 'game':
          this.currentScene = new GameScene(this.app);
          break;
        case 'end':
          this.currentScene = new EndScene(this.app);
          break;
        default:
            throw new Error('Invalid scene');
      }
  
      if (this.currentScene) {
        this.app.stage.addChild(this.currentScene);
      }
    }

    update(delta: number): void {
        if (this.currentScene && typeof this.currentScene.update === 'function') {
          this.currentScene.update(delta);
        }
    }
}

export default SceneManager;