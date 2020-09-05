import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import {UserHistoryService} from './user-history.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserHistoryModel} from '../../models/user/userHistoryModel';
import {SessionService} from '../../shared/session.service';
import {AppConstants} from '../../shared/app.constants';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

declare var $: any;

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  historyModel: any;
  companyModel: any;
  successMsg: any;
  errorMsg: any;
  public loading = false;
  public btnLoading = false;
  contactHistory: any;
  assetsPath: any;
  totalRec: any;
  dtOptions: any = {};
  storePurchasedList: any;
  listArray = [];
  filterType: any;
  filterTypeData: any;
  listArrayData: any;
  allPersons: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private service: UserHistoryService,
              private router: Router,
              private authService: AuthService) {
  }

  purchasedList = [];

  callData(filterType) {
    this.purchasedList_user();
    this.listArray = [];
    this.contactHistory_user(filterType, this.storePurchasedList);
  }

  purchasedList_user() {
    this.service.purchasedList_user().subscribe(response => {
      this.storePurchasedList = response.data[0].purchasedList;
      this.purchasedList = response.data[0].purchasedList;
    });
  }

  logCheckbox(filterType, data, isChecked) {
    if (isChecked === true) {
      this.listArray.push(data);
    } else {
      const purchased_list_id = data.purchased_list_id;
      for (let i = 0; i < this.listArray.length; i++) {
        if (this.listArray[i].purchased_list_id == purchased_list_id) {
          this.listArray.splice(i, 1);
        }
      }
    }
    this.contactHistory_user(filterType, this.listArray.length === 0 ? this.storePurchasedList : this.listArray);
  }

  contactHistory_user(filterType = '', listArray) {
    this.filterTypeData = filterType;
    this.listArrayData = listArray;
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      processing: true,
      serverSide: true,
      deferRender: true,
      searching: true,
      destroy: true,
      lengthChange: true,
      pageLength: 10,
      dom: `<'top'<'actions'>lfpi<'clear'>><'clear'>rt<'bottom'>
            <'top'li><'bottom'><'clear'>
            <'row'<'col-sm-4'p>>`,
      language: {
        search: '',
        zeroRecords: '',
        processing: `<div class="a" style="--n: 5;">
                        <div class="dot" style="--i: 0;"></div>
                        <div class="dot" style="--i: 1;"></div>
                        <div class="dot" style="--i: 2;"></div>
                        <div class="dot" style="--i: 3;"></div>
                        <div class="dot" style="--i: 4;"></div>
                      </div>`
      },
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        $('.allperson').prop('checked', false);
        this.service.contactHistory_user(dataTablesParameters, this.filterTypeData, this.listArrayData).subscribe(resp => {
          this.contactHistory = resp.data;
          this.totalRec = resp.recordsTotal;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      scrollY: 510,
      // scrollX: 904
    };
    this.dtTrigger.next();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }


  /********************** Checkbox Selection on DataTable *****************************/
  toggleSelect = function (event) {
    this.allPersons = event.target.checked;
    this.contactHistory.forEach(function (item) {
      item.selected = event.target.checked;
    });
  };

  emailSelectedContacts_user(isValid: boolean) {
    const dataSet = this.contactHistory.filter(function (data) {
      return data.selected === true;
    });
    if (!isValid) { return; }
    if (dataSet.length > 0) {
      this.errorMsg = '';
      this.btnLoading = true;
      this.service.emailSelectedContacts_user(dataSet).subscribe(response => {
        if (response.message === 'success') {
          this.successMsg = '[ Successfully sent ]';
          this.btnLoading = false;
        } else {
          this.successMsg = '';
          this.btnLoading = false;
        }
      });
    } else {
      this.successMsg = '';
      this.errorMsg = '[ Please select the contacts ]';
    }
  }

  emailAllContacts_user() {

  }

  /***********************************************************************************/

  getContactObjInfo(data) {
    this.historyModel = data;
  }

  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    }

    if (!this.authService.isEmailVerified()) {
      this.router.navigateByUrl('user/setting');
    }
    this.assetsPath = AppConstants.assetsPath;
    this.historyModel = new UserHistoryModel();
    this.contactHistory_user('credit', []);
    this.purchasedList_user();
  }
}
