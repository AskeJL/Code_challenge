import { Component, OnInit } from '@angular/core';
import { ForecastBackendService} from "src/app/services/forecast-backend.service"
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { time } from 'console';

interface TableRow {
  type: string;
  value: string;
}

export interface Metar {
    text:              string;
    ident:             string;
    dateIssued:        string;
    lat:               number;
    lon:               number;
    elevationFt:       number;
    tempC:             number;
    dewpointC:         number;
    pressureHg:        number;
    pressureHpa:       number;
    reportedAsHpa:     boolean;
    densityAltitudeFt: number;
    relativeHumidity:  number;
    flightRules:       string;
    cloudLayers:       any[];
    cloudLayersV2:     CloudLayer[];
    weather:           string[];
    visibility:        Visibility;
    wind:              ConditionsWind;
}

export interface CloudLayer {
  coverage:   string;
  altitudeFt: number;
  ceiling:    boolean;
  type?:      string;
}
export interface Visibility {
  distanceSm:                     number;
  distanceQualifier:              number;
  prevailingVisSm:                number;
  prevailingVisDistanceQualifier: number;
}

export interface ConditionsWind {
  speedKts: number;
  variable: boolean;
}

@Component({
  selector: 'app-metar',
  templateUrl: './metar.component.html',
  styleUrls: ['./metar.component.scss']
})
export class MetarComponent implements OnInit {
    searchQuery: string;
    tableData: TableRow[] = [];
    dataSource = {};
    displayedColumns: string[] = ['key', 'value'];
    timestamps: number[] = [];
    selectedTimestamp: number | null = null;
    selectedData: any;
    
  constructor(private forecastService: ForecastBackendService) {
    this.searchQuery = "";
   }

  ngOnInit(): void {
    this.timestamps = this.forecastService.getStoredTimestamps();
    // Set the initial data source to the latest fetched data (if available)
    this.selectedTimestamp = this.timestamps.length > 0 ? this.timestamps[this.timestamps.length - 1] : null;
    this.onTimestampSelected(this.selectedTimestamp); // Load the selected data initially.
  }
  onSearch() {
    this.forecastService.getMetar(this.searchQuery)
    .subscribe({
      next: (response) => {
        this.dataSource = response;
        console.log(this.dataSource);
      }
    })
    this.timestamps = this.forecastService.getStoredTimestamps();
    console.log(this.forecastService.getStoredTimestamps());
  }
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  prettyPrint(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  onTimestampSelected(timestamp: any | null) {
    this.selectedTimestamp = timestamp;
    if (timestamp !== null) {
      // Fetch the stored data for the selected timestamp
      this.selectedData = this.forecastService.getStoredDataByTimestamp(timestamp.value);
      console.log(this.selectedData);
      this.dataSource = this.selectedData;
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
