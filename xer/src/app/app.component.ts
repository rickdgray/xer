import { Component } from '@angular/core';
import { ImportExportService } from './import-export.service';
import { XerTable } from './models/XerTable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  tables?: XerTable[];

  constructor(private importExportService: ImportExportService) { }

  ngOnInit(): void { }

  importXer($event: Event): void {
    const selectedFile = ($event.target as HTMLInputElement).files?.[0];

    if (selectedFile) {
      this.tables = this.importExportService.importXer(selectedFile);
    }
  }

  exportXer(): void {
    
  }
}
