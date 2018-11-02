import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent {

  constructor(private customersService: CustomersService) { }

  onShow() {
    this.customersService.GetAllData();
  }
}
