import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {
        id: 1,
        name: "Arthur",
        race: "Human",
        mana: 100,
        stamina: 80,
        speed: 12,
        level: 2
      },
      {
        id: 2,
        name: "Legolas",
        race: "Elf",
        mana: 150,
        stamina: 60,
        speed: 18,
        level: 2
      },
      {
        id: 3,
        name: "Grommash",
        race: "Orc",
        mana: 30,
        stamina: 120,
        speed: 10,
        level: 2
      },
      {
        id: 4,
        name: "Morwin",
        race: "Undead",
        mana: 200,
        stamina: 40,
        speed: 8,
        level: 2
      },
      {
        id: 5,
        name: "Zilda",
        race: "Dwarf",
        mana: 50,
        stamina: 150,
        speed: 9,
        level: 1  }
    ];
    return {heroes};
  }

  constructor() { }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero=>hero.id))+1 : 1;
  }
}
