import { IComponent } from './IComponent';

export interface ICharacter extends IComponent {
  health: number;
  speed: number;
  isEnemy: boolean;
  move(direction: string): void;
  attack(target: ICharacter): void;
  takeDamage(amount: number): void;
  isAlive(): boolean;
  findTarget(characters: ICharacter[]): ICharacter | null;
  interactWith(target: ICharacter): void;
}
