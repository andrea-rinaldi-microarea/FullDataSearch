import { DbConnectionStringService } from './../../services/db-connection-string.service';
import { IndexService } from './../../services/index.service';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { IndexRequest } from '../../models/index-request';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  private isValidConnection: boolean = false;

  constructor(
    private customersService: CustomersService,
    private indexService: IndexService,
    private router: Router,
    private dbConn: DbConnectionStringService
  ) { }

  ngOnInit() {
    this.dbConn.IsValid().subscribe( (isValid) => {
      this.isValidConnection = isValid;
    });
  }

  onShow() {
    if (!this.isValidConnection)
      return;
    this.customersService.GetAllData();
  }

  onAddIndex(cust) {
    this.indexService.Add({
      reference: cust.tbguid, 
      context: 'Customer ' + cust.custSupp + ' ' + cust.companyName, 
      sentences: [
        cust.companyName, 
        cust.address
      ]})
  }

  onBuildIndex() {
    if (!this.customersService.data || this.customersService.data.length == 0) 
      return;

    this.customersService.data.forEach(cust => {
      this.onAddIndex(cust);
    });
  }

  onConfigure() {
    this.router.navigateByUrl('/configure');
  }
}
