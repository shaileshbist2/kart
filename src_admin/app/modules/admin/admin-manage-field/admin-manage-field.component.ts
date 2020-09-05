import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdminManageFieldService} from './admin-manage-field.service';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-manage-field',
  templateUrl: './admin-manage-field.component.html',
  styleUrls: ['./admin-manage-field.component.css']
})
export class AdminManageFieldComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private service: AdminManageFieldService) {
  }

  spinner = false;
  successView = false;
  errorView = false;
  error: any;
  successMsg: any;
  columnListData: any;
  submitted = false;
  peopleForm: FormGroup;

  getAllColumns_a() {
    this.service.getAllColumns_a().subscribe(response => {
      this.columnListData = response.data[0];
    });
  }

  addNewField_a() {
    this.successView = false;
    this.errorView = false;
    this.submitted = true;
    if (this.peopleForm.invalid) {
      return;
    }
    if (this.peopleForm.value.form_fields.length !== 0) {
      this.spinner = true;
      this.service.addNewField_a(this.peopleForm.value).subscribe(response => {
        if (response.data[0] === true) {
          this.errorView = false;
          this.successView = true;
          this.successMsg = 'Successfully added';
          this.getAllColumns_a();
        }
        this.spinner = false;
      }, error => {
        this.successView = false;
        this.errorView = true;
        this.error = error;
        this.spinner = false;
      });
    }
  }

  ngOnInit() {
    this.getAllColumns_a();
    this.peopleForm = this.fb.group({
      form_fields: this.fb.array([this.fb.group({
        column_name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z_]+$'),
          Validators.maxLength(55),
          Validators.minLength(2)
        ]))
      })])
    });
  }

  get formFields() {
    return this.peopleForm.get('form_fields') as FormArray;
  }

  addNewField() {
    this.formFields.push(this.fb.group({
      column_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z_]+$'),
        Validators.maxLength(55),
        Validators.minLength(2)
      ]))
    }));
  }

  deleteField(index) {
    this.formFields.removeAt(index);
  }

}
