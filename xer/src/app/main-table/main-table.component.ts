import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ImportExportService } from '../import-export.service';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})

export class MainTableComponent implements OnInit, OnChanges {
  @Input() table?: XerTable;

  dataSource = new MatTableDataSource<string[]>([]);
  displayedColumns: string[] = [];

  constructor(private importExportService: ImportExportService) { }

  ngOnInit(): void {
    if (this.table) {
      this.displayedColumns = ['test', 'test2', 'test3'];
      this.dataSource.data = [['test', 'test2', 'test3'], ['test', 'test2', 'test3'], ['test', 'test2', 'test3'], ['test', 'test2', 'test3']];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.table && changes.table.currentValue) {
      this.displayedColumns = changes.table.currentValue.fields;
      this.dataSource.data = changes.table.currentValue.rows;
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