import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GameDto, WrapperOfIEnumerableOfGameDto, AccessResultDto, WrapperOfAccessResultDto, UserDto, WrapperOfIEnumerableOfUserDto } from 'src/app/shared/model/game';
import { stringify } from '@angular/core/src/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  endpoint = 'https://sandgatethapi.azurewebsites.net/api/';
  ////endpoint = 'http://localhost:7071/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  getStations(): Observable<GameDto[]> {
    
    // The wrapped data that comes from the web server, including errors and links
    const wrapped$ = <Observable<WrapperOfIEnumerableOfGameDto>>this.http.get(this.endpoint + 'Stations').pipe(
      catchError((err: any) => {
      //  this.PublishDataEvent('Get', 'Version', '', err, true);
        const returnValue = new Observable<WrapperOfIEnumerableOfGameDto>();
        return returnValue;
      }      ),
    );

    // The unwrapped data section from the web response
    const unwrapped$ = wrapped$.pipe(
      map(v => v.data)
      ,
      tap( d => {
        // console.log(d);
      }
    ));

    return unwrapped$;
  }

  public generateNewAccessCodeResult$: Subject<boolean>	= new Subject<boolean>();
  
  generateNewAccessCode(gameId: string) {
    
      this.http.get(this.endpoint + 'GenerateNewAccessCode' + '?GameId=' + gameId).subscribe(
      data  => {
        // Code generation allowed
        // GenerateNewAccessCode
        console.log(data);
        this.generateNewAccessCodeResult$.next(true);
      },
      err  => {
        console.log(err);
        this.generateNewAccessCodeResult$.next(false);
      }
    );
    
    
  }
/*
  generateNewAccessCode(gameId: string) {
    this.http.get(this.endpoint + 'GenerateNewAccessCode' + '?GameId=' + gameId).subscribe(
      data  => {
        // Code generation allowed
        console.log(data);
      },
      err  => {
        console.log(err);
        // Navigate to home page
        this.router.navigate(['/'])
      }
    );
  }
*/

  checkAccessCode(gameId, inputCode): Observable<AccessResultDto> {
    // The wrapped data that comes from the web server, including errors and links
    const wrapped$ = <Observable<WrapperOfAccessResultDto>>this.http.get(this.endpoint + 'CheckAccessCode' + '?GameId=' + gameId + '&InputCode=' + inputCode).pipe(
      catchError((err: any) => {
        const returnValue = new Observable<WrapperOfAccessResultDto>();
        return returnValue;
      }      ),
    );

    // The unwrapped data section from the web response
    const unwrapped$ = wrapped$.pipe(
      map(v => v.data)
      ,
      tap( d => {
        console.log(d);
      }
    ));

    return unwrapped$;
  }

  doCommand(gameId: string, token: string, command: string, parameters: string) {
    this.http.get(this.endpoint + 'PassCommandToStation' + '?GameId=' + gameId 
                                + '&AccessToken=' + token 
                                + '&Command=' + command+ '&Parameters=' + parameters).subscribe(
      data  => {
        console.log(data);
      },
      err  => {
        console.log(err);
      }
    );

  }


  getUsers(): Observable<UserDto[]> {
    
    // The wrapped data that comes from the web server, including errors and links
    const wrapped$ = <Observable<WrapperOfIEnumerableOfUserDto>>this.http.get(this.endpoint + 'Users').pipe(
      catchError((err: any) => {
      //  this.PublishDataEvent('Get', 'Version', '', err, true);
        const returnValue = new Observable<WrapperOfIEnumerableOfUserDto>();
        return returnValue;
      }      ),
    );

    // The unwrapped data section from the web response
    const unwrapped$ = wrapped$.pipe(
      map(v => v.data)
      ,
      tap( d => {
        // console.log(d);
      }
    ));

    return unwrapped$;
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
