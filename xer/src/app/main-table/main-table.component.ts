import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ImportExportService } from '../import-export.service';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})

export class MainTableComponent implements OnInit {
  @Input() table?: XerTable;

  dataSource = new MatTableDataSource<string[]>();

  constructor(private importExportService: ImportExportService) { }

  ngOnInit(): void {
    if (this.table) {
      this.dataSource.data = this.table.rows;
    }
  }

  importCsv($event: Event): void {
    const selectedFile = ($event.target as HTMLInputElement).files?.[0];

    if (selectedFile) {
      this.table = this.importExportService.importCsv(selectedFile);
    }
  }

  exportCsv() {
    if (this.table) {
      this.importExportService.exportCsv(this.table);
    }
  }
}