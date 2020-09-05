import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserStoreService} from './user-store.service';
import {AuthService} from '../../shared/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {UserStoreModel} from '../../models/user/userStoreModel';
import {SessionService} from '../../shared/session.service';
import {HelperService} from '../../shared/helper.service';
import {HttpClient} from '@angular/common/http';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs/Rx';

declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user-store',
  styleUrls: ['./user-store.component.css'],
  templateUrl: './user-store.component.html'
})
export class UserStoreComponent implements OnInit, AfterViewInit {
  storeModel: any;
  public loading = false;
  public searchLoader = false;
  dataSet: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  results: Object;
  searchTerm$ = new Subject<string>();
  departmentRoute: any;
  domainRoute: any;
  countryString: any;
  departmentString: any;
  domainString: any;
  urlObject: any = {
    countryFilter: '',
    departmentFilter: '',
    domainFilter: ''
  };

  constructor(private service: UserStoreService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private sessionService: SessionService,
              private helperService: HelperService,
              private http: HttpClient) {
    // window.scroll(0, 0);
    this.getUrlObject(this.activatedRoute.snapshot.paramMap.get('country'),
      this.activatedRoute.snapshot.paramMap.get('department'),
      this.activatedRoute.snapshot.paramMap.get('domain'));
  }


  checkedCountryArray: any;
  checkedDepartmentArray: any;
  checkedDomainArray: any;

  getUrlObject(country, department, domain) {
    this.urlObject.countryFilter = country == null ? '' : country.split('-').join(',').toUpperCase();
    this.urlObject.departmentFilter = department == null ? '' : department.split('-').join(',');
    this.urlObject.domainFilter = domain == null ? '' : domain.split('-').join(',');
    this.checkedCountryArray = this.urlObject.countryFilter.split(',');
    this.checkedDepartmentArray = this.urlObject.departmentFilter.split(',');
    this.checkedDomainArray = this.urlObject.domainFilter.split(',');
    for (const data of this.checkedCountryArray) {
      if (data !== '') {
        const obj = {};
        obj['name'] = data;
        this.arrayVal.push(obj);
      }
    }
    for (const data of this.checkedDepartmentArray) {
      if (data !== '') {
        const obj = {};
        obj['name'] = data;
        this.arrayVal2.push(obj);
      }
    }
    for (const data of this.checkedDomainArray) {
      if (data !== '') {
        const obj = {};
        obj['name'] = data;
        this.arrayVal3.push(obj);
      }
    }
  }


  /************* search according checkbox on select *******************************************/
  accordionVisibility() {
    if (this.domainData.length > 0) {
      $('.domainVisibility').show();
    } else {
      $('.domainVisibility').hide();
    }
    if (this.departmentData.length > 0) {
      $('.departmentVisibility').show();
    } else {
      $('.departmentVisibility').hide();
    }
  }

  arrayVal = [];
  arrayVal2 = [];
  arrayVal3 = [];
  result: any;
  finalString: any;
  searchObject = {filterString: null};
  countryArray = [];

  /************ PEOPLE LIST DATA-TABLE **********************************************************/
  totalRec: any;
  dtOptions: any = {};

  storeList_user() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      serverSide: true,
      deferRender: true,
      destroy: true,
      searching: true,
      lengthChange: true,
      pageLength: 10,
      dom: `<'top'<'actions'>lfpi<'clear'>><'clear'>rt<'bottom'>
            <'top'li><'bottom'><'clear'>
            <'row'<'col-sm-6'p>>`,
      language: {
        search: '',
        zeroRecords: '',
        processing: ''
      },
      ordering: false,
      ajax: (dataTablesParameters: any, callback) => {
        // this.loading = true;
        this.service.storeList_user(dataTablesParameters, this.urlObject).subscribe(resp => {
          this.dataSet = resp.data;
          this.totalRec = resp.recordsTotal;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
          // this.loading = false;
        });
      },
      // columns: [{title: 'LIST'}],
      responsive: true,
      // scrollY: 420,
      // scrollX: 450
    };
    this.dtTrigger.next();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


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

  clickCountry(name, isChecked) {
    if (isChecked === true) {
      const obj = {};
      obj['name'] = name;
      this.arrayVal.push(obj);
    } else {
      this.arrayVal = this.arrayVal.filter(function (obj) {
        return obj['name'] !== name;
      });
    }
    this.countryString = this.arrayVal.map(function (val) {
      return val.name;
    }).join(',');
    this.urlObject.countryFilter = this.countryString;
    if (this.urlObject.countryFilter !== '') {
      this.router.navigateByUrl('/user/store/' + this.urlObject.countryFilter.toString().split(',').join('-'));
      this.departmentFilterStore_user();
    } else {
      this.router.navigateByUrl('/user/store');
      this.departmentData = [];
    }
  }

  clickDepartment(name, isChecked) {
    if (isChecked === true) {
      const obj = {};
      obj['name'] = name;
      this.arrayVal2.push(obj);
    } else {
      this.arrayVal2 = this.arrayVal2.filter(function (obj) {
        return obj['name'] !== name;
      });
    }
    this.departmentString = this.arrayVal2.map(function (val) {
      return val.name;
    }).join(',');
    this.urlObject.departmentFilter = this.departmentString;
    if (this.urlObject.departmentFilter !== '') {
      this.router.navigateByUrl('/user/store/' +
        this.urlObject.countryFilter.toString().split(',').join('-') + '/' +
        this.urlObject.departmentFilter.toString().split(',').join('-'));
      this.domainFilterStore_user();
    } else {
      this.router.navigateByUrl('/user/store/' + this.urlObject.countryFilter.toString().split(',').join('-'));
      this.domainData = [];
    }
  }

  clickDomain(name, isChecked) {
    if (isChecked === true) {
      const obj = {};
      obj['name'] = name;
      this.arrayVal3.push(obj);
    } else {
      this.arrayVal3 = this.arrayVal3.filter(function (obj) {
        return obj['name'] !== name;
      });
    }
    this.domainString = this.arrayVal3.map(function (val) {
      return val.name;
    }).join(',');
    this.urlObject.domainFilter = this.domainString;
    if (this.urlObject.departmentFilter !== '' && this.urlObject.domainFilter !== '') {
      this.router.navigateByUrl('/user/store/' +
        this.urlObject.countryFilter.toString().split(',').join('-') + '/' +
        this.urlObject.departmentFilter.toString().split(',').join('-') + '/' +
        this.urlObject.domainFilter.toString().split(',').join('-'));
      this.storeList_user();
    } else {
      this.router.navigateByUrl('/user/store/' +
        this.urlObject.countryFilter.toString().split(',').join('-') + '/' +
        this.urlObject.departmentFilter.toString().split(',').join('-'));
      this.domainData = [];
    }
  }


  domainData: any = [];
  industryData: any = [];
  countryData: any = [];
  departmentData: any = [];


  countryFilterStore_user() {
    this.service.countryFilterStore_user(this.urlObject).subscribe(response => {
      this.countryData = response.data[0].countryData;
      for (let data1 of this.urlObject.countryFilter.split(',')) {
        for (let data2 in this.countryData) {
          if (this.countryData[data2].country === data1) {
            this.countryData[data2].is_checked = true;
          }
        }
      }
      this.departmentFilterStore_user();
      this.storeList_user();
    });
  }

  departmentFilterStore_user() {
    this.service.departmentFilterStore_user(this.urlObject).subscribe(response => {
      if (this.urlObject.countryFilter !== '') {
        this.departmentData = response.data[0].departmentData;
        for (let data1 of this.urlObject.departmentFilter.split(',')) {
          for (let data2 in this.departmentData) {
            if (this.departmentData[data2].department === data1) {
              this.departmentData[data2].is_checked = true;
            }
          }
        }
        this.domainFilterStore_user();
        this.storeList_user();
        this.accordionVisibility();
      } else {
        this.departmentData = [];
      }
    });
  }

  domainFilterStore_user() {
    this.service.domainFilterStore_user(this.urlObject).subscribe(response => {
      if (this.urlObject.countryFilter !== '' && this.urlObject.departmentFilter !== '') {
        this.domainData = response.data[0].domainData;
        for (let data1 of this.urlObject.domainFilter.split(',')) {
          for (let data2 in this.domainData) {
            if (this.domainData[data2].domain === data1) {
              this.domainData[data2].is_checked = true;
            }
          }
        }
        this.storeList_user();
        this.accordionVisibility();
      } else {
        this.domainData = [];
      }
    });
  }

  ngOnInit() {
    this.storeModel = new UserStoreModel();
    UserStoreComponent.setAccordion();
    this.countryFilterStore_user();
    this.storeList_user();
  }
}
