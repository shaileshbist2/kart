import {HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Injectable} from '@angular/core';
import {HelperService} from '../helper.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private _router: Router,
              private helperService: HelperService) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    // console.log(err);
    if (err.status === 400 || err.status === 401 || err.status === 403) {
      if (err.error.message === 'Unauthorized user') {
        localStorage.removeItem('userClaim');
        this._router.navigate(['/user/login']);
      }
    }
    return Observable.throw(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({
      headers: request.headers
        .append('Content-Type', 'application/json')
    });
    if (!this.helperService.isUndefinedOrNull(this.auth.userClaim.token)) {
      request = request.clone({
        headers: request.headers
          .append('Authorization', `${this.auth.userClaim.token}`)
      });
    }
    return next.handle(request).catch(x => this.handleAuthError(x));
  }
}

