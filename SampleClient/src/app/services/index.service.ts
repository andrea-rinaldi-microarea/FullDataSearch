import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndexRequest } from '../models/index-request';
import { Observable } from 'rxjs/Observable';

const API_URL = 'http://localhost:5000/api/index'
@Injectable()
export class IndexService {

  constructor(private http: HttpClient) { }

  public Add(request: IndexRequest): Observable<any> {
      var add$ = new Observable<any>( (observer) => {
        this.http.post(API_URL+"/add", request).subscribe(
          res => {
            console.log(res);
            observer.next(res);
            observer.complete();
          },
          (error:any) => {
            console.log(error);
            observer.error(error);
          }
        );
      });
    return add$;      
  }
 
  public GetTerms(): Observable<string[]> {
    var terms$ = new Observable<string[]>( (observer) => {
        this.http.get(API_URL+"/terms").subscribe(
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

    return terms$;
  }

  public GetNodes(): Observable<any> {
    var nodes$ = new Observable<any>( (observer) => {
        this.http.get(API_URL+"/nodes").subscribe(
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

    return nodes$;
  }
}
