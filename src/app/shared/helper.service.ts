import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class HelperService {

  constructor() {
  }

  stringEncoder = function (string) {
    return btoa(string);
  };

  stringDecoder = function (encodedString) {
    return atob(encodedString);
  };

  isUndefinedOrNull = function (obj) {
    return ((typeof obj === 'undefined') || obj === null || obj === '');
  };

  isBlank = function (str) {
    return (!str || 0 === str.length);
  };

  getDateTime = function (dt) {
    const currentDate = new Date(dt);
    return currentDate.getFullYear() + '-'
      + (currentDate.getMonth() + 1) + '-'
      + currentDate.getDate() + ' '
      + currentDate.getHours() + ':'
      + currentDate.getMinutes() + ':'
      + currentDate.getSeconds();
  };

  getLocalSystemDateTime = function () {
    let dd, mm, yyyy, hh, min, sec;
    const today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1; // January is 0!
    yyyy = today.getFullYear();
    hh = today.getHours();
    min = today.getMinutes();
    sec = today.getSeconds();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (min < 10) {
      min = '0' + min;
    }
    return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + sec;
  };

  getLocalSystemDate = function () {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1) > 9 ? (currentDate.getMonth() + 1) : '0' + (currentDate.getMonth() + 1);
    const day = currentDate.getDate() > 9 ? currentDate.getDate() : '0' + currentDate.getDate();
    return (year + '-' + month + '-' + day);
  };

  getLocalSystemTime = function () {
    const currentDate = new Date();
    return currentDate.getHours() + ':'
      + currentDate.getMinutes() + ':'
      + currentDate.getSeconds();
  };

  getCurrentUTCDateTime = function () {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  };

  getUTCDateTime = function (d) {
    const dt = new Date(d);
    return dt.getUTCFullYear() + '-'
      + (dt.getUTCMonth() + 1) + '-'
      + dt.getUTCDate() + ' '
      + dt.getUTCHours() + ':'
      + dt.getUTCMinutes() + ':'
      + dt.getUTCSeconds();
  };

  getUTCDate = function (d) {
    const dt = new Date(d);
    const year = dt.getUTCFullYear();
    const month = (dt.getUTCMonth() + 1) > 9 ? (dt.getUTCMonth() + 1) : '0' + (dt.getUTCMonth() + 1);
    const day = dt.getUTCDate() > 9 ? dt.getUTCDate() : '0' + dt.getUTCDate();
    return (year + '-' + month + '-' + day);
  };

  getDate = function (d) {
    const dt = new Date(d);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1) > 9 ? (dt.getMonth() + 1) : '0' + (dt.getMonth() + 1);
    const day = dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate();
    return (year + '-' + month + '-' + day);
  };

  getLocalDateTime = function (d) {
    return d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
  };

  strToTime = function (d) {
    const dt = new Date();
    return dt.getFullYear() + '-'
      + (dt.getMonth() + 1) + '-'
      + dt.getDate() + ' '
      + d;
  };

  toTime = function (timeString) {
    const timeTokens = timeString.split(':');
    return new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
  };

  validateDateRange = function (sDate, eDate) {
    sDate = new Date(this.getDate(sDate) + ' 00:00:00');
    let dsDate, deDate;
    let now = new Date(2999, 12, 31);
    if (!eDate)
      eDate = now;
    else {
      eDate = new Date(this.getDate(eDate) + ' 00:00:00');
    }
    return (sDate > eDate);
  };

  validateEndDate = function (sDate, eDate) {
    sDate = new Date(sDate);
    const cDate = new Date();
    const now = new Date(2999, 12, 31);
    if (!eDate || eDate == '0000-00-00 00:00:00')
      eDate = now;
    else {
      eDate = new Date(eDate);
    }
    return ((cDate <= eDate && cDate >= sDate));
  };

  validateTimeRange = function (sTime, eTime) {
    return (Date.parse('01/01/2011 ' + sTime) < Date.parse('01/01/2011 ' + eTime));
  };

  dateDifferenceInMinutes = function (date1, date2) {
    // Get 1 day in milliseconds
    const one_day = 1000 * 60;

    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
  };

  createGuid = function () {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
  };

  /** RC4.key(length:Number):String
   * @description  generate a random key with arbitrary length
   * @param   length: Number the length of the generated key
   * @return  String  a randomly generated key
   */
  generateKey = function (length) {
    const key = [];
    for (let i = 0; i < length; ++i)
      key[i] = 1 + ((Math.random() * 255) << 0);
    return String.fromCharCode.apply(String, key);
  };

  handleError = function (err: HttpErrorResponse | any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    // HelperService2.prototype.removeSession(err.error.message);
    // if (err.error.message === 'Unauthorized user') {
    //   localStorage.removeItem('userClaim');
    //   window.location.href = 'user/login';
    // }
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      // errorMessage = `ERROR: ${err.error.message}`;
      errorMessage = `ERROR: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.msg}`;
      // errorMessage = `ERROR: ${err.error.message}`;
      errorMessage = `${err.error.message}`;
    }
    return Observable.throw(errorMessage);
  };
}
