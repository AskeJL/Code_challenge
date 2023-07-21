import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from 'src/app/components/angular-welcome/welcome.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MetarComponent } from './components/metar/metar.component';
import { FullComponent } from './components/full/full.component';
import { TafComponent } from './components/taf/taf.component';

const routes: Routes = [
  { path: "", redirectTo: "weather", pathMatch: "full" },
  { path: 'weather', component: WeatherComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'metar', component: MetarComponent },
  { path: 'full', component: FullComponent },
  { path: 'taf', component: TafComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
