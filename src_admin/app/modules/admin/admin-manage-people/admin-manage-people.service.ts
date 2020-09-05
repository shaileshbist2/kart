import {Injectable} from '@angular/core';
import {AppConstants} from '../../../shared/app.constants';
import {ApiService} from '../../../shared/api.service';
import {of} from 'rxjs';

@Injectable()
export class AdminManagePeopleService {

  constructor(private apiService: ApiService) {
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return term;
  }

  getDetails_a(people_data_id) {
    const requestParam = {
      people_data_id: people_data_id
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getDetails_a, requestParam);
  }

  getDashboardDetails_a() {
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.getDashboardDetails_a);
  }

  peopleList_a(dataTablesParameters, search_input, email_option_obj) {
    const requestParam = {
      draw: dataTablesParameters.draw,
      start: dataTablesParameters.start,
      length: dataTablesParameters.length,
      search: dataTablesParameters.search,
      search_input: search_input,
      email_option_obj: email_option_obj
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.peopleList_a, requestParam);
  }

  createUpdatePeopleData_a(value, action, people_data_id) {
    const requestParam = {
      people_json_data: value,
      action: action,
      people_data_id: people_data_id
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.createUpdatePeopleData_a, requestParam);
  }

  showContactDetails_a(people_data_id) {
    const requestParam = {
      people_data_id: people_data_id
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.showContactDetails_a, requestParam);
  }

  validateSelectedEmails_a(selected_emails) {
    const requestParam = {
      selected_emails: selected_emails
    };
    return this.apiService.executePostMethod(AppConstants.appWriterServiceApi.validateSelectedEmails_a, requestParam);
  }
}
