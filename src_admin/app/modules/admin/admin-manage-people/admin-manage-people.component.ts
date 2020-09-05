import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AdminManagePeopleService} from './admin-manage-people.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-admin-manage-people',
  templateUrl: './admin-manage-people.component.html',
  styleUrls: ['./admin-manage-people.component.css']
})
export class AdminManagePeopleComponent implements OnInit, AfterViewInit {
  loader = false;
  inputType2 = new Subject<string>();
  objectKeys = Object.keys;
  searchInput = '';
  searchInput1 = '';
  msg: any;
  resultView = false;
  receiveMsg: any;
  peopleFormView = true;
  domain: any;
  industry: any;
  department: any;
  public form: FormGroup;
  unsubcribe: any;
  isFormReady = false;
  dtOptions: any = {};
  people: any;
  totalRec: any;
  dtTrigger: Subject<any> = new Subject();
  public fields: any[] = [];
  createBtn = true;
  updateBtn = false;
  peopleDataId: any;
  peopleListView = false;
  contactInfoObj: any;
  showContactInfo = false;
  resultViewClass = 'col-md-4 col-sm-4';
  formViewClass = 'col-md-8 col-sm-8';
  validEmail = 1;
  inValidEmail = 0;
  emailOptionObj = {
    is_valid_email_checked: false,
    is_invalid_email_checked: false
  };

  totalPeopleData = 0;
  totalCompanyData = 0;
  totalValidEmail = 0;
  totalInvalidEmail = 0;
  faClass = 'fa fa-refresh pull-right';

  allPeople = false;

  constructor(private service: AdminManagePeopleService) {
    this.inputType2.pipe(
      debounceTime(2000),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchInput = value;
        this.peopleList_a();
      });
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  isOptionChecked(option, isChecked) {
    if (option === 'validEmail' && isChecked === true) {
      this.emailOptionObj['is_valid_email_checked'] = true;
    } else if (option === 'validEmail' && isChecked === false) {
      this.emailOptionObj['is_valid_email_checked'] = false;
    }
    if (option === 'inValidEmail' && isChecked === true) {
      this.emailOptionObj['is_invalid_email_checked'] = true;
    } else if (option === 'inValidEmail' && isChecked === false) {
      this.emailOptionObj['is_invalid_email_checked'] = false;
    }
    this.peopleList_a();
  }


  getDetails_a(people_data_id) {
    window.scroll(0, 0);
    this.resultView = false;
    if (people_data_id) {
      this.createBtn = false;
      this.updateBtn = true;
      this.peopleFormView = false;
      this.isFormReady = false;
      this.service.getDetails_a(people_data_id).subscribe(response => {
        this.fields = response.data[0].result;
        this.peopleDataId = people_data_id;
        this.isFormReady = true;
        this.checkResultView();
      });
    }
    this.isFormReady = false;
    this.service.getDetails_a(people_data_id).subscribe(response => {
      this.fields = response.data[0].result;
      this.isFormReady = true;
      this.checkResultView();
    });
  }

  resetForm() {
    this.isFormReady = false;
    this.getDetails_a('');
    this.createBtn = true;
    this.updateBtn = false;
    this.peopleFormView = true;
  }

  receiveMessage($event) {
    this.receiveMsg = $event;
    if (this.receiveMsg.column_value === '') {
      this.receiveMsg = false;
    } else {
      if (this.receiveMsg.message === 'true') {
        this.resultView = true;
        this.checkResultView();
      } else {
        this.resultView = false;
        this.formViewClass = 'col-md-12 col-sm-12';
      }
    }
  }

  showPeopleList() {
    this.resetForm();
    this.peopleFormView = true;
    this.peopleListView = false;
  }

  addNewPeople() {
    this.resetForm();
    this.peopleFormView = false;
    this.peopleListView = true;
  }

  cancelBtnRes() {
    this.resetForm();
    this.peopleFormView = true;
    this.peopleListView = false;
  }

  createUpdateMsg($event) {
    $event = JSON.parse($event);
    if ($event.msg === true && $event.action === 'create') {
      this.addNewPeople();
      this.peopleList_a();
    } else {
      this.peopleList_a();
    }
  }

  showContactDetails_a(people_data_id) {
    this.service.showContactDetails_a(people_data_id).subscribe(response => {
      if (response.data[0] !== false) {
        this.showContactInfo = true;
        this.contactInfoObj = response.data[0];
      } else {
        this.showContactInfo = false;
      }
    });
  }

  onUpload(e) {
    console.log(e);
  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }

  peopleList_a() {
    this.searchInput1 = this.searchInput;
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      serverSide: true,
      deferRender: true,
      destroy: true,
      searching: false,
      lengthChange: true,
      // pageLength: 10,
      lengthMenu: [[10, 25, 50, 100, 150, 200, 500, 1000, 1500, 2000], [10, 25, 50, 100, 150, 200, 500, 1000, 1500, 2000]],
      dom: `<'top'<'actions'>lfpi<'clear'>><'clear'>rt<'bottom'>
            <'top'li><'bottom'><'clear'>
            <'row'<'col-sm-12'p>>`,
      language: {
        // search: 'Filter records:',
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
        this.service.peopleList_a(dataTablesParameters, this.searchInput1, this.emailOptionObj).subscribe(resp => {
          this.people = resp.data;
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

  checkResultView() {
    if (this.resultView === true) {
      this.resultViewClass = 'col-md-4 col-sm-4';
      this.formViewClass = 'col-md-8 col-sm-8';
    } else {
      this.formViewClass = 'col-md-12 col-sm-12';
    }
  }

  strReplaceUnderscoreToSpace(text) {
    return text.replace(/_/g, ' ');
  }

  getDashboardDetails_a() {
    this.faClass = 'fa fa-refresh pull-right fa-spin';
    this.service.getDashboardDetails_a().subscribe(response => {
      this.totalPeopleData = response.data[0].total_people;
      this.totalCompanyData = response.data[0].total_companies;
      this.totalValidEmail = response.data[0].valid_email;
      this.totalInvalidEmail = response.data[0].invalid_email;
      this.faClass = 'fa fa-refresh pull-right';
    });
  }

  envelopSvg = false;
  envelopFa = true;

  /********************** Checkbox Selection on DataTable *****************************/
  checkAllSelectCheckbox(isChecked) {
    const data_set = this.people.filter(function (data) {
      return data.selected === true;
    });
  }

  toggleSelect = function (event) {
    this.allPeople = event.target.checked;
    this.people.forEach(function (item) {
      item.selected = event.target.checked;
    });
  };

  /***********************************************************************************/
  scanEmails_a(isValid: boolean) {
    const data_set = this.people.filter(function (data) {
      return data.selected === true;
    });
    if (!isValid) {
      return;
    }
    if (data_set.length > 0) {
      const selected_emails = data_set.map((itm => itm.email_id));
      this.envelopSvg = true;
      this.envelopFa = false;
      this.service.validateSelectedEmails_a(selected_emails).subscribe(response => {
        this.envelopSvg = false;
        this.envelopFa = true;
        this.getDashboardDetails_a();
        this.peopleList_a();
      });
    }
  }

  ngOnInit() {
    this.getDashboardDetails_a();
    this.peopleList_a();
    this.checkResultView();
  }
}
