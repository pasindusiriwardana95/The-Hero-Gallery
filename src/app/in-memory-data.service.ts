import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Hero} from './hero';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes=[
      {id: 2,name:'Captain America'},
      {id: 3,name:'Nova'},
      {id: 4,name:'Groot'},
      {id: 5,name:'Thor'},
      {id: 6,name:'Iron man'},
      {id: 7,name:'Hawk eye'},
      {id: 8,name:'Scarlet witch'},
      {id: 9,name:'Adam Warlock'},
      {id: 10,name:'Black Panther'},
      {id: 11,name:'Ant Man'},
      {id: 12,name:'Wasp'}
    ];
    return {heroes};
  }

  genId(heroes:Hero[]):number{
    return heroes.length>0 ? Math.max(...heroes.map(hero=>hero.id))+1: 11;
  }

  constructor() { }
}
