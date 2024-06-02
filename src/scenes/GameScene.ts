import { Container } from "@pixi/display";
import { IScene } from "../interfaces/IScene";
import { Application } from "@pixi/app";
import Button from "../components/Button";
import { Sprite } from "@pixi/sprite";
import { ITextStyle, TextStyle } from "@pixi/text";

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
        bg.x = 0;
        bg.y = 0;

        const textStyle: Partial<ITextStyle> = {
            fill: 'white',
            fontSize: 16,
        }

        
        const pos = {
            x: this.app.view.width / 4,
            y: this.app.view.height / 4
        }

        console.log('pos', pos);

        const startButton = new Button(this.app, pos.x, pos.y, 'Start Game', new TextStyle(textStyle), () => {
            console.log('Start Game');
        }, '/assets/images/buttons/blue.png');

        startButton.scale.set(1.2);
        startButton.setTextScale(0.8);

        container.addChild(bg);
        this.addChild(container);
        this.addChild(startButton);
    }
}

export default GameScene;