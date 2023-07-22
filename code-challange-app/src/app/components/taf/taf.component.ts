import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ForecastBackendService} from "src/app/services/forecast-backend.service"
import { CloudLayer } from '../metar/metar.component';
import { Visibility } from '../metar/metar.component';

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
        data.push({ key, value: this.prettyPrint(condition[key as keyof Condition]) });
      }else{
        data.push({ key, value: condition[key as keyof Condition] });
      }
      
    });
    return new MatTableDataSource(data);
  }
  formatValue(value: any): string {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    } else {
      return value.toString();
    }
  }
  ngOnInit(): void {
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
  }
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  prettyPrint(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

}
