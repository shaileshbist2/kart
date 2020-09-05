import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserPeopleSearchService} from './user-people-search.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {
  UserPeopleModel,
  UserContactModel,
  CreditsDetailsModel,
  CompanyInfoModel
} from '../../models/user/userPeopleModel';
import {SessionService} from '../../shared/session.service';
import {HttpClient} from '@angular/common/http';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs/Subject';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user-people-search',
  styleUrls: ['./user-people-search.component.css'],
  templateUrl: './user-people-search.component.html'
})
export class UserPeopleSearchComponent implements OnInit, AfterViewInit {
  isAuthorized: any;
  searchModel: any;
  public loading = false;
  public searchLoader = false;
  persons: any;
  contactModel: any;
  companyModel: any;
  creditsDetails: any;
  zeroCreditFlag = false;
  purchaseBtn = true;
  selectedOption: any;
  peopleSearchList: Array<string> = [];
  selectedValue: any;
  searchObject: any;
  designationData: any;
  departmentData: any;
  countryData: any;
  stateData: any;
  domainData: any = [];
  selectedCountry: any;
  arrayVal0 = [];
  arrayVal1 = [];
  arrayVal2 = [];
  arrayVal3 = [];
  arrayVal4 = [];
  result: any;
  countryString: any;
  stateString: any;
  levelString: any;
  departmentString: any;
  industryString: any;
  selectAllStates: any;
  selectAllLevel: any;
  selectAllDepartment: any;
  selectAllIndustry: any;
  stateFilter: any;
  managementLevelFilter: any;
  departmentFilter: any;
  industryFilter: any;
  searching = false;
  searchFailed = false;
  model: any;
  showCompanyDetail = false;
  totalRec: any;
  countryFilter: any;
  dtOptions: any = {};

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  results: Object;
  searchTerm$ = new Subject<string>();

  constructor(private service: UserPeopleSearchService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService,
              private http: HttpClient) {
  }

  /********************************************************************************/
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  formatter = (x: { name: string }) => this.model === '' ? '' : (x.name !== this.model ? this.model : x.name);

  /******************************************************************************/

  /************ PEOPLE LIST DATA-TABLE **********************************************************/

  peopleList_user() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      serverSide: true,
      deferRender: true,
      destroy: true,
      searching: true,
      lengthChange: true,
      pageLength: 25,
      dom: `<'top'<'actions'>lfpi<'clear'>><'clear'>rt<'bottom'>
            <'top'li><'bottom'><'clear'>
            <'row'<'col-sm-12'p>>`,
      language: {
        search: 'Filter records:',
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
        this.loading = true;
        this.service.peopleList_user(dataTablesParameters, this.filterObject).subscribe(resp => {
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


  /********************** Checkbox Selection on DataTable *****************************/
  // toggleSelect = function (event) {
  //   this.allpersons = event.target.checked;
  //   this.persons.forEach(function (item) {
  //     item.selected = event.target.checked;
  //   });
  //
  // };
  //
  // ApplyFilters(isValid: boolean) {
  //   let datas = this.persons.filter(function (data) {
  //     return data.selected == true
  //   });
  //   if (!isValid) return;
  // }

  /***********************************************************************************/


  /******* Accordion *******************************************************************/
  static setAccordion() {
    const acc = document.getElementsByClassName('accordion');
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }
  }

  /******************** People / Company Search Text Box *******************************************/
  onSelectSearch(event: TypeaheadMatch): void {
    this.model = event.item.name;
    this.filterObject.searchObject = event.item;
    this.sessionService.addItem('searchObject', event.item);
    this.stateFilter = [];
    this.managementLevelFilter = [];
    this.departmentFilter = [];
    this.industryFilter = [];

    this.filterObject.stateFilter = '';
    this.filterObject.managementLevelFilter = '';
    this.filterObject.departmentFilter = '';
    this.filterObject.industryFilter = '';

    this.filterObject.countryFilter = '';
    this.arrayVal1 = [];
    this.arrayVal2 = [];
    this.arrayVal3 = [];
    this.arrayVal4 = [];
    this.peopleList_user();
    this.setCountryToFilter_user();
  }

  setCountryToFilter_user() {
    this.service.setCountryToFilter_user(this.filterObject).subscribe(response => {
      this.countryFilter = response.data[0].countryFilter;
    });
  }


  /************* search according checkbox on select *******************************************/
  filterObject = {
    searchObject: {
      count: '',
      name: '',
      type: ''
    },
    countryFilter: '',
    stateFilter: '',
    managementLevelFilter: '',
    departmentFilter: '',
    industryFilter: ''
  };

  selectCountry(country, isChecked) {
    this.filterObject.stateFilter = '';
    this.filterObject.managementLevelFilter = '';
    this.filterObject.departmentFilter = '';
    this.filterObject.industryFilter = '';

    this.stateFilter = [];
    this.managementLevelFilter = [];
    this.departmentFilter = [];
    this.industryFilter = [];

    if (isChecked === true) {
      const obj = {};
      obj['name'] = country;
      this.arrayVal0.push(obj);
    } else {
      this.arrayVal0 = this.arrayVal0.filter(function (obj) {
        return obj['name'] !== country;
      });
    }
    this.countryString = this.arrayVal0.map(function (val) {
      return val.name;
    }).join(',');

    // this.selectedCountry = country;
    // this.filterObject.countryFilter = country;
    this.filterObject.countryFilter = this.countryString;
    this.peopleList_user();
    this.setStateToFilter_user();
    this.arrayVal1 = [];
    this.arrayVal2 = [];
    this.arrayVal3 = [];
    this.arrayVal4 = [];
    this.selectAllStates = false;
  }

  setStateToFilter_user() {
    this.service.setStateToFilter_user(this.filterObject).subscribe(response => {
      this.stateFilter = response.data[0].stateFilter;
    });
  }

  setLevelToFilter_user() {
    this.service.setLevelToFilter_user(this.filterObject).subscribe(response => {
      this.managementLevelFilter = response.data[0].managementLevelFilter;
    });
  }

  setDepartmentToFilter_user() {
    this.service.setDepartmentToFilter_user(this.filterObject).subscribe(response => {
      this.departmentFilter = response.data[0].departmentFilter;
    });
  }

  setIndustryToFilter_user() {
    this.service.setIndustryToFilter_user(this.filterObject).subscribe(response => {
      this.industryFilter = response.data[0].industryFilter;
    });
  }


  /***************************** SELECT FILTER OPTION **************************************/

  /************** STATE SELECTION *********************************************************/
  stateOptionsSelectAll() {
    for (let i = 0; i < this.stateFilter.length; i++) {
      if (this.stateFilter[i].state !== '') {
        const obj = {};
        this.stateFilter[i].selected = this.selectAllStates;
        if (this.stateFilter[i].selected === true) {
          obj['name'] = this.stateFilter[i].state;
          this.arrayVal1.push(obj);
        } else {
          const state = this.stateFilter[i].state;
          this.arrayVal1 = this.arrayVal1.filter(function (obj) {
            return obj['name'] !== state;
          });
        }
      }
    }
    this.stateString = this.arrayVal1.map(function (val) {
      return val.name;
    }).join(',');
    this.filterObject.stateFilter = this.stateString;
    // this.filterObject.countryFilter = this.selectedCountry;
    if (this.filterObject.stateFilter.length > 0) {
      this.setLevelToFilter_user();
      this.departmentFilter = [];
      this.industryFilter = [];
    } else {
      this.managementLevelFilter = [];
      this.departmentFilter = [];
      this.industryFilter = [];
    }
    this.filterObject.managementLevelFilter = '';
    this.arrayVal2 = [];
    this.filterObject.departmentFilter = '';
    this.arrayVal3 = [];
    this.filterObject.industryFilter = '';
    this.arrayVal4 = [];
    this.selectAllLevel = false;
    this.peopleList_user();
  }

  checkIfAllSelectedStates() {
    this.selectAllStates = this.stateFilter.every(function (item: any) {
      return item.selected === true;
    });
  }

  stateOptions(name, isChecked) {
    this.checkIfAllSelectedLevel();
    this.checkIfAllSelectedDepartment();
    this.checkIfAllSelectedIndustry();
    if (isChecked === true) {
      const obj = {};
      obj['name'] = name;
      this.arrayVal1.push(obj);
    } else {
      this.arrayVal1 = this.arrayVal1.filter(function (obj) {
        return obj['name'] !== name;
      });
    }
    this.stateString = this.arrayVal1.map(function (val) {
      return val.name;
    }).join(',');
    this.filterObject.stateFilter = this.stateString;
    // this.filterObject.countryFilter = this.selectedCountry;
    if (this.filterObject.stateFilter.length > 0) {
      this.setLevelToFilter_user();
      this.departmentFilter = [];
      this.industryFilter = [];
    } else {
      this.managementLevelFilter = [];
      this.departmentFilter = [];
      this.industryFilter = [];
    }
    this.filterObject.managementLevelFilter = '';
    this.arrayVal2 = [];
    this.filterObject.departmentFilter = '';
    this.arrayVal3 = [];
    this.filterObject.industryFilter = '';
    this.arrayVal4 = [];
    this.selectAllLevel = false;
    this.peopleList_user();
  }

  /************** LEVEL SELECTION *********************************************************/
  levelOptionsSelectAll() {
    for (let i = 0; i < this.managementLevelFilter.length; i++) {
      if (this.managementLevelFilter[i].management_level !== '') {
        const obj = {};
        this.managementLevelFilter[i].selected = this.selectAllLevel;
        if (this.managementLevelFilter[i].selected == true) {
          obj['name'] = this.managementLevelFilter[i].management_level;
          this.arrayVal2.push(obj);
        } else {
          const level = this.managementLevelFilter[i].management_level;
          this.arrayVal2 = this.arrayVal2.filter(function (obj) {
            return obj['name'] !== level;
          });
        }
      }
    }
    this.levelString = this.arrayVal2.map(function (val) {
      return val.name;
    }).join('|');
    this.filterObject.managementLevelFilter = this.levelString;
    // this.filterObject.countryFilter = this.selectedCountry;
    if (this.filterObject.managementLevelFilter.length > 0) {
      this.setDepartmentToFilter_user();
      this.industryFilter = [];
      this.filterObject.departmentFilter = '';
      this.arrayVal3 = [];
      this.filterObject.industryFilter = '';
      this.arrayVal4 = [];
    } else {
      this.departmentFilter = [];
      this.industryFilter = [];
    }
    this.selectAllDepartment = false;
    this.peopleList_user();
  }

  checkIfAllSelectedLevel() {
    this.selectAllLevel = this.managementLevelFilter.every(function (item: any) {
      return item.selected === true;
    });
  }

  levelOptions(name, isChecked) {
    this.checkIfAllSelectedDepartment();
    this.checkIfAllSelectedIndustry();
    if (isChecked === true) {
      const obj = {};
      obj['name'] = name;
      this.arrayVal2.push(obj);
    } else {
      this.arrayVal2 = this.arrayVal2.filter(function (obj) {
        return obj['name'] !== name;
      });
    }
    this.levelString = this.arrayVal2.map(function (val) {
      return val.name;
    }).join('|');
    this.filterObject.managementLevelFilter = this.levelString;
    // this.filterObject.countryFilter = this.selectedCountry;

    if (this.filterObject.managementLevelFilter.length > 0) {
      this.setDepartmentToFilter_user();
      this.industryFilter = [];
      this.filterObject.departmentFilter = '';
      this.arrayVal3 = [];
      this.filterObject.industryFilter = '';
      this.arrayVal4 = [];
    } else {
      this.departmentFilter = [];
      this.industryFilter = [];
    }
    this.selectAllDepartment = false;
    this.peopleList_user();
  }

  /************** DEPARTMENT SELECTION ****************************************************/
  departmentOptionsSelectAll() {
    for (let i = 0; i < this.departmentFilter.length; i++) {
      if (this.departmentFilter[i].department !== '') {
        const obj = {};
        this.departmentFilter[i].selected = this.selectAllDepartment;
        if (this.departmentFilter[i].selected === true) {
          obj['name'] = this.departmentFilter[i].department;
          this.arrayVal3.push(obj);
        } else {
          const department = this.departmentFilter[i].department;
          this.arrayVal3 = this.arrayVal3.filter(function (obj) {
            return obj['name'] !== department;
          });
        }
      }
    }
    this.departmentString = this.arrayVal3.map(function (val) {
      return val.name;
    }).join('|');
    this.filterObject.departmentFilter = this.departmentString;
    // this.filterObject.countryFilter = this.selectedCountry;

    if (this.filterObject.departmentFilter.length > 0) {
      this.setIndustryToFilter_user();
      this.filterObject.industryFilter = '';
      this.arrayVal4 = [];
    } else {
      this.industryFilter = [];
    }
    this.selectAllIndustry = false;
    this.peopleList_user();
  }

  checkIfAllSelectedDepartment() {
    this.selectAllDepartment = this.departmentFilter.every(function (item: any) {
      return item.selected === true;
    });
  }

  departmentOptions(name, isChecked) {
    if (isChecked === true) {
      const obj = {};
      obj['name'] = name;
      this.arrayVal3.push(obj);
    } else {
      this.arrayVal3 = this.arrayVal3.filter(function (obj) {
        return obj['name'] !== name;
      });
    }
    this.departmentString = this.arrayVal3.map(function (val) {
      return val.name;
    }).join('|');
    this.filterObject.departmentFilter = this.departmentString;
    // this.filterObject.countryFilter = this.selectedCountry;

    if (this.filterObject.departmentFilter.length > 0) {
      this.setIndustryToFilter_user();
      this.filterObject.industryFilter = '';
      this.arrayVal4 = [];
    } else {
      this.industryFilter = [];
    }
    this.selectAllIndustry = false;
    this.peopleList_user();
  }

  /************** INDUSTRY SELECTION *******************************************************/
  industryOptionsSelectAll() {
    for (let i = 0; i < this.industryFilter.length; i++) {
      if (this.industryFilter[i].industry !== '') {
        const obj = {};
        this.industryFilter[i].selected = this.selectAllIndustry;
        if (this.industryFilter[i].selected === true) {
          obj['name'] = this.industryFilter[i].industry;
          this.arrayVal4.push(obj);
        } else {
          const industry = this.industryFilter[i].industry;
          this.arrayVal4 = this.arrayVal4.filter(function (obj) {
            return obj['name'] !== industry;
          });
        }
      }
    }
    this.industryString = this.arrayVal4.map(function (val) {
      return val.name;
    }).join('|');
    this.filterObject.industryFilter = this.industryString;
    // this.filterObject.countryFilter = this.selectedCountry;
    this.peopleList_user();
  }

  checkIfAllSelectedIndustry() {
    this.selectAllIndustry = this.industryFilter.every(function (item: any) {
      return item.selected === true;
    });
  }

  industryOptions(name, isChecked) {
    if (isChecked === true) {
      const obj = {};
      obj['name'] = name;
      this.arrayVal4.push(obj);
    } else {
      this.arrayVal4 = this.arrayVal4.filter(function (obj) {
        return obj['name'] !== name;
      });
    }
    this.industryString = this.arrayVal4.map(function (val) {
      return val.name;
    }).join('|');
    this.filterObject.industryFilter = this.industryString;
    // this.filterObject.countryFilter = this.selectedCountry;
    this.peopleList_user();
  }

  /*****************************************************************************************/


  /************************ CLICK TO CONTACT PERSON ****************************************/
  peopleDataId: any;

  clickToContactPerson_user(people_data_id) {
    this.sessionService.addItem('peopleDataId', people_data_id);
    this.router.navigateByUrl('user/contact');
  }

  /**************************************************************************/
  resetSearch() {
    this.sessionService.addItem('inputValue', '');
    this.sessionService.addItem('searchObject', {count: '', name: '', type: ''});
    this.filterObject.countryFilter = '';
    this.model = '';
    this.arrayVal1 = [];
    this.arrayVal2 = [];
    this.arrayVal3 = [];
    this.arrayVal4 = [];

    this.stateFilter = [];
    this.managementLevelFilter = [];
    this.departmentFilter = [];
    this.industryFilter = [];

    this.filterObject.stateFilter = '';
    this.filterObject.managementLevelFilter = '';
    this.filterObject.departmentFilter = '';
    this.filterObject.industryFilter = '';
    this.filterObject.searchObject = {
      count: '',
      name: '',
      type: ''
    };
    this.peopleList_user();
    this.setCountryToFilter_user();
  }

  getContactObjInfo(data) {
    this.contactModel = data;
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

  checkDataId(person) {
    this.isContactPurchased_user(person.people_data_id);
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

  /************ GET CREDITS STATUS *******************************************/
  getCreditsStatus_user() {
    this.service.getCreditsStatus_user().subscribe(response => {
      this.creditsDetails = response.data[0].creditsDetails[0];
    });
  }

  checkAuth() {
    this.isAuthorized = this.authService.isAuthorised();
    if (this.isAuthorized === false) {
      this.router.navigateByUrl('user/login');
    }
  }

  /**************************************************************************/
  ngOnInit() {
    this.searchModel = new UserPeopleModel();
    UserPeopleSearchComponent.setAccordion();
    if (this.sessionService.getItem('searchObject') === null) {
      this.sessionService.addItem('searchObject', {name: '', count: '', type: ''});
    }
    this.filterObject.searchObject = this.sessionService.getItem('searchObject');
    this.model = this.filterObject.searchObject.name;
    this.peopleList_user();
    this.setCountryToFilter_user();
    this.creditsDetails = new CreditsDetailsModel();
    this.contactModel = new UserContactModel();
    this.companyModel = new CompanyInfoModel();
  }
}
