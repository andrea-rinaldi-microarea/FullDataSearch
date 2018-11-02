import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CustomersService {

  data: any[];

  constructor(private http: HttpClient) { }

  public GetAllData() {
    this.http.get('http://localhost:5000/api/customers').subscribe((data:any) => {
      this.data = data;
    },
    (error:any) => {
      console.log(error);
    });
    
  }

}
