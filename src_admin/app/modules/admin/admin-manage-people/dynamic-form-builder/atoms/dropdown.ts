import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  template: `
    <div [formGroup]="form">
      <select class="form-control input-sm text-capitalize"
              [id]="field.name"
              [formControlName]="field.name"
              [required]="((field.name === 'domain') &&
              (field.name === 'industry') &&
              (field.name === 'department') &&
              (field.name === 'management_level') &&
              (field.name === 'country_name'))">
        <option value="" disabled selected hidden>Select {{field.label}}</option>
        <option *ngFor="let opt of field.options" [value]="opt.key">{{opt.label}}</option>
      </select>
    </div>
  `,
  styles: [`
    .input-sm {
      height: 22px;
      padding: 3px 10px;

    }`]
})
export class DropDownComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;

  constructor() {

  }
}
