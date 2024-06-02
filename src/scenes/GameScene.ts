import { Container } from "@pixi/display";
import { IScene } from "../interfaces/IScene";
import { Application } from "@pixi/app";
import Button from "../components/Button";
import { Sprite } from "@pixi/sprite";
import { ITextStyle, TextStyle } from "@pixi/text";
import { sound } from '@pixi/sound';

class GameScene extends Container implements IScene {
    app: Application;

    constructor(app: Application) {
        super();
        this.app = app;
        this.init();
    }

    update(delta: number): void {
        throw new Error("Method not implemented.");
    }

    init(): void {
        console.log('GameScene');
       this.initButton();
    }

    initButton() {
        const container = new Container();
        const bg = Sprite.from('/assets/images/bg_1.png');
        bg.anchor.set(0);

        bg.x = 0;
        bg.y = 0;

        const textStyle: Partial<ITextStyle> = {
            fill: 'white',
            fontSize: 16,
        }
        
        const pos = {
            x: this.app.view.width / 4,
            y: this.app.view.height / 3 - 50,
        }

        const startButton = new Button(this.app, pos.x, pos.y, 'Start Game', new TextStyle(textStyle), '/assets/images/buttons/blue.png');

        startButton.spriteSelf!.on('pointerover', () => {
            sound.play('sword');
            startButton.spriteSelf!.tint = 0xaaaaaa;
            startButton.textSelf!.style = new TextStyle({
                ...textStyle,
                fontSize: textStyle.fontSize ? Number(textStyle.fontSize) + 2 : 18,
            });
        })

        startButton.spriteSelf!.on('pointerout', () => {
            startButton.spriteSelf!.tint = 0xffffff; // 恢复按钮颜色
            startButton.textSelf!.style = textStyle; // 恢复字体大小
          });

        startButton.spriteSelf!.on('pointerdown', () => {
            console.log('Start Game');
            this.app.stage.emit('endGame')
        });

        startButton.scale.set(1.8);
        startButton.setTextScale(0.8);

        container.addChild(bg);
        this.addChild(container);
        this.addChild(startButton);
    }
}

export default GameScene;