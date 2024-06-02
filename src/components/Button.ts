import { Application } from '@pixi/app';
import { Sprite } from '@pixi/sprite';
import { Text, TextStyle } from '@pixi/text';
import PixiComponent from '../core/PixiComponent';
import { IButton } from '../interfaces/IButton';

import '@pixi/interaction';
import '@pixi/events';

class Button extends PixiComponent implements IButton {
  content: string;
  style: TextStyle;
  onClick: () => void;
  buttonImage: string;

  private sprite: Sprite | undefined;
  private buttonText: Text | undefined;

  constructor(app: Application, x: number, y: number, content: string, style: TextStyle, onClick: () => void, buttonImage: string) {
    super(app, x, y);

    this.content = content;
    this.style = style;
    this.onClick = onClick;
    this.buttonImage = buttonImage;
    this.init();
  }

  init(): void {
    if (!this.buttonImage) return 
    this.sprite = Sprite.from(this.buttonImage);
    this.sprite.anchor.set(0.5);
  
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.on('pointerdown', this.onClick);

    // Create text for button label
    this.buttonText = new Text(this.content, this.style);
    this.buttonText.anchor.set(0.5);
    this.buttonText.x = this.sprite.width / 2;
    this.buttonText.y = this.sprite.height / 2;

    // Add sprite and text to container
    this.addChild(this.sprite);
    this.sprite.addChild(this.buttonText);
  }

  setSize(width: number, height: number): void {
    if (this.sprite) {
      this.sprite.width = width;
      this.sprite.height = height;
    }
  }

  setText(content: string, x: number, y: number, style: TextStyle = this.style): void {
    if (this.buttonText) {
      this.buttonText.text = content;
      this.buttonText.x = x;
      this.buttonText.y = y;
      this.buttonText.style = style;
    }
  }

  setTextScale(scale: number): void {
    this.buttonText!.scale.set(scale);
  }

  animate(delta: number): void {
    // Add animation logic if needed
  }

  triggerAction(action: string, ...args: any[]): void {
    // Handle button-specific actions if needed
  }
}

export default Button;
