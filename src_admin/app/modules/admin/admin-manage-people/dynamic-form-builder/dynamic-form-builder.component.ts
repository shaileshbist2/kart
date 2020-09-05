import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AdminManagePeopleService} from '../admin-manage-people.service';

@Component({
  selector: 'app-dynamic-form-builder',
  template: `
    <form [formGroup]="form" class="form-horizontal">
      <div *ngFor="let field of fields">
        <div class="col-md-4 col-sm-4">
          <app-field-builder [field]="field"
                             [form]="form"
                             (messageEvent)="receiveMessage($event)">
          </app-field-builder>
        </div>
      </div>
      <div class="col-md-12 col-sm-12 text-right">
        <div class="col-md-9 col-sm-9">
          <label
            [ngStyle]="{color: errorMsg === 'true' ? 'green' : ''}">{{errorMsg === 'true' ? 'Successfully done' : ''}}</label>
          <label
            [ngStyle]="{color: errorMsg === 'email_exist' ? 'red' : ''}">{{errorMsg === 'email_exist' ? 'Email already exist' : ''}}</label>
        </div>
        <div class="col-md-3 col-sm-3">
          <button type="button" class="btn btn-danger btn-sm" (click)="cancelUpdateBtn()">Cancel
          </button>
          &nbsp;&nbsp;
          <button type="submit"
                  *ngIf="createBtn"
                  [disabled]="!form.valid"
                  class="btn btn-primary btn-sm"
                  (click)="onSubmit(this.form.value, 'create')">
            Save <i class="fa fa-spinner fa-spin" *ngIf="spinner"></i>
          </button>
          <button type="submit"
                  *ngIf="updateBtn"
                  [disabled]="!form.valid"
                  class="btn btn-primary btn-sm"
                  (click)="onSubmit(this.form.value, 'update')">
            Update <i class="fa fa-spinner fa-spin" *ngIf="spinner"></i>
          </button>
        </div>
      </div>
    </form>`,
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @Output() createUpdateMsg = new EventEmitter<string>();
  receiveMsg: any;
  @Input() fields: any[] = [];
  form: FormGroup;
  @Input() createBtn: any;
  @Input() updateBtn: any;
  @Output() cancelBtn = new EventEmitter();
  @Input() peopleDataId: any;
  errorMsg = '';
  spinner = false;

  constructor(private service: AdminManagePeopleService) {
  }

  cancelUpdateBtn() {
    window.scroll(0, 0);
    this.updateBtn = false;
    this.createBtn = true;
    this.cancelBtn.emit();
  }

  receiveMessage($event) {
    this.receiveMsg = $event;
    this.messageEvent.emit(this.receiveMsg);
  }

  onSubmit(value, action) {
    this.spinner = true;
    this.service.createUpdatePeopleData_a(
      value, action, (action === 'create' ? (this.peopleDataId = '') : this.peopleDataId))
      .subscribe(response => {
        const data = {
          msg: response.data[0],
          action: action
        };
        this.createUpdateMsg.emit(JSON.stringify(data));
        if (response.data[0] === true) {
          this.errorMsg = 'true';
        } else {
          this.errorMsg = '';
        }
        this.spinner = false;
      }, error => {
        if (error === 'email_exist') {
          this.errorMsg = 'email_exist';
        } else {
          this.errorMsg = '';
        }
        this.spinner = false;
      });
  }

  ngOnInit() {
    const fieldsCtrls = {};
    for (const f of this.fields) {
      if (f.type !== 'checkbox') {
        if (f.type === 'text' && f.name === 'contact_number') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        } else if (f.type === 'text' && f.name === 'contact_number') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.minLength(10));
        } else if (f.type === 'text' && f.name === 'email_id') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        } else if (f.type === 'text' && f.name === 'email_id') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.email);
        } else if (f.type === 'dropdown' && f.name === 'country_name') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        } else if (f.type === 'dropdown' && f.name === 'domain') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        } else if (f.type === 'dropdown' && f.name === 'department') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        } else if (f.type === 'dropdown' && f.name === 'industry') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        } else if (f.type === 'dropdown' && f.name === 'management_level') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        } else {
          fieldsCtrls[f.name] = new FormControl(f.value || '');
        }
      } else {
        const opts = {};
        for (const opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }
}
