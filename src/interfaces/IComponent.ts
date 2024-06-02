import { DisplayObject } from '@pixi/display';
import { TextStyle } from '@pixi/text';

export interface IComponent extends DisplayObject{
  init(): void;
  setSize(width: number, height: number): void;
  setPosition(x: number, y: number): void;
  animate(delta: number): void;
  triggerAction(action: string, ...args: any[]): void;
  setText(content: string, x: number, y: number, style?: TextStyle): void;
  getDisplayObject(): DisplayObject;
  destroyComponent(): void;
}
