import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Metar} from 'src/app/components/metar/metar.component'
import {Taf} from 'src/app/components/taf/taf.component'
import {Full} from 'src/app/components/full/full.component'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastBackendService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getMetar(name: string){
    return this.http.get<Metar>(this.baseApiUrl + "/Forecast/GetMetar?airportString="+name);
  }

  getTaf(name: string){
    return this.http.get<Taf>(this.baseApiUrl + "/Forecast/GetTaf?airportString="+name);
  }

  getFull(name: string){
    return this.http.get<Full>(this.baseApiUrl + "/Forecast/GetFull?airportString="+name);
  }
}
