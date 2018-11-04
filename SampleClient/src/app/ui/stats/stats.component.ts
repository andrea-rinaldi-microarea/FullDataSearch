import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private indexService: IndexService) { }

  ngOnInit() {
  }

  onTerms() {
    this.indexService.GetIndexedTerms();
  }
}
