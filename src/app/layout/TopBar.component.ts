import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {FormControl, Validators} from '@angular/forms';

import { ReviewService } from '../shared/Review.service';
import { UserService } from '../shared/User.service';
import { JWTHandlerService } from '../shared/JWTHandler.service';
import { AreaService } from '../shared/Area.service';
import { ParamsService } from '../shared/params.service';

@Component({
  selector: 'topBar',
  templateUrl: './topBar.template.html',
  styleUrls: ['../styles/topBar.styles.scss']
})


export class TopBarComponent {

  keyUp =  new Subject<string>();
  SEARCH_REGEX = /^[a-zA-Z ]*$/;
  searchFormContol = new FormControl();
  autocomplete: any =  [];
  params:any;
  searchSub:any;
  paramSub:any;

  constructor (private _Router: Router,
               private _ReviewService: ReviewService,
               private _UserService: UserService,
               private _JWTHandlerService: JWTHandlerService,
               private _AreaService: AreaService,
               private _ParamsService: ParamsService) {
                 this.searchSub = this.keyUp
                 .map(event => event['target'].value)
                 .debounceTime(250)
                 .distinctUntilChanged()
                 .flatMap(search => Observable.of(search).delay(250))
                 .subscribe(this.onKeyUp.bind(this));

                 this.paramSub = this._ParamsService.paramsObs.subscribe(params => {
                   if (!params) return;

                   this.params = params;
                   console.log(params);
                 });
               }

  navigateTo(url: string) {
    this._Router.navigateByUrl(url);
  }

  updateUser(): void {
    this._ReviewService.createReview({text: 'review text', rating: 4, id: '1', review_type: 'local' })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  logout(): void {
    this._JWTHandlerService.signOut()
      .then(() => this._Router.navigateByUrl('/'))
      .catch(error => console.error(error));
  }

  onKeyUp(input: string): void {
    if (!input) return;

    this._AreaService.searchAreas(input)
      .then(data => this.autocomplete = data)
      .catch(error => console.error(error));
  }

  optionSelected($event: any): void {
    //Dont judge me for I have cheesed
    let index = $event.option._id.split('-').pop();

  }

  ngOnDestroy() {
    if (this.searchSub)
      this.searchSub.unsubscribe();
  }
}
