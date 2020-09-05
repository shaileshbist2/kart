import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';

@Injectable()
export class SearchPeopleService {
    constructor(private apiService: ApiService) {
    }

    // login_vendor(loginData) {
    //     const requestParam = {
    //         email_id: loginData.email_id,
    //         password: loginData.password
    //     };
    //     return this.apiService.executePostMethod(AppConstants.appAuthServiceApi.login_vendor, requestParam);
    // }
}
