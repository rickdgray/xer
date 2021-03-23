import { Component, OnInit } from '@angular/core';
import { XerTable } from '../models/XerTable';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  public xerTable: XerTable | null;

  constructor() {
    this.xerTable = {
      name: 'CURRTYPE',
      fields: ['curr_id', 'decimal_digit_cnt', 'curr_symbol', 'decimal_symbol', 'digit_group_symbol', 'pos_curr_fmt_type', 'neg_curr_fmt_type', 'curr_type', 'curr_short_name', 'group_digit_cnt', 'base_exch_rate'],
      rows: [['1', '2', '$', '.', ',', '#1.1', '(#1.1)', 'USD', 'USD', '3', '1']]
    };

    //this.xerTable = null;
  }

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
