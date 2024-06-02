import { Application } from '@pixi/app';
import { TextStyle } from '@pixi/text';
import Button from '../components/Button';

class ButtonManager {
  app: Application;
  buttons: Button[];

  constructor(app: Application) {
    this.app = app;
    this.buttons = [];
  }

  createButton(x: number, y: number, text: string, style: TextStyle, buttonImage: string): Button {
    const button = new Button(this.app, x, y, text, style, buttonImage);
    this.buttons.push(button);
    this.app.stage.addChild(button);
    return button;
  }

  removeButton(button: Button): void {
    const index = this.buttons.indexOf(button);
    if (index > -1) {
      this.buttons.splice(index, 1);
      this.app.stage.removeChild(button);
      button.destroy();
    }
  }

  update(delta: number): void {
    this.buttons.forEach(button => button.animate(delta));
  }
}

export default ButtonManager;
