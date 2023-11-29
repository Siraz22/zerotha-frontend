import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.css'],
})
export class ViewCountryComponent implements OnInit {
  public countryList: string[] = ['India', 'America'];
  public selectedCountry: string = 'India';

  constructor() {}

  ngOnInit() {}

  selectedOption: number | null = null;

  selectOption(option: number): void {
    this.selectedOption = option;
  }
}
