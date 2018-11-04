import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndexRequest } from '../models/index-request';

const API_URL = 'http://localhost:5000/api/index'
@Injectable()
export class IndexService {

  public terms: string[] = [];

  constructor(private http: HttpClient) { }

  public Add(request: IndexRequest) {
      this.http.post(API_URL+"/add", request).subscribe(
      res => {
        console.log(res);
      },
      (error:any) => {
        console.log(error);
      }
    );      
  }
 
  public GetIndexedTerms() {
    this.http.get(API_URL+"/terms").subscribe(
    (data:any) => {
      this.terms = data;
    },
    (error:any) => {
      console.log(error);
    }
  );      
}
}
