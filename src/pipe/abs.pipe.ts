import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'absPipe',
})
export class AbsPipe implements PipeTransform {
    transform(num: number): any {
        return Math.abs(num);
    }
}
