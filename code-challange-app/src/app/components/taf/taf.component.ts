import { Component, OnInit } from '@angular/core';
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
    displayedColumns: string[] = ['key', 'value'];
  constructor(private forecastService: ForecastBackendService) { 
    this.searchQuery = '';
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.forecastService.getTaf(this.searchQuery)
    .subscribe({
      next: (response) => {
        this.dataSource = response;
      }
    })
  }

}
