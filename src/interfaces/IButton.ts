import { Container } from "@pixi/display";
import { TextStyle } from '@pixi/text';

export interface IButton extends Container {
    x: number;
    y: number;
    content: string;
    style: TextStyle;
    buttonImage: string;
}