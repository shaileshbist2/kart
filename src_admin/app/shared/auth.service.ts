import {Injectable} from '@angular/core';
import {SessionService} from './session.service';

@Injectable()
export class AuthService {
  adminClaim: any;

  constructor(private sessionService: SessionService) {
    const claim = this.sessionService.getItem('adminClaim');
    if (claim) {
      this.adminClaim = claim;
    } else {
      this.adminClaim = {
        isAuthenticated: false,
        token: null
      };
    }
  }

  authorizedFullName() {
    return this.adminClaim.firstName + ' ' + this.adminClaim.lastName;
  }

  isAuthorised = function () {
    return this.adminClaim.isAuthenticated;
  };

  logout = function () {
    this.adminClaim = {
      isAuthenticated: false,
      token: null
    };
    this.sessionService.removeItem('adminClaim');
    // this.sessionService.clearAll();
  };

  ngOnInit() {
  }
}
