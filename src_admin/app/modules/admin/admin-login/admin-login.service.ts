import {Injectable} from '@angular/core';
import {AppConstants} from '../../../shared/app.constants';
import {ApiService} from '../../../shared/api.service';

@Injectable()
export class AdminLoginService {

    constructor(private apiService: ApiService) {}

    doLogin(loginData) {
        return this.apiService.executePostMethod(AppConstants.appAuthServiceApi.login, loginData);
    }
}
