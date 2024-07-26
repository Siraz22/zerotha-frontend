import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

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
    public searchInput: Subject<string | null>;
    @Input()
    public placeholder: string;
    @Input()
    public bindValue: string;
    @Input()
    public disabled: boolean;
    @Input()
    public hideClearAll: boolean;
    @Input()
    public clearable = true;

    @Output()
    public selectedObject = new EventEmitter<any>();

    public value: any;
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

    public change(event: any): void {
        this.onChange(event[this.bindValue]);
        this.selectedObject.emit(event);
    }
}
