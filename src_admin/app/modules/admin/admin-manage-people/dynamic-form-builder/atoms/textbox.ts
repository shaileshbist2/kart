import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TextBoxService} from './textbox.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-textbox',
  template: `
    <div [formGroup]="form">
      <input *ngIf="!field.multiline"
             [attr.type]="field.type"
             class="form-control input-sm"
             [id]="field.name"
             [name]="field.name"
             [formControlName]="field.name"
             (ngModelChange)="this.inputType.next($event)"
             [placeholder]="field.label"
             [required]="((field.name === 'email_id') &&
                           (field.name === 'contact_number'))"
             [maxlength]="field.name === 'state' ? '2' : ''"
             [pattern]="field.name === 'state' ? '^[A-Z]*$' : ''"
             [ngStyle]="{'border': '1px solid #ccc',
                         'border-color': ((field.name === 'email_id' && emailExistsResponse === 'true') ? 'red' : '#ccc')}"/>
      <!--<textarea *ngIf="field.multiline" [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name"-->
      <!--[id]="field.name"-->
      <!--rows="9" class="form-control" [placeholder]="field.placeholder"></textarea>-->
    </div>
  `,
  styles: [`
    .input-sm {
      height: 22px;
    }`]
})
export class TextBoxComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Input() emailExistOutput: any;
  inputType = new Subject<string>();
  emailExistsResponse: any;

  constructor(private service: TextBoxService) {
    this.inputType.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        if (this.field.name === 'email_id') {
          this.checkFieldData_a(this.field.name, value);
        }
      });
  }

  checkFieldData_a(field_name, value) {
    this.service.checkInputValue_a(field_name, value).subscribe(response => {
      this.emailExistsResponse = response.data[0].message;
      this.messageEvent.emit(response.data[0]);
    });
  }

  ngOnInit() {
  }

  onlyNumberAllowed(evt) {
    const e = evt || window.event;
    let key = e.keyCode || e.which;
    key = String.fromCharCode(key);
    const regex = /[A-Z]|\./;
    if (!regex.test(key)) {
      e.returnValue = false;
      if (e.preventDefault) {
        return e.preventDefault();
      }
    }
  }

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }

  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }
}
