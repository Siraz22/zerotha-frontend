import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListCountriesComponent } from "src/components/list-countries/list-countries.component";
import { ViewCountryComponent } from "src/components/view-country/view-country.component";
import { ViewDashboardComponent } from "src/components/view-dashboard/view-dashboard.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: ViewDashboardComponent },
  { path: "country/:id", component: ViewCountryComponent },
  { path: "countries", component: ListCountriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
