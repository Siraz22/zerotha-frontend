import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddCountryModalComponent } from "../modal-components/add-country-modal/add-country-modal.component";
import { CountryDTO } from "src/dto/CountryDTO";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-countries",
  templateUrl: "./list-countries.component.html",
  styleUrls: ["./list-countries.component.css"],
})
export class ListCountriesComponent implements OnInit {
  public countryDTOs: CountryDTO[];

  constructor(private modalService: NgbModal, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  public goToCountry(countryId: number): void {
    console.log("In function");
    this.router.navigate([`/country/${countryId}`]);
  }

  public openAddCountryModal(): void {
    //code to open a add country modal using ng bootstrap later
    this.modalService.open(AddCountryModalComponent);
  }

  public calculateWeight(id: number): number {
    return 0.5;
  }

  public calculateInvestedAmount(CountryDTO: CountryDTO): number {
    return 10000;
  }

  private findAll(): void {
    //dummy data for now
    this.countryDTOs = [
      { id: 1, name: "USA", currency: "US Dollars" },
      { id: 2, name: "India", currency: "Indian Rupee" },
    ];
  }
}
