import { Component, OnInit } from '@angular/core';
import { ForecastBackendService} from "src/app/services/forecast-backend.service"
import {MatTableModule} from '@angular/material/table';

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
    
  constructor(private forecastService: ForecastBackendService) {
    this.searchQuery = "";
   }

  ngOnInit(): void {
  }
  onSearch() {
    this.forecastService.getMetar(this.searchQuery)
    .subscribe({
      next: (response) => {
        this.dataSource = response;
      }
    })
  }
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  prettyPrint(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

}
