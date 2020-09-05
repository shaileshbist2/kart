import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserLeadSearchService} from './user-lead-search.service';
import {Router} from '@angular/router';
import {UserContactModel} from '../../models/user/userDataSearchModel';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../shared/auth.service';
import {DataTableDirective} from 'angular-datatables';
import {SessionService} from '../../shared/session.service';

declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user-lead-search',
  styleUrls: ['./user-lead-search.component.css'],
  templateUrl: './user-lead-search.component.html'
})
export class UserLeadSearchComponent implements OnInit, AfterViewInit {
  inputType2 = new Subject<string>();
  dtOptions: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  totalRec: any;
  persons: any;
  filter_view = false;
  input_value: any;
  contactModel: any;
  companyModel: any;
  searchInput = '';
  isAuthorized: any;
  loading = false;
  showCompanyDetail = false;
  purchaseBtn = true;
  zeroCreditFlag = false;
  creditsDetails: any;
  selectedFilterObj = {
    country: [],
    state: [],
    industry: [],
    domain: [],
    department: [],
    management_level: [],
    revenue: []
  };
  country: any = [];
  state: any = [];
  domain: any = [];
  industry: any = [];
  department: any = [];
  selectedCountry = [];
  selectedState = [];
  selectedDomain = [];
  selectedIndustry = [];
  selectedDepartment = [];
  country_setting = {};
  state_setting = {};
  domain_setting = {};
  industry_setting = {};
  department_setting = {};
  superObj: any;
  allpersons = false;
  filterCheckedObj: any;
  checkedObj = {
    country: [],
    state: [],
    industry: [],
    domain: [],
    management_level: [],
    revenue: []
  };
  managementLevelArray = [];
  revenueArray = [];
  selectAllCountry = false;
  selectAllState = false;
  selectAllIndustry = false;
  selectAllDomain = false;
  selectAllManagementLevel = false;
  selectAllRevenue = false;
  getItView = false;
  spinner = false;
  errorMsgView = false;
  successMsg = '';
  searchingBy = 'default';

  constructor(private service: UserLeadSearchService,
              private router: Router,
              private authService: AuthService,
              private http: HttpClient,
              private sessionService: SessionService) {
    this.inputType2.pipe(
      debounceTime(700),
      distinctUntilChanged())
      .subscribe(value => {
        this.dataTableList_user(value);
        // this.sessionService.addItem('searchObject', {name: value, count: 0, type: ''});
      });
  }

  dataTableList_user(input_value) {
    this.input_value = input_value;
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      serverSide: true,
      deferRender: true,
      destroy: true,
      searching: false,
      lengthChange: true,
      pageLength: 10,
      dom: `<'top'<'actions'>lfpi<'clear'>><'clear'>rt<'bottom'>
            <'top'li><'bottom'><'clear'>
            <'row'<'col-sm-12'p>>`,
      language: {
        search: 'Filter records:',
        zeroRecords: '',
        processing: `<div class='a' style='--n: 5;'>
                        <div class='dot' style='--i: 0;'></div>
                        <div class='dot' style='--i: 1;'></div>
                        <div class='dot' style='--i: 2;'></div>
                        <div class='dot' style='--i: 3;'></div>
                        <div class='dot' style='--i: 4;'></div>
                      </div>`
      },
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.loading = true;
        this.service.dataTableList_user(dataTablesParameters,
          this.input_value,
          this.selectedFilterObj,
          this.searchingBy).subscribe(resp => {
          this.persons = resp.data;
          this.totalRec = resp.recordsTotal;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
          this.loading = false;
        });
      },
      /*columns: [{title: 'NAME'},
        {title: 'COMPANY'},
        {title: 'DESIGNATION'},
        {title: 'STATE'},
        {title: 'COUNTRY'},
        {title: 'UPDATED'},
        {title: 'VIEW'}],*/
      responsive: true,
      // scrollY: 420,
      // scrollX: 450
    };
    this.dtTrigger.next();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  countrySetting() {
    this.country_setting = {
      text: 'Select Countries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'country_name',
      enableSearchFilter: true,
      searchBy: ['country_name'],
      badgeShowLimit: 5,
    };
  }

  stateSetting() {
    this.state_setting = {
      text: 'Select States',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'state_name',
      enableSearchFilter: true,
      searchBy: ['state_name'],
      badgeShowLimit: 5,
    };
  }

  domainSetting() {
    this.domain_setting = {
      text: 'Select Domains',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'domain_name',
      enableSearchFilter: true,
      searchBy: ['domain_name'],
      badgeShowLimit: 5,
    };
  }

  industrySetting() {
    this.industry_setting = {
      text: 'Select Industries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'industry_name',
      enableSearchFilter: true,
      searchBy: ['industry_name'],
      badgeShowLimit: 5,
    };
  }

  departmentSetting() {
    this.department_setting = {
      text: 'Select Departments',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      primaryKey: 'id',
      labelKey: 'department_name',
      enableSearchFilter: true,
      searchBy: ['department_name'],
      badgeShowLimit: 5,
    };
  }

  /********************** Checkbox Selection on DataTable *****************************/
  checkAllSelectCheckbox(isChecked) {
    const data_set = this.persons.filter(function (data) {
      return data.selected === true;
    });
    if (data_set.length > 0) {
      this.getItView = true;
    } else {
      this.getItView = false;
    }
  }

  toggleSelect = function (event) {
    this.allpersons = event.target.checked;
    this.persons.forEach(function (item) {
      item.selected = event.target.checked;
    });
    this.getItView = this.allpersons;
  };

  purchaseSelectedContacts(isValid: boolean) {
    const data_set = this.persons.filter(function (data) {
      return data.selected === true;
    });
    if (!isValid) {
      return;
    }
    if (data_set.length > 0) {
      this.spinner = true;
      this.service.purchaseSelectedContacts_user(data_set).subscribe(response => {
        this.spinner = false;
        this.errorMsgView = false;
        this.successMsg = 'Successfully done';
        this.dataTableList_user('');
        this.getCreditsStatus_user();
        this.allpersons = false;
      }, error => {
        this.successMsg = '';
        this.spinner = false;
        this.errorMsgView = true;
      });
    }
  }

  searchingByFunc(val) {
    this.searchingBy = val;
    this.dataTableList_user(this.searchInput);
  }

  /********** CHECK CONTACT PURCHASED OR NOT *******************/
  isContactPurchased_user(peopleDataId) {
    this.loading = true;
    this.service.isContactPurchased_user(peopleDataId).subscribe(response => {
      this.contactModel = response.data[0].personDetail[0];
      this.companyModel = response.data[0].companyDetail[0];
      this.showCompanyDetail = this.companyModel !== undefined; // true or false
      this.loading = false;
    });
  }

  /************ GET CREDITS STATUS *******************************************/
  getCreditsStatus_user() {
    this.service.getCreditsStatus_user().subscribe(response => {
      this.creditsDetails = response.data[0].creditsDetails[0];
    });
  }

  /********** PURCHASE NOW **************************************/
  purchaseContactNow_user(people_data_id) {
    this.service.purchaseContactNow_user(people_data_id).subscribe(response => {
      this.isContactPurchased_user(people_data_id);
      this.getCreditsStatus_user();
      this.zeroCreditFlag = false;
    }, error => {
      if (error === 'zero_credit_found') {
        this.zeroCreditFlag = true;
        this.purchaseBtn = false;
      } else {
        this.zeroCreditFlag = false;
        this.purchaseBtn = true;
      }
    });
  }

  getContactObjInfo(data) {
    this.contactModel = data;
  }

  checkDataId(person) {
    this.isContactPurchased_user(person.people_data_id);
  }

  checkAuth() {
    this.isAuthorized = this.authService.isAuthorised();
    if (this.isAuthorized === false) {
      this.router.navigateByUrl('user/login');
    }
  }

  ngOnInit() {
    // if (this.sessionService.getItem('comp_name') === null) {
    //   this.sessionService.addItem('comp_name', {name: '', count: '', type: ''});
    // }
    this.searchInput = this.sessionService.getItem('comp_name') === null ? '' : this.sessionService.getItem('comp_name');
    this.countrySetting();
    this.stateSetting();
    this.domainSetting();
    this.industrySetting();
    this.departmentSetting();
    this.contactModel = new UserContactModel();
    this.dataTableList_user(this.searchInput);
    this.getManagementLevelAndRevenue_user();
  }

  onCountrySelect($event) {
    this.selectedFilterObj.country.push($event);
  }

  OnCountryDeSelect(item: any) {
    this.selectedFilterObj.country.splice(this.selectedFilterObj.country.map((itm) => itm.id).indexOf(item.id), 1);
  }

  onStateSelect($event) {
    this.selectedFilterObj.state.push($event);
  }

  OnStateDeSelect(item: any) {
    this.selectedFilterObj.state.splice(this.selectedFilterObj.state.map((itm) => itm.id).indexOf(item.id), 1);
  }

  onDomainSelect($event) {
    this.selectedFilterObj.domain.push($event);
  }

  OnDomainDeSelect(item: any) {
    this.selectedFilterObj.domain.splice(this.selectedFilterObj.domain.map((itm) => itm.id).indexOf(item.id), 1);
  }

  onIndustrySelect($event) {
    this.selectedFilterObj.industry.push($event);
  }

  OnIndustryDeSelect(item: any) {
    this.selectedFilterObj.industry.splice(this.selectedFilterObj.industry.map((itm) => itm.id).indexOf(item.id), 1);
  }

  onDepartmentSelect($event) {
    this.selectedFilterObj.department.push($event);
  }

  OnDepartmentDeSelect(item: any) {
    this.selectedFilterObj.department.splice(this.selectedFilterObj.department.map((itm) => itm.id).indexOf(item.id), 1);
  }

  onSelectAllCountry(items: any) {
    this.selectedFilterObj.country = items;
  }

  onDeSelectAllCountry(items: any) {
    this.selectedFilterObj.country = [];
  }

  onSelectAllState(items: any) {
    this.selectedFilterObj.state = items;
  }

  onDeSelectAllState(items: any) {
    this.selectedFilterObj.state = [];
  }

  onSelectAllDomain(items: any) {
    this.selectedFilterObj.domain = items;
  }

  onDeSelectAllDomain(items: any) {
    this.selectedFilterObj.domain = [];
  }

  onSelectAllIndustry(items: any) {
    this.selectedFilterObj.industry = items;
  }

  onDeSelectAllIndustry(items: any) {
    this.selectedFilterObj.industry = [];
  }

  onSelectAllDepartment(items: any) {
    this.selectedFilterObj.department = items;
  }

  onDeSelectAllDepartment(items: any) {
    this.selectedFilterObj.department = [];
  }

  onSelectManagementLevel(ml, isChecked) {
    if (isChecked === true) {
      this.selectedFilterObj.management_level.push({id: ml.id, management_level: ml.management_level});
    } else {
      this.selectedFilterObj.management_level.splice(this.selectedFilterObj.management_level.map((itm) => itm.id).indexOf(ml.id), 1);
    }
  }

  onSelectRevenue(id, item, isChecked) {
    if (isChecked === true) {
      this.selectedFilterObj.revenue.push({id: id, revenue: item});
    } else {
      this.selectedFilterObj.revenue.splice(this.selectedFilterObj.revenue.map((itm) => itm.id).indexOf(id), 1);
    }
  }

  optionsObject(evt, check, selectedObj) {
    return this.superObj = {
      evt: evt,
      check: check,
      selected_obj: selectedObj
    };
  }

  onSearchCountry(evt: any) {
    this.superObj = this.optionsObject(evt, 'country', []);
    this.service.setFilterData_user(this.superObj).subscribe(response => {
      this.country = response.data[0].country;
    });
  }

  onSearchState(evt: any) {
    this.superObj = this.optionsObject(evt, 'state', this.selectedCountry);
    this.service.setFilterData_user(this.superObj).subscribe(response => {
      this.state = response.data[0].state;
    });
  }

  onSearchDomain(evt: any) {
    this.superObj = this.optionsObject(evt, 'domain', []);
    this.service.setFilterData_user(this.superObj).subscribe(response => {
      this.domain = response.data[0].domain;
    });
  }

  onSearchIndustry(evt: any) {
    this.superObj = this.optionsObject(evt, 'industry', []);
    this.service.setFilterData_user(this.superObj).subscribe(response => {
      this.industry = response.data[0].industry;
    });
  }

  onSearchDepartment(evt: any) {
    this.superObj = this.optionsObject(evt, 'department', []);
    this.service.setFilterData_user(this.superObj).subscribe(response => {
      this.department = response.data[0].department;
    });
  }

  getManagementLevelAndRevenue_user() {
    this.service.getManagementLevelAndRevenue_user().subscribe(response => {
      this.managementLevelArray = response.data[0].management_level;
      this.revenueArray = response.data[0].revenue;
    });
  }

  resetSearch() {
    this.searchInput = '';
    this.sessionService.removeItem('comp_name');
    this.selectedCountry = [];
    this.selectedState = [];
    this.selectedDomain = [];
    this.selectedIndustry = [];
    this.selectedDepartment = [];
    this.selectedFilterObj = {
      country: [],
      state: [],
      industry: [],
      domain: [],
      department: [],
      management_level: [],
      revenue: []
    };
    for (const data of this.managementLevelArray) {
      data['is_checked'] = false;
    }
    for (const data of this.revenueArray) {
      data['is_checked'] = false;
    }
    this.dataTableList_user(this.searchInput);
    // this.sessionService.addItem('searchObject', {name: '', count: '', type: ''});
    this.searchInput = '';
  }

  getSelectedFilterObj() {
    this.dataTableList_user('');
  }
}
