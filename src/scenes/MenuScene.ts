import { Container } from "@pixi/display";
import { IScene } from "../interfaces/IScene";
import { Application } from "@pixi/app";

class MenuScene extends Container implements IScene {
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
        
    }
}

export default MenuScene;