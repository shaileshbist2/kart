import {Injectable} from '@angular/core';
import {AppConstants} from '../../../../../shared/app.constants';
import {ApiService} from '../../../../../shared/api.service';

@Injectable()
export class TextBoxService {

  constructor(private apiService: ApiService) {
  }

  checkInputValue_a(field_name, value) {
    const requestParam = {
      column: field_name,
      value: value
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.checkInputValue_a, requestParam);
  }

  // addNewField_a(peopleForm) {
  //   const requestParam = {
  //     peopleForm: peopleForm
  //   };
  //   return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.addNewField_a, requestParam);
  // }
}
