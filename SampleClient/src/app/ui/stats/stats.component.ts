import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  terms: string[] = [];
  maxLength: number = 0;

  constructor(private indexService: IndexService) { }

  ngOnInit() {
  }

  onTerms() {
    // this.indexService.GetIndexedTerms();
    this.indexService.GetTerms().subscribe( (terms) => {
      this.terms = terms;
      this.maxLength = 0;
      this.terms.forEach( term => {
        if (term.length > this.maxLength)
          this.maxLength = term.length;
      });
    })
  }
}
