import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomersListComponent } from './ui/customers-list/customers-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from './services/customers.service';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SearchComponent } from './ui/search/search.component';
import { IndexService } from './services/index.service';
import { StatsComponent } from './ui/stats/stats.component';
import { ConfigureComponent } from './ui/configure/configure.component';

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
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'configure',
    component: ConfigureComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    StatsComponent,
    ConfigureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [CustomersService, IndexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
