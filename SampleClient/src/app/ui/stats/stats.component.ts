import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { IndexService } from '../../services/index.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterViewChecked {

  terms: string[] = [];
  nodes: TreeviewItem[];
  maxLength: number = 0;
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 508
  });

  @ViewChild('host')  host: ElementRef;
  @ViewChild('termsTbl')  termsTbl: ElementRef;

  constructor(private indexService: IndexService) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.adjustHeights(this.host.nativeElement.offsetHeight);
  }

  @HostListener('window:resize') 
  onResize() {
    this.adjustHeights(this.host.nativeElement.offsetHeight);
  }

  private adjustHeights(hostHeight: number) {
    this.config.maxHeight = hostHeight - 65 - 96;
    this.termsTbl.nativeElement.style.height = `${hostHeight - 96 - 16}px`;
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
