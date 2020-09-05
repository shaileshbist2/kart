import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AES} from 'crypto-js';

@Injectable()
export class SessionService {

    constructor(private cookieService: CookieService) {
    }

    getItem = function (itemName) {
        return JSON.parse(localStorage.getItem(itemName));
    };

    addItem = function (itemName, value) {
        localStorage.setItem(itemName, JSON.stringify(value));
    };

    removeItem = function (itemName) {
        localStorage.removeItem(itemName);
    };

    clearAll = function () {
        localStorage.clear();
    };

}
