import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-ze-switchbar',
    templateUrl: './ze-switchbar.component.html',
    styleUrls: ['./ze-switchbar.component.css'],
})
export class ZeSwitchbarComponent implements OnInit {
    constructor() {}

    @Input()
    public items: any[];
    @Input()
    public selectedItemIndex: number;

    @Input()
    public labelFunction: (item: any) => string;

    ngOnInit() {}

    public itemSelected(item: any): void {}
}
