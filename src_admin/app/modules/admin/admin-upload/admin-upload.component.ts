import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {AdminUploadService} from './admin-upload.service';
import {AppConstants} from '../../../shared/app.constants';
import {SessionService} from '../../../shared/session.service';

declare const $: any;
const URL = AppConstants.apiBaseUrl + 'upload_file';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.css']
})
export class AdminUploadComponent implements OnInit {
  @ViewChild('activeFrameInputFile') InputFrameVariable: ElementRef;
  loader = false;
  dropDown = [
    {id: 1, value: 'people_data_upload'},
    {id: 2, value: 'company_data_upload'}
  ];
  assetsPath: any;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'excel'});
  serverError = '';
  errorMsg = '';
  alertClass = '';
  excel_file_type: any;
  excelUploadView = false;

  totalPeopleData = 0;
  totalCompanyData = 0;
  faClass = 'fa fa-refresh pull-right';

  constructor(private service: AdminUploadService, private session: SessionService) {
  }

  getDashboardDetails_a() {
    this.faClass = 'fa fa-refresh pull-right fa-spin';
    this.service.getDashboardDetails_a().subscribe(response => {
      this.totalPeopleData = response.data[0].total_people;
      this.totalCompanyData = response.data[0].total_companies;
      this.faClass = 'fa fa-refresh pull-right';
    });
  }

  refreshInfo() {
    this.getDashboardDetails_a();
  }

  excelUploadViewFunc() {
    this.excelUploadView = !this.excelUploadView;
  }

  ngOnInit() {
    this.getDashboardDetails_a();
    /****************** UPLOAD EXCEL ***************************************/
    this.assetsPath = AppConstants.assetsPath;
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('excel_file_type', this.excel_file_type);
      form.append('key', this.session.getItem('adminClaim').token);
    };
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.errorMsg = '';
      this.alertClass = '';
      this.serverError = '';
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.InputFrameVariable.nativeElement.value = '';
      // console.log('ImageUpload:uploaded:', item, status, response);
      this.loader = false;
      response = JSON.parse(response);
      if (response.msg === 'failed') {
        this.alertClass = 'alert alert-danger';
        this.errorMsg = 'There is something gone wrong, Please contact to Administrator';
        this.serverError = response.err;
      } else if (response.msg === 'invalid_file') {
        this.alertClass = 'alert alert-danger';
        this.errorMsg = 'Invalid File';
        this.serverError = '';
      } else if (response.msg === 'select_type') {
        this.alertClass = 'alert alert-warning';
        this.errorMsg = 'Please select the excel type';
        this.serverError = '';
      } else {
        this.alertClass = 'alert alert-success';
        this.errorMsg = 'Uploaded successfully. Please wait for the email response!';
        this.serverError = '';
        this.getDashboardDetails_a();
      }
    };

  }
}
