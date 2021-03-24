import { Component, OnInit } from '@angular/core';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  xerTable?: XerTable;

  constructor() {
  }

  ngOnInit(): void {
  }

  createDownloadLink(filename: string, data: string): void {
    document.body.appendChild(document.createElement('br'));
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/csv,${encodeURIComponent(data)}`);
    element.setAttribute('download', `${filename}.csv`);
    element.innerHTML = filename;
    document.body.appendChild(element);
  }

}
