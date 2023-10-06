//just a quick and dirty to show nice names for properties

import { Pipe, PipeTransform } from '@angular/core';
import { TRANSLATION_STRINGS } from '../constants';
@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    return TRANSLATION_STRINGS[value] ?? value;
  }
}
