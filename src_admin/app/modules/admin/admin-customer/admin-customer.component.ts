import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminCustomerService} from './admin-customer.service';
import {UserModel} from '../../../models/adminModel';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent implements OnInit, AfterViewInit {
  userModel: any;
  dtOptions: any = {};
  users: any;
  totalRec: any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  successMsg: any;
  errorMsg: any;
  createUpdateUserForm = false;
  updateBtn = false;
  saveBtn = true;

  constructor(private service: AdminCustomerService) {
  }

  userList_a() {
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
        this.service.userList_a(dataTablesParameters).subscribe(resp => {
          this.users = resp.data;
          this.totalRec = resp.recordsTotal;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
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

  closeFormBtn() {
    this.createUpdateUserForm = false;
    this.updateBtn = false;
    this.saveBtn = true;
  }

  addNewUserBtn() {
    this.userModel = {
      first_name: '',
      last_name: '',
      email_id: '',
      password: '',
      mobile_number: '',
      credits_left: 0,
      add_credits: 0
    };
    this.createUpdateUserForm = true;
    this.updateBtn = false;
    this.saveBtn = true;
    this.errorMsg = '';
    this.successMsg = '';
  }

  createUser_a() {
    this.service.createUser_a(this.userModel).subscribe(response => {
      if (response.data[0] === true) {
        this.errorMsg = '';
        this.successMsg = 'Successfully created';
        this.userList_a();
      }
    }, error => {
      if (error === 'email_exists') {
        this.successMsg = '';
        this.errorMsg = 'Email already exists';
      }
    });
  }

  updateUser_a() {
    this.service.updateUser_a(this.userModel).subscribe(response => {
      if (response.data[0] === true) {
        this.errorMsg = '';
        this.successMsg = 'Successfully updated';
        this.userList_a();
      }
    });
  }

  getUserDetail_a(user_id) {
    window.scroll(0, 0);
    this.createUpdateUserForm = true;
    this.updateBtn = true;
    this.saveBtn = false;
    this.service.getUserDetail_a(user_id).subscribe(response => {
      this.userModel = response.data[0];
    });
  }

  ngOnInit() {
    this.userList_a();
    this.userModel = new UserModel();
  }

  onlyNumberAllowed(evt) {
    const event = evt || window.event;
    return event.charCode >= 48 && event.charCode <= 57;
  }

}
