import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ImportExportService } from '../import-export.service';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})

export class MainTableComponent implements OnChanges, AfterViewInit {
  @Input() table?: XerTable;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columns: any[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private importExportService: ImportExportService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.table && changes.table.currentValue) {
      this.columns = this.getColumnDefs(this.table?.fields ?? []);
      this.dataSource.data = this.transformData(this.table ?? { name: '', fields: [], rows: [] });;
      this.displayedColumns = this.columns.map(c => c.columnDef);
    }
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  private transformData(table: XerTable): Record<string, string>[] {
    const fieldIndexLookup: Record<number, string> = {};
    table.fields.forEach((field, index) => {
      fieldIndexLookup[index] = field;
    });

    const data: Record<string, string>[] = [];
    for (let i = 0; i < table.rows.length; i++) {
      const rowData: Record<string, string> = {};
      for (let j = 0; j < table.rows[i].length; j++) {
        rowData[fieldIndexLookup[j]] = table.rows[i][j];
      }
      data.push(rowData);
    }

    return data;
  }

  private getColumnDefs(fields: string[]): any[] {
    const columns: any[] = [];

    fields.forEach((field) => {
      columns.push({
        columnDef: field,
        header: field,
        cell: (element: any) => element[field]
      });
    });

    return columns;
  }
}