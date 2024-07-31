import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HighchartsChartModule } from 'highcharts-angular';
import { ListCountriesComponent } from 'src/components/list-countries/list-countries.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { ViewCountryComponent } from 'src/components/view-country/view-country.component';
import { ViewDashboardComponent } from 'src/components/view-dashboard/view-dashboard.component';

import { ViewCountryStockHoldingsComponent } from '../components/country-stocks/view-country-stock-holdings/view-country-stock-holdings.component';
import { ViewCountryStockOrderComponent } from '../components/country-stocks/view-country-stock-order/view-country-stock-order.component';
import { ViewCountryStocksComponent } from '../components/country-stocks/view-country-stocks/view-country-stocks.component';
import { ExpandingStocksTableComponent } from '../components/expanding-stocks-table/expanding-stocks-table.component';
import { AddCountryModalComponent } from '../components/modal-components/add-country-modal/add-country-modal.component';
import { AddStocksOrderModalComponent } from '../components/modal-components/add-stocks-order-modal/add-stocks-order-modal.component';
import { EditStocksOrderModalComponent } from '../components/modal-components/edit-stocks-order-modal/edit-stocks-order-modal.component';
import { ObjectNgSelectComponent } from '../components/object-ng-select/object-ng-select.component';
import { ViewStockInsightsComponent } from '../components/view-stock-insights/view-stock-insights.component';
import { AbsPipe } from '../pipe/abs.pipe';
import { FindRelevantStocksPipe } from '../pipe/find-relevant-stocks.pipe';
import { JoinWithCommaPipe } from '../pipe/join-with-us.pipe';
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
        ViewCountryStockHoldingsComponent,
        ViewCountryStocksComponent,
        ObjectNgSelectComponent,
        AddStocksOrderModalComponent,
        EditStocksOrderModalComponent,
        ExpandingStocksTableComponent,
        ViewStockInsightsComponent,
        FindRelevantStocksPipe,
        JoinWithCommaPipe,
        AbsPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgSelectModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTabsModule,
        HighchartsChartModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
