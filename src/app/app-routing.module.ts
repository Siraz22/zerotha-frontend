import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDashboardComponent } from 'src/components/view-dashboard/view-dashboard.component';

import { ListCountriesComponent } from '../components/list-countries/list-countries.component';
import { ViewCountryComponent } from '../components/view-country/view-country.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: ViewDashboardComponent },
    { path: 'country/:countryId', redirectTo: 'country/:countryId/stocks', pathMatch: 'full' },
    { path: 'country/:countryId/:investmentType', component: ViewCountryComponent },
    { path: 'country', component: ListCountriesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
