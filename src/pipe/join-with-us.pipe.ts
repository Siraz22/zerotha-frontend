import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'joinWithCommaPipe',
})
export class JoinWithCommaPipe implements PipeTransform {
    transform(arr: string[]): string {
        return arr.join(', ');
    }
}
