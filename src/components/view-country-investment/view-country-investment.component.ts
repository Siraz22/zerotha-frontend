import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CountryDTO } from '../../dto/CountryDTO';
import { InvestmentType } from '../../enums/Investment-type';
import { CountryService } from '../../service/country.service';

@Component({
    selector: 'app-view-country-investment',
    templateUrl: './view-country-investment.component.html',
    styleUrls: ['./view-country-investment.component.css'],
})
export class ViewCountryInvestmentComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router, private countryService: CountryService) {}

    public currentCountryDTO: CountryDTO;
    public activeTab: string = 'Insights';
    public selectedInvestmentType: InvestmentType;

    public InvestmentType = InvestmentType;

    ngOnInit() {
        this.route.parent.params.pipe(switchMap((params) => this.countryService.findOne(Number(params['countryId'])))).subscribe((countryDTO: CountryDTO) => {
            this.currentCountryDTO = countryDTO;
        });

        this.route.data.subscribe((routeData) => {
            this.selectedInvestmentType = routeData['selectedInvestmentType'];
        });
    }

    public tabClicked(selectedTab: MatTabChangeEvent): void {
        this.activeTab = selectedTab.tab.textLabel;
        this.router.navigate([], { queryParams: { activeTab: this.activeTab } });
    }
}
