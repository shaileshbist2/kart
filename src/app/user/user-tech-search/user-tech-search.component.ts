import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {UserTechSearchService} from './user-tech-search.service';
import {Router} from '@angular/router';
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
  selector: 'app-user-tech-search',
  templateUrl: './user-tech-search.component.html',
  styleUrls: ['./user-tech-search.component.css']
})
export class UserTechSearchComponent implements OnInit, AfterViewInit {
  inputType3 = new Subject<string>();
  searchInput = '';
  dtOptions: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  input_value: any;
  loading = false;
  totalRec: any;
  company: any;

  constructor(private service: UserTechSearchService,
              private router: Router,
              private authService: AuthService,
              private http: HttpClient,
              private sessionService: SessionService) {
    this.inputType3.pipe(
      debounceTime(700),
      distinctUntilChanged())
      .subscribe(value => {
        this.dataTableListCompany_user(value);
      });
  }

  dataTableListCompany_user(input_value) {
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
        this.service.dataTableListCompany_user(dataTablesParameters, this.input_value).subscribe(resp => {
          this.company = resp.data;
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
  // compTechnologyUsed: any;
  goToDetails(comp_name) {
    this.sessionService.addItem('comp_name', comp_name);
    this.router.navigateByUrl('user/lead-search');
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  ngOnInit() {
    this.dataTableListCompany_user('');
  }
}
