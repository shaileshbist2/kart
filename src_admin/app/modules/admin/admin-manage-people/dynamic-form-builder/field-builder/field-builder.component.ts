import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-field-builder',
  template: `
    <div class="form-group row" [formGroup]="form">
      <div class="col-md-12" [ngSwitch]="field.type">
        <label [attr.for]="field.label" class="text-capitalize">
          {{field.label}} {{field.label === 'state' ? '(OH/NY/CA)' : ''}}
          <strong class="text-danger" *ngIf="field.required">*</strong>
          <span *ngIf="!isValid && isDirty"
                style="font-size: 11px; color: red;">
                ({{field.label}} is required / invalid)
          </span>
          <span *ngIf="emailExistsResponse === 'true'" style="color: red;">(Exist)</span>
          <span *ngIf="emailExistsResponse === 'false'" style="color: green;">(Record not found)</span>
        </label>
        <div class="input-group">
          <div class="input-group-addon">
            <i class="fa fa-{{field.name === 'email_id' ? 'envelope' : ''}}"></i>
            <i class="fa fa-{{field.name === 'country' ? 'flag' : ''}}"></i>
            <i class="fa fa-{{field.name === 'company_website' ? 'globe' : ''}}"></i>
            <i class="fa fa-{{field.name === 'contact_number' ? 'mobile' : ''}}"></i>
            <i class="fa fa-{{field.name === 'linkedin' ? 'linkedin' : ''}}"></i>
            <i class="fa fa-{{field.name === 'address_1' ? 'address-card' : ''}}"></i>
            <i class="fa fa-{{field.name === 'address_2' ? 'address-card' : ''}}"></i>
          </div>
          <app-textbox *ngSwitchCase="'text'"
                       [field]="field"
                       [form]="form"
                       (messageEvent)="receiveMessage($event)">
          </app-textbox>
          <app-dropdown *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></app-dropdown>
        </div>
      </div>
    </div>`,
  styles: [`
    .input-group-addon {
      padding: 2px 9px;
    }

    label {
      font-size: 12px;
    }
  `]
})
export class FieldBuilderComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @Input() field: any;
  @Input() form: any;
  receiveMsg: any;
  emailExistsResponse: any;

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }

  constructor() {
  }

  receiveMessage($event) {
    this.emailExistsResponse = $event.message;
    this.receiveMsg = $event;
    this.messageEvent.emit(this.receiveMsg);
  }

  ngOnInit() {
  }
}
