import {Injectable} from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {AppConstants} from '../../../shared/app.constants';

@Injectable()
export class AdminManageFieldService {

  constructor(private apiService: ApiService) {
  }

  getAllColumns_a() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getAllColumns_a);
  }

  addNewField_a(peopleForm) {
    const requestParam = {
      peopleForm: peopleForm
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.addNewField_a, requestParam);
  }

}
