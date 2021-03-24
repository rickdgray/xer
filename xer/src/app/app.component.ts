import { Component } from '@angular/core';
import { XerTable } from './models/XerTable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  tables?: XerTable[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getFile($event: Event): void {
    const selectedFile = ($event.target as HTMLInputElement).files?.[0];

    if (selectedFile && selectedFile.name.substring(selectedFile.name.length - 4) === '.xer') {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        if (event.target) {
          this.tables = this.parseData(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  }

  parseData(dataString: string): XerTable[] {
    let data: XerTable[] = [];

    let name: string = '';
    let fields: string[] = [];
    let rows: string[][] = [];

    const lines = dataString.split('\n');
    lines.forEach((line: string) => {
      const tokens = line.split('\t');
      switch (tokens[0]) {
        case '%T':
          if (name) {
            data.push(new XerTable(name, fields, rows));
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

    return data;
  }
}
