import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbConnectionStringService } from '../../services/db-connection-string.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  public connectionString: string  = "";

  constructor( 
    private router: Router,
    private dbConn: DbConnectionStringService
  ) { }

  ngOnInit() {
  }

  onSave() {
    this.dbConn.Set(this.connectionString);
  }

  onBack() {
    this.router.navigateByUrl('/build');
  }
}
