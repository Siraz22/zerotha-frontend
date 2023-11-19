import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListCountriesComponent } from 'src/components/list-countries/list-countries.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { ViewCountryComponent } from 'src/components/view-country/view-country.component';
import { ViewDashboardComponent } from 'src/components/view-dashboard/view-dashboard.component';

import { AddCountryModalComponent } from '../components/modal-components/add-country-modal/add-country-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, ViewDashboardComponent, NavbarComponent, ViewCountryComponent, ListCountriesComponent, AddCountryModalComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule, NgSelectModule, AppRoutingModule, BrowserAnimationsModule, MatTabsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
