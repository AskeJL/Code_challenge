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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { time } from 'console';

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
  timestamps: number[] = [];
  selectedTimestamp: number | null = null;
  selectedData = {} as Full;
  constructor(private forecastService: ForecastBackendService) { 
    this.searchQuery = "";
  }

  ngOnInit(): void {
    this.timestamps = this.forecastService.getStoredTimestamps('Full');
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
    })}, 3000);
    this.timestamps = this.forecastService.getStoredTimestamps('Full');
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

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  prettyPrint(obj: any): string {
    let result = '';

    if (Array.isArray(obj)) {
      for (const item of obj) {
        result += this.prettyPrint(item); // Recursively format each object
        result += '\n';
      }
    } else {
      // If obj is an individual object
      for (const key of Object.keys(obj)) {
        result += `${key} : ${obj[key]}\n`;
      }
    }

    return result;
  }

  onTimestampSelected(timestamp: any | null) {
    this.selectedTimestamp = timestamp;
    if (timestamp !== null) {
      this.selectedData = this.forecastService.getStoredDataByTimestamp(timestamp.value);
      console.log(this.selectedData);
      this.dataSourceTaf = this.selectedData.forecast;
      this.dataSourceMetar = this.selectedData.conditions;
      this.conditionsArray = this.selectedData.forecast.conditions;
    } else {
      this.selectedData = {} as Full // No data selected
    }
  }
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

}
