import { HttpClientModule } from '@angular/common/http';
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
import { AddStocksOrderModalComponent } from '../components/modal-components/add-stocks-order-modal/add-stocks-order-modal.component';
import { ObjectNgSelectComponent } from '../components/object-ng-select/object-ng-select.component';
import { ViewCountryInvestmentComponent } from '../components/view-country-investment/view-country-investment.component';
import { ViewCountryStockOrderComponent } from '../components/view-country-stock-order/view-country-stock-order.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        ViewDashboardComponent,
        NavbarComponent,
        ViewCountryComponent,
        ListCountriesComponent,
        AddCountryModalComponent,
        ViewCountryStockOrderComponent,
        ObjectNgSelectComponent,
        ViewCountryInvestmentComponent,
        AddStocksOrderModalComponent,
    ],
    imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgbModule, NgSelectModule, AppRoutingModule, BrowserAnimationsModule, MatTabsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
