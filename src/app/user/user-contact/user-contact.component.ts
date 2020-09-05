import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserContactService} from './user-contact.service';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {UserContactModel, CreditsDetailsModel} from '../../models/user/userContactModel';
import {SessionService} from '../../shared/session.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

declare var $: any;

@Component({
  selector: 'app-user-contact',
  templateUrl: './user-contact.component.html',
  styleUrls: ['./user-contact.component.css']
})
export class UserContactComponent implements OnInit {
  contactModel: any;
  public loading = false;

  constructor(private service: UserContactService,
              private router: Router,
              private authService: AuthService,
              private sessionService: SessionService,
              private modalService: BsModalService) {

  }

  peopleDataId: any;

  checkDataId() {
    /******* GET PEOPLE DATA ID FROM SESSION ********************/
    this.peopleDataId = this.sessionService.getItem('peopleDataId');
    if (this.peopleDataId == null) {
      this.router.navigateByUrl('user/people-search');
    } else {
      this.isContactPurchased_user(this.peopleDataId);
    }
  }

  /********** CHECK CONTACT PURCHASED OR NOT *******************/
  isContactPurchased_user(peopleDataId) {
    this.loading = true;
    this.service.isContactPurchased_user(peopleDataId).subscribe(response => {
      this.contactModel = response.data[0].personDetail[0];
      this.loading = false;
    });
  }


  /******* MODAL *********************************************/
  @ViewChild('smModal')
  smModal: any;
  modalRef: BsModalRef;
  // closeModal(): void {
  //   this.modalService.hide(1);
  // }
  //
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }

  /***********************************************************/

  /********** PURCHASE NOW **************************************/
  purchaseContactNow_user(people_data_id) {
    this.service.purchaseContactNow_user(people_data_id).subscribe(response => {
      this.isContactPurchased_user(people_data_id);
      this.getCreditsStatus_user();
    }, error => {
      if (error === 'zero_credit_found') {
        this.smModal.show();
      }
    });
  }

  /**************************************************************/


  /************ GET CREDITS STATUS *******************************************/
  creditsDetails: any;

  getCreditsStatus_user() {
    this.service.getCreditsStatus_user().subscribe(response => {
      this.creditsDetails = response.data[0].creditsDetails[0];
    });
  }

  /**************************************************************************/

  ngOnInit() {
    if (!this.authService.isAuthorised()) {
      this.router.navigateByUrl('user/login');
    } else if (!this.authService.isEmailVerified()) {
      this.router.navigateByUrl('user/setting');
    }
    this.contactModel = new UserContactModel();
    this.checkDataId();

    this.creditsDetails = new CreditsDetailsModel();
    this.getCreditsStatus_user();
  }

}
