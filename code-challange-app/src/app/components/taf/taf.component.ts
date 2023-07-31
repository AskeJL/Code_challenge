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

export interface TafModified {
  text:        string;
  ident:       string;
  dateIssued:  string;
  period:      Period;
  lat:         number;
  lon:         number;
  elevationFt: number;
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
    dataSource = {} as TafModified;
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
  
  ngOnInit(): void {
    this.timestamps = this.forecastService.getStoredTimestamps('Taf');
  }

  onSearch() {
    this.forecastService.getTaf(this.searchQuery)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = {
          text : response.text, 
          ident:       response.ident,
          dateIssued:  response.dateIssued,
          period:      response.period,
          lat:         response.lat,
          lon:         response.lon,
          elevationFt: response.elevationFt,
        };
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
      for (const item of obj) {
        result += this.prettyPrint(item); // Recursively format each object
        result += '\n'; 
      }
    } else if (typeof obj === 'string'){
      result += obj;
      result += '\n';
    } 
    else {
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
      this.dataSource = {
        text : this.selectedData.text, 
        ident:       this.selectedData.ident,
        dateIssued:  this.selectedData.dateIssued,
        period:      this.selectedData.period,
        lat:         this.selectedData.lat,
        lon:         this.selectedData.lon,
        elevationFt: this.selectedData.elevationFt,
      };
      this.conditionsArray = this.selectedData.conditions;
    } else {
      this.selectedData = null; // No data selected
    }
  }
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

}
