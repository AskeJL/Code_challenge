import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders().set('x-foreflight-odense', 'true');
    
    this.http.get("/weather/report/KCPR", { headers: headers }).subscribe({
      next: result => console.log(result),
    });
  }
}
