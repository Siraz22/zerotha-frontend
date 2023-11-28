import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-object-ng-select',
    templateUrl: './object-ng-select.component.html',
    styleUrls: ['./object-ng-select.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ObjectNgSelectComponent),
            multi: true,
        },
    ],
})
export class ObjectNgSelectComponent implements ControlValueAccessor {
    @Input()
    public items: any[] = [];
    @Input()
    public searchFn: (searchTerm: string, item: any) => boolean;
    @Input()
    public labelFn: (item: any) => string;
    @Input()
    public placeholder: string;
    @Input()
    public bindValue: string;

    public value: string | string[];
    public onChange: (data: any) => void;
    public onTouch: () => void;

    constructor() {}
    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {}

    public change(): void {
        this.onChange(this.value);
    }
}
