import {Component, OnInit} from '@angular/core';
import {SearchPeopleService} from './search-people.service';
import {Router} from '@angular/router';
import {SearchPeopleModel} from '../../models/search/searchPeopleModel';
import {AppConstants} from '../../shared/app.constants';
import {SessionService} from '../../shared/session.service';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.css']
})
export class SearchPeopleComponent implements OnInit {
  searchModel: any;
  errorMsg: any;

  constructor(private service: SearchPeopleService,
              private router: Router,
              private sessionService: SessionService) {
  }

  ngOnInit() {

  }

}
