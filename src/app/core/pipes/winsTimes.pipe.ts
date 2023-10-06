import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'winTimes' })
export class WinTimesPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} ${value === 0 || value > 1 ? 'times' : 'time'}`;
  }
}
