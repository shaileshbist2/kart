import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Injectable} from '@angular/core';
import {HelperService} from '../helper.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService,
                private helperService: HelperService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({
            headers: request.headers
                .append('Content-Type', 'application/json')
        });
        if (!this.helperService.isUndefinedOrNull(this.auth.adminClaim.token)) {
            request = request.clone({
                headers: request.headers
                    .append('Authorization', `Bearer ${this.auth.adminClaim.token}`)
            });
        }
        return next.handle(request);
    }
}
