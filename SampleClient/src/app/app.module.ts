import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomersListComponent } from './ui/customers-list/customers-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from './services/customers.service';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SearchComponent } from './ui/search/search.component';
import { IndexService } from './services/index.service';

const ROUTES = [
  {
    path: '',
    redirectTo: 'build',
    pathMatch: 'full'
  },
  {
    path: 'build',
    component: CustomersListComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [CustomersService, IndexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
