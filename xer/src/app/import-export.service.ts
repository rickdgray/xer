import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { XerTable } from './models/XerTable';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {
  constructor() { }

  importXer(file: File): XerTable[] {
    let tables: XerTable[] = [];

    if (file.name.substring(file.name.length - 4) === '.xer') {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>): void => {
        if (event.target) {
          const dataAsString = event.target.result as string;

          let name: string = '';
          let fields: string[] = [];
          let rows: string[][] = [];

          const lines = dataAsString.split('\n');
          lines.forEach((line: string) => {
            const tokens = line.split('\t');
            switch (tokens[0]) {
              case '%T':
                if (name) {
                  tables.push(new XerTable(name, fields, rows));
                }
                name = tokens[1] as string;
                fields = [];
                rows = [];
                break;
              case '%F':
                tokens.slice(1).forEach((token: string) => {
                  fields.push(token)
                });
                break;
              case '%R':
                rows.push(tokens.slice(1));
                break;
              default:
                break;
            }
          });
        }
      };

      reader.readAsText(file);
    }

    return tables;
  }

  exportXer(tables: XerTable[]): void {
    alert('Coming soon!');
  }

  importCsv(file: File): XerTable {
    alert('Coming soon!');
    return new XerTable('', [], []);
  }

  exportCsv(table: XerTable): void {
    let fieldsAsString: string[] = [];
    table.fields.forEach((field: string) => {
      fieldsAsString.push(field.replace(',', '","'));
    });

    let rowsAsString: string[] = [];
    table.rows.forEach((row: string[]) => {
      let cellsAsString: string[] = [];
      row.forEach((cell: string) => {
        cellsAsString.push(cell.replace(',', '","'));
      });
      rowsAsString.push(cellsAsString.join(','));
    });

    const blob = new Blob([`${table.fields.join(',')}\n${rowsAsString.join('\n')}`], {
      type: 'text/csv;charset=utf-8'
    });
    FileSaver.saveAs(blob, `${table.name.substring(0, table.name.length - 1)}.csv`);
  }
}