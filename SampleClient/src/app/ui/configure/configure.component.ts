import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  public connectionString: string  = "";

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onSave() {
    
  }

  onBack() {
    this.router.navigateByUrl('/build');
  }
}
