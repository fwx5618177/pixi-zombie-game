import { Container } from "@pixi/display";

export interface IScene extends Container {
    init(): void;
    update(delta: number): void;
    destroy(): void;
}