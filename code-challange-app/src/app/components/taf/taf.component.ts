import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ForecastBackendService} from "src/app/services/forecast-backend.service"
import { CloudLayer } from '../metar/metar.component';
import { Visibility } from '../metar/metar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { time } from 'console';

export interface Taf {
  text:        string;
  ident:       string;
  dateIssued:  string;
  period:      Period;
  lat:         number;
  lon:         number;
  elevationFt: number;
  conditions:  Condition[];
}

export interface Condition {
  text:             string;
  dateIssued:       string;
  lat:              number;
  lon:              number;
  elevationFt:      number;
  relativeHumidity: number;
  flightRules:      string;
  cloudLayers:      CloudLayer[];
  cloudLayersV2:    CloudLayer[];
  weather:          string[];
  visibility:       Visibility;
  wind:             ConditionWind;
  period:           Period;
  change?:          string;
}

export interface Period {
  dateStart: string;
  dateEnd:   string;
}

export interface ConditionWind {
  speedKts:  number;
  direction: number;
  from:      number;
  variable:  boolean;
}
@Component({
  selector: 'app-taf',
  templateUrl: './taf.component.html',
  styleUrls: ['./taf.component.scss']
})


export class TafComponent implements OnInit {
    searchQuery: string;
    dataSource = {} as Taf;
    conditionsArray : Condition[] = [];
    displayedColumns: string[] = ['key', 'value'];
    timestamps: number[] = [];
    selectedTimestamp: number | null = null;
    selectedData: any;
  constructor(private forecastService: ForecastBackendService) { 
    this.searchQuery = '';
  }

  isKeyRow(row: any): boolean {
    return row.isKeyRow;
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
  ngOnInit(): void {
    this.timestamps = this.forecastService.getStoredTimestamps('Taf');
  }

  onSearch() {
    this.forecastService.getTaf(this.searchQuery)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = response;
        this.conditionsArray = response.conditions;
        console.log(this.dataSource);
      }
    })
    this.timestamps = this.forecastService.getStoredTimestamps('Taf');
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

  onTimestampSelected(timestamp: any | null) {
    this.selectedTimestamp = timestamp;
    if (timestamp !== null) {
      // Fetch the stored data for the selected timestamp
      this.selectedData = this.forecastService.getStoredDataByTimestamp(timestamp.value);
      console.log(this.selectedData);
      this.dataSource = this.selectedData;
      this.conditionsArray = this.selectedData.conditions;
    } else {
      this.selectedData = null; // No data selected
    }
  }
  formatTimestamp(timestamp: number): string {
    // Implement your desired timestamp formatting here (e.g., using 'Date' pipe)
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

}
