import { Application } from '@pixi/app';
import Character from './Character';
import { ICharacter } from '../interfaces/ICharacter';

class CharacterFactory {
  app: Application;
  mapWidth: number;
  mapHeight: number;

  constructor(app: Application, mapWidth: number, mapHeight: number) {
    this.app = app;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  createCharacter(x: number, y: number, isEnemy: boolean = false): ICharacter {
    const character = new Character(this.app, x, y, isEnemy);
    return character;
  }

  createEnemies(count: number): ICharacter[] {
    const enemies: ICharacter[] = [];
    for (let i = 0; i < count; i++) {
      const enemy = this.createCharacter(
        Math.random() * this.mapWidth,
        Math.random() * this.mapHeight,
        true,
      );
      enemies.push(enemy);
    }

    return enemies;
  }

  createTeammates(count: number): ICharacter[] {
    const teammates: ICharacter[] = [];
    for (let i = 0; i < count; i++) {
      const teammate = this.createCharacter(
        Math.random() * this.mapWidth,
        Math.random() * this.mapHeight,
        false,
      );
      teammates.push(teammate);
    }
    return teammates;
  }

  simulateInteractions(characters: ICharacter[]): void {
    characters.forEach(character => {
      const target = character.findTarget(characters);
      if (target) {
        character.interactWith(target);
      }
    });
  }
}

export default CharacterFactory;
