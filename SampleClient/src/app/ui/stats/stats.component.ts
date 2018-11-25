import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../services/index.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  terms: string[] = [];
  nodes: TreeviewItem[];
  maxLength: number = 0;
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500
});

  constructor(private indexService: IndexService) { }

  ngOnInit() {
  }

  onTerms() {
    this.indexService.GetTerms().subscribe( (terms) => {
      this.terms = terms;
      this.maxLength = 0;
      this.terms.forEach( term => {
       if (term.length > this.maxLength)
          this.maxLength = term.length;
      });
    })
  }

  onTrie() {
    this.indexService.GetNodes().subscribe( (nodes) => {
      this.nodes = [ new TreeviewItem(nodes) ];
    })
  }
}
