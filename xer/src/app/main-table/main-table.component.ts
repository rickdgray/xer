import { Component, Input, OnInit } from '@angular/core';
import { ImportExportService } from '../import-export.service';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})

export class MainTableComponent implements OnInit {
  @Input() table?: XerTable;

  constructor(private importExportService: ImportExportService) { }

  ngOnInit(): void { }

  exportCsv() {
    if (this.table) {
      this.importExportService.exportCsv(this.table);
    }
  }
}