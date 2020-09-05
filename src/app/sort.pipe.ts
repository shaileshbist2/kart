import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'Sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, check?: any): any {
    // if (!args) {
    //   return value;
    // }
    if (check === 'country') {
      return value.sort((a, b) => b.is_checked - a.is_checked);
    } else if (check === 'state') {
      return value.sort((a, b) => b.is_checked - a.is_checked);
    } else if (check === 'industry') {
      return value.sort((a, b) => b.is_checked - a.is_checked);
    } else if (check === 'domain') {
      return value.sort((a, b) => b.is_checked - a.is_checked);
    } else if (check === 'management_level') {
      return value.sort((a, b) => b.is_checked - a.is_checked);
    } else if (check === 'revenue') {
      return value.sort((a, b) => b.is_checked - a.is_checked);
    }
  }
}
