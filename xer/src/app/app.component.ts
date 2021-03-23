import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() { }

  ngOnInit(): void {
  }
  
  public getFile($event: Event): void {
    const selectedFile = ($event.target as HTMLInputElement).files?.[0];

    if (selectedFile && selectedFile.type === 'application/xer') {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        if (event.target) {
          const data = this.parseData(event.target.result as string);

          for (let key in data) {
            let table = data[key] as string;
            //do something with data
          }
        }
      };
      reader.readAsText(selectedFile);
    } else {
      console.error('Invalid file!');
    }
  }

  public parseData(dataString: string): Record<string, string> {
    let data: Record<string, string> = {};
    let currentTable: string = '';
    const lines = dataString.split('\n');

    lines.forEach((line: string) => {
      const tokens = line.split('\t');
      switch (tokens[0]) {
        case '%T':
          currentTable = tokens[1] as string;
          data[currentTable] = '';
          break;
        case '%F':
        case '%R':
          data[currentTable] = `${data[currentTable]}${tokens.slice(1).join(',')}\n`;
          break;
        default:
          break;
      }
    });

    return data;
  }
}
