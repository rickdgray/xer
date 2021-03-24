import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})

export class MainTableComponent implements OnInit {
  @Input() table?: XerTable;

  constructor() {
  }

  ngOnInit(): void {
  }

  downloadCsv(): void {
    if (this.table) {
      //handle commas for proper csv format
      let fieldsAsString: string[] = [];
      this.table.fields.forEach((field: string) => {
        fieldsAsString.push(field.replace(',', '","'));
      });

      let rowsAsString: string[] = [];
      this.table.rows.forEach((row: string[]) => {
        let cellsAsString: string[] = [];
        row.forEach((cell: string) => {
          cellsAsString.push(cell.replace(',', '","'));
        });
        rowsAsString.push(cellsAsString.join(','));
      });

      const blob = new Blob([`${this.table.fields.join(',')}\n${rowsAsString.join('\n')}`], {
        type: 'text/csv;charset=utf-8'
      });
      FileSaver.saveAs(blob, `${this.table.name}.csv`);
    }
  }
}