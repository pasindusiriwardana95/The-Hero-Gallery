import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

import {Hero} from './hero';
//import {HEROES} from './mock-heroes';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';

const httpOptions={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  private heroesUrl = 'api/heroes';

  //gets heroes by id, if failed 404 willwork
  getHero(id: number): Observable<Hero> {
    // todo: send the message after fetching the hero
    const url='${this.heroesUrl}/${id}';
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>('getHero id=${id}'))
    );

    
  }

  getHeroNo404<Data>(id:number):Observable<Hero>{
    const url=`${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
    .pipe(
      map(heroes=> heroes[0]), // returns a {0|1} element array
      tap(h=> {
        const outcome=h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
    }),
    catchError(this.handleError<Hero>(`getHero id=${id}`)
    )
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl).
    pipe(
      tap(_=> this.log('fetched heroes')),
      catchError(this.handleError('getHeroes',[]))
    );
  }

  // T is for the type
  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T>=>{
      // send error to remote logging infastructure
      console.error(error);
      //transforming error so that the user can see what it is
      this.log(`${operation} failed: ${error.message}` );
      //app runs when error by producing an empty result
      return of(result as T);
    };
  }

  /** update a hero on the server using put */
  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero,httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** adding a new hero to the server using post */
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,httpOptions).pipe(tap((hero:Hero)=> this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
    );
  }

  /**delete a hero using delete */
  deleteHero(hero:Hero | number): Observable<Hero>{
    const id= typeof hero==='number'? hero:hero.id;
    const url=`${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(tap(_=> this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero')));

  }

  /** get heroes whoe name contains search term */
  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      // if doesnt match search term return empty
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(tap(_=> this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes',[]))
    );
  }

  

  //cuz MessageService is frequently being injected
  private log(message:string){
    this.messageService.add(`HeroService:${message}`);
  }
}
