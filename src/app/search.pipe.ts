import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'Filter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any, check?: any): any {
    if (!args) {
      return value;
    }
    if (check === 'country') {
      return value.filter((val) => {
        return (val.country.toLocaleLowerCase().includes(args)) || (val.country_name.toLocaleLowerCase().includes(args));
      });
    } else if (check === 'state') {
      return value.filter((val) => {
        return (val.state.toLocaleLowerCase().includes(args)) || (val.state_name.toLocaleLowerCase().includes(args));
      });
    } else if (check === 'industry') {
      return value.filter((val) => {
        return (val.industry_name.toLocaleLowerCase().includes(args));
      });
    } else if (check === 'domain') {
      return value.filter((val) => {
        return (val.domain_name.toLocaleLowerCase().includes(args));
      });
    } else if (check === 'management_level') {
      return value.filter((val) => {
        return (val.management_level.toLocaleLowerCase().includes(args));
      });
    } else if (check === 'revenue') {
      return value.filter((val) => {
        return (val.revenue.toLocaleLowerCase().includes(args));
      });
    }
  }
}
