import {Injectable} from '@angular/core';
import {SessionService} from './session.service';

@Injectable()
export class AuthService {
  userClaim: any;

  constructor(private sessionService: SessionService) {
    const claim = this.sessionService.getItem('userClaim');
    if (claim) {
      this.userClaim = claim;
    } else {
      this.userClaim = {
        firstName: null,
        lastName: null,
        isAuthenticated: false,
        emailVerified: false,
        token: null
      };
    }
  }

  isAuthorised = function () {
    const claim = this.sessionService.getItem('userClaim');
    if (claim) {
      this.userClaim = claim;
    } else {
      this.logout();
    }
    return this.userClaim.isAuthenticated;
  };

  isEmailVerified = function () {
    return this.userClaim.emailVerified;
  };

  logout = function () {
    this.userClaim = {
      firstName: null,
      lastName: null,
      isAuthenticated: false,
      emailVerified: false,
      token: null
    };
    this.sessionService.removeItem('userClaim');
    this.sessionService.removeItem('countryData');
    this.sessionService.removeItem('domainData');
    this.sessionService.removeItem('industryData');
    // this.sessionService.removeItem('searchObject');
  };

  loginEvent = function () {
    window.addEventListener('storage', function (event) {
      if (event.key === 'login-event') {
        window.location.pathname = '/';
      }
    }, false);
  };

  logoutEvent = function () {
    window.addEventListener('storage', function (event) {
      if (event.key === 'logout-event') {
        window.location.pathname = '/user/login';
      }
    }, false);
  };

  ngOnInit() {
    this.isAuthorised();
  }
}
