import { Component, OnInit } from '@angular/core';
import { Metar } from '../metar/metar.component';
import { Taf } from '../taf/taf.component';
import { Condition } from '../taf/taf.component';
import { ForecastBackendService} from "src/app/services/forecast-backend.service"
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Console } from 'console';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface Full{
  conditions : Metar;
  forecast : Taf
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  animations: []
})

export class FullComponent implements OnInit {
  searchQuery : string;
  loading = false;
  dataSourceMetar = {};
  dataSourceTaf = {};
  conditionsArray : Condition[] = [];
  displayedColumns: string[] = ['key', 'value'];
  constructor(private forecastService: ForecastBackendService) { 
    this.searchQuery = "";
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.loading = true;
    setTimeout(() => {
    this.forecastService.getFull(this.searchQuery)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.dataSourceMetar = response.conditions;
        console.log(response.conditions);
        this.dataSourceTaf = response.forecast;
        console.log(response.forecast);
        this.conditionsArray = response.forecast.conditions;
        
        this.loading = false;
      }
    })}, 5000);
  }

  getDataSource(condition: Condition): MatTableDataSource<{ key: string; value: any }> {
    const data: { key: string; value: any }[] = [];
    Object.keys(condition).forEach(key => {
      if (this.isObject(condition[key as keyof Condition])){
        data.push({ key, value: condition[key as keyof Condition] });
      }else{
        data.push({ key, value: condition[key as keyof Condition] });
      }
      
    });
    return new MatTableDataSource(data);
  }
  formatValue(value: any): string {
    if (typeof value === 'object') {
      return this.prettyPrint(value);
    } else {
      return value.toString();
    }
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  prettyPrint(obj: any): string {
    let result = '';

    if (Array.isArray(obj)) {
      // If obj is an array of objects
      for (const item of obj) {
        result += this.prettyPrint(item); // Recursively format each object
        result += '\n'; // Add a newline after each object
      }
    } else {
      // If obj is an individual object
      for (const key of Object.keys(obj)) {
        result += `${key} : ${obj[key]}\n`;
      }
    }

    return result;
  }

}
