import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const API_URL = 'http://localhost:5100/api/dbconnectionstring'

@Injectable()
export class DbConnectionStringService {

  constructor(private http: HttpClient) { }

  public IsValid(): Observable<boolean> {
    var isValid$ = new Observable<boolean>( (observer) => {
      this.http.get(API_URL+"/isValid").subscribe(
        (data:any) => {
          observer.next(data);
          observer.complete();
        },
        (error:any) => {
          console.log(error);
          observer.error(error);
        }
      );      
    });
    return isValid$;
  }

  public Set(connString: string) {
    this.http.post(API_URL, connString).subscribe(
      res => {
        console.log(res);
      },
      (error:any) => {
        console.log(error);
      }
    );      
  }
}
