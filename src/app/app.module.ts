import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ViewDashboardComponent } from "src/components/view-dashboard/view-dashboard.component";
import { NavbarComponent } from "src/components/navbar/navbar.component";
import { ViewCountryComponent } from "src/components/view-country/view-country.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { ListCountriesComponent } from "src/components/list-countries/list-countries.component";
import { NgbDropdown, NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    ViewDashboardComponent,
    NavbarComponent,
    ViewCountryComponent,
    ListCountriesComponent,
  ],
  imports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
