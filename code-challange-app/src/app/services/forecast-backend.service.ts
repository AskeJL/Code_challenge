import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Metar} from 'src/app/components/metar/metar.component'
import {Taf} from 'src/app/components/taf/taf.component'
import {Full} from 'src/app/components/full/full.component'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastBackendService {
  private cache: { url: string; data: any; timestamp: number }[] = [];
  private cacheTTL: number = 100;//900000; // 15 minutes in milliseconds
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getMetar(name: string){
    return this.getDataFromCacheOrFetch(this.baseApiUrl + "/Forecast/GetMetar?airportString="+name);
    return this.http.get<Metar>(this.baseApiUrl + "/Forecast/GetMetar?airportString="+name);
  }

  getTaf(name: string){
    return this.getDataFromCacheOrFetch(this.baseApiUrl + "/Forecast/GetTaf?airportString="+name);
    return this.http.get<Taf>(this.baseApiUrl + "/Forecast/GetTaf?airportString="+name);
  }

  getFull(name: string){
    return this.getDataFromCacheOrFetch(this.baseApiUrl + "/Forecast/GetFull?airportString="+name);
    return this.http.get<Full>(this.baseApiUrl + "/Forecast/GetFull?airportString="+name);
  }

  getDataFromCacheOrFetch(url: string): Observable<any> {
    const cachedData = this.cache.find((entry) => entry.url === url);

    if (cachedData && Date.now() - cachedData.timestamp < this.cacheTTL) {
      // Return data from cache if it's within the TTL
      return of(cachedData.data);
    } else {
      // Fetch the data from the API
      return this.http.get(url).pipe(
        map((data) => {
          // Cache the fetched data with a timestamp
          console.log({ url, data, timestamp: Date.now() });
          this.cache.push({ url, data, timestamp: Date.now() });
          return data;
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return of(null); // Return null or an empty value in case of an error
        })
      );
    }
  }

  getStoredTimestamps(s:string): number[] {
    return this.cache.filter((entry) => entry.url.includes(s)).map((data) => data.timestamp);
  }

  getStoredDataByTimestamp(timestamp: number): any {
    const entry = this.cache.find((item) => item.timestamp === timestamp);
    return entry ? entry.data : null;
  }
}
