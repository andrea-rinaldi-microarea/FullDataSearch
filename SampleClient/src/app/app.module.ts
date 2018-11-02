import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CustomersListComponent } from './ui/customers-list/customers-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from './services/customers.service';


@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
