import { IndexService } from './../../services/index.service';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { IndexRequest } from '../../models/index-request';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent {

  constructor(
    private customersService: CustomersService,
    private indexService: IndexService
  ) { }

  onShow() {
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
}
