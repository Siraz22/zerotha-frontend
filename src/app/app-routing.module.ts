import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCountriesComponent } from 'src/components/list-countries/list-countries.component';
import { ViewCountryComponent } from 'src/components/view-country/view-country.component';
import { ViewDashboardComponent } from 'src/components/view-dashboard/view-dashboard.component';

import { ViewCountryInfoComponent } from '../components/view-country-info/view-country-info.component';
import { ViewCountryInvestmentComponent } from '../components/view-country-investment/view-country-investment.component';
import { InvestmentType } from '../enums/Investment-type';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: ViewDashboardComponent },
    {
        path: 'country/:countryId',
        component: ViewCountryComponent,
        children: [
            { path: 'stocks', component: ViewCountryInvestmentComponent, data: { selectedInvestmentType: InvestmentType.STOCK } },
            { path: 'debt', component: ViewCountryInvestmentComponent, data: { selectedInvestmentType: InvestmentType.DEBT } },
            { path: 'digital', component: ViewCountryInvestmentComponent, data: { selectedInvestmentType: InvestmentType.DIGITAL_ASSETS } },
            { path: 'metals', component: ViewCountryInvestmentComponent, data: { selectedInvestmentType: InvestmentType.PRECIOUS_METALS } },
            { path: 'mutual-funds', component: ViewCountryInvestmentComponent, data: { selectedInvestmentType: InvestmentType.MUTUAL_FUNDS } },
            { path: 'info', component: ViewCountryInfoComponent },
            { path: '', redirectTo: 'stocks', pathMatch: 'full' },
        ],
    },
    { path: 'country', component: ListCountriesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
