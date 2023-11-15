import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewDashboardComponent } from 'src/components/view-dashboard/view-dashboard.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { ViewCountryComponent } from 'src/components/view-country/view-country.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewDashboardComponent,
    NavbarComponent,
    ViewCountryComponent,
  ],
  imports: [NgSelectModule, FormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
