import {Injectable} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {AppConstants} from '../../shared/app.constants';


@Injectable()
export class UserOurServicesService {
    constructor(private apiService: ApiService) {
    }

}
