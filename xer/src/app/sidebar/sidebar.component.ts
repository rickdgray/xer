import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() tables?: XerTable[];

  selectedTable?: XerTable;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedTable = changes.tables.currentValue[0];
  }

  onSelect(table: XerTable): void {
    this.selectedTable = table;
  }
}
