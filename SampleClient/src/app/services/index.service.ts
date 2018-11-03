import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndexRequest } from '../models/index-request';

const API_URL = 'http://localhost:5000/api/index'
@Injectable()
export class IndexService {

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
}
