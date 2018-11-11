import { DbConnectionStringService } from './../../services/db-connection-string.service';
import { IndexService } from './../../services/index.service';
import { CustomersService } from './../../services/customers.service';
import { Component, OnInit } from '@angular/core';
import { IndexRequest, Entity, TextData } from '../../models/index-request';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  private isValidConnection: boolean = false;
  private indexInProgress = null;

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

  addIndex(cust): Observable<any> {
    var ir = new IndexRequest();
    ir.entity = new Entity(
      'ERP.CustSupp.Documents.Customer', 
      cust.tbguid,
      'Customer', 
      cust.custSupp + ' ' + cust.companyName
    );
    ir.textData.push(new TextData('Company name', cust.companyName));
    ir.textData.push(new TextData('Address', cust.address));
    ir.textData.push(new TextData('City', cust.city));
    ir.textData.push(new TextData('Contact Person', cust.contactPerson));
    ir.textData.push(new TextData('Notes', cust.notes));
    
    return this.indexService.Add(ir);
  }

  onAddIndex(cust) {
    this.addIndex(cust);
  }

  onBuildIndex() {
    if (!this.customersService.data || this.customersService.data.length == 0) 
      return;

    let build$ = this.customersService.data.map( cust => {
      return this.addIndex(cust);
    })
    let count = 0;
    Observable.merge(...build$).subscribe(() => {
      this.indexInProgress = "Building index: entity " + ++count + " of " + this.customersService.data.length;
    }, null, 
    () => {
      this.indexInProgress = null;
    })
  }

  onConfigure() {
    this.router.navigateByUrl('/configure');
  }
}
