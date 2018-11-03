import { IndexService } from './../../services/index.service';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { IndexRequest } from '../../models/index-request';

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

  onAddIndex() {
    if (this.customersService.data.length > 0) {
      var cust = this.customersService.data[0];
      this.indexService.Add({reference: cust.custSupp, context: cust.companyName, sentences: [cust.companyName, cust.address]})
    }
  }
}
