import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  public redirectToPath(path: string) {
    this.router.navigate([path]);
  }

  //hover events
  public hoverover(drop: NgbDropdown): void {
    drop.open();
  }

  public hoverout(drop: NgbDropdown): void {
    drop.close();
  }

  ngOnInit() {}
}
