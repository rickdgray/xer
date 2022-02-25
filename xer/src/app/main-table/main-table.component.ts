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

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private importExportService: ImportExportService) { }

  ngOnInit(): void {
    if (this.table) {
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.table && changes.table.currentValue) {
      // this.displayedColumns = changes.table.currentValue.fields;
      // this.dataSource.data = changes.table.currentValue.rows;
      this.displayedColumns = this.table?.fields ?? [];
      this.dataSource.data = this.transformData(this.table ?? { name: '', fields: [], rows: [] });
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

  private transformData(table: XerTable): any {
    const fieldIndexLookup: Record<number, string> = {};
    table.fields.forEach((field, index) => {
      fieldIndexLookup[index] = field;
    });

    const data = [];
    for (let i = 0; i < table.rows.length; i++) {
      const rowData: Record<string, string> = {};
      for (let j = 0; j < table.rows[i].length; j++) {
        rowData[fieldIndexLookup[j]] = table.rows[i][j];
      }
      data.push(rowData);
    }

    return data;
  }
}