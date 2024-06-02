import { Container, DisplayObject } from '@pixi/display';
import { Application } from '@pixi/app';
import { TextStyle, Text } from '@pixi/text';
import { IComponent } from '../interfaces/IComponent';

abstract class PixiComponent extends Container implements IComponent {
  app: Application;
  text?: Text;

  constructor(app: Application, x: number, y: number) {
    super();
    this.app = app;
    this.x = x;
    this.y = y;
    this.init();
  }

  abstract init(): void;

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  abstract animate(delta: number): void;

  abstract triggerAction(action: string, ...args: any[]): void;

  setText(content: string, x: number, y: number, style: TextStyle = new TextStyle()): void {
    if (this.text) {
      this.removeChild(this.text);
    }
    this.text = new Text(content, style);
    this.text.x = x;
    this.text.y = y;
    this.addChild(this.text);
  }

  getDisplayObject(): DisplayObject {
    return this;
  }

  destroyComponent(): void {
    this.app.stage.removeChild(this);
    this.destroy({ children: true, texture: true, baseTexture: true });
  }
}

export default PixiComponent;
