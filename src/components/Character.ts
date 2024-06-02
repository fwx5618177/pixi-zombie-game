import { Application } from '@pixi/app';
import PixiComponent from '../core/PixiComponent';
import { ICharacter } from '../interfaces/ICharacter';

class Character extends PixiComponent implements ICharacter {
  health: number;
  speed: number;
  isEnemy: boolean;
  attackPower: number;

  constructor(
    app: Application,
    x: number,
    y: number,
    isEnemy: boolean = false,
  ) {
    super(app, x, y);

    this.health = 100;
    this.speed = 2;
    this.isEnemy = isEnemy;
    this.attackPower = isEnemy ? 20 : 10;
  }

  init(): void {
    // Initialize character sprite, animations, etc.
  }

  animate(delta: number): void {
    // Character-specific animation logic
  }

  triggerAction(action: string, ...args: any[]): void {
    // Handle specific actions
  }

  move(direction: string): void {
    // Logic to move the character based on direction
    if (direction === 'left') this.x -= this.speed;
    if (direction === 'right') this.x += this.speed;
    if (direction === 'up') this.y -= this.speed;
    if (direction === 'down') this.y += this.speed;
  }

  attack(target: ICharacter): void {
    // Logic for attacking another character
    target.takeDamage(10);
  }

  takeDamage(amount: number): void {
    // Logic for taking damage
    this.health -= amount;
    if (this.health <= 0) {
      this.destroyComponent();
    }
  }

  isAlive(): boolean {
    return this.health > 0;
  }

  findTarget(characters: ICharacter[]): ICharacter | null {
    // Simple logic to find the nearest target
    let nearest: ICharacter | null = null;
    let minDistance = Infinity;
    characters.forEach(character => {
      if (
        character !== this &&
        character.isAlive() &&
        this.isEnemy !== character.isEnemy
      ) {
        const distance = Math.sqrt(
          (this.x - character.x) ** 2 + (this.y - character.y) ** 2,
        );
        if (distance < minDistance) {
          nearest = character;
          minDistance = distance;
        }
      }
    });
    return nearest;
  }

  interactWith(target: ICharacter): void {
    // Define interaction logic between characters
    if (this.isEnemy !== target.isEnemy) {
      this.attack(target);
    } else {
      // Define other interactions for allies if needed
    }
  }
}

export default Character;
