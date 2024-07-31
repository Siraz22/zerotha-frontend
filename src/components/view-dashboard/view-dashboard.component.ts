import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view-dashboard',
    templateUrl: './view-dashboard.component.html',
    styleUrls: ['./view-dashboard.component.css'],
})
export class ViewDashboardComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    public redirectToCountries(): void {
        this.router.navigate(['/country']);
    }
}
