import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public createDownloadLink(filename: string, data: string): void {
    document.body.appendChild(document.createElement('br'));
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv,${encodeURIComponent(data)}`);
    element.setAttribute('download', `${filename}.csv`);
    element.innerHTML = filename;
    document.body.appendChild(element);
  }

}
