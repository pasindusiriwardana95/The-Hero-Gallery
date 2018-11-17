import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$:Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  //pushing a search term in to the observable stream
  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$= this.searchTerms.pipe(
      // wait 300ms after each stroke before considering the term
      debounceTime(300),

      // ignore the new trem if it is as the same as before
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term:string) => this.heroService.searchHeroes(term)),
    );
  }

}