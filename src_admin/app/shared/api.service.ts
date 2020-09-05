import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HelperService} from './helper.service';

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient, private helperService: HelperService) {
    }

    executeGetMethod(method) {
        return this.httpClient.get<any>(method)
            .map(response => response)
            .catch(this.helperService.handleError);
    }

    executePostMethod(method, params?, header?) {
        const requestParams: any = JSON.stringify(params);
        return this.httpClient.post<any>(method, requestParams, {headers: header})
            .map(response => response)
            .catch(this.helperService.handleError);
    }
}
