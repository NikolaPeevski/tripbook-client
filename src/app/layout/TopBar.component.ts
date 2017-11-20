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
import { SearchService } from '../shared/Search.service';

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
  params: any;
  user: any;

  searchSub: any;
  paramSub: any;
  userSub: any;

  selectedTab: any = 0;

  constructor (private _Router: Router,
               private _ReviewService: ReviewService,
               private _UserService: UserService,
               private _JWTHandlerService: JWTHandlerService,
               private _AreaService: AreaService,
               private _ParamsService: ParamsService,
               private _SearchService: SearchService ) {
                 this.searchSub = this.keyUp
                 .map(event => event['target'].value)
                 .debounceTime(250)
                 .distinctUntilChanged()
                 .flatMap(search => Observable.of(search).delay(250))
                 .subscribe(this.onKeyUp.bind(this));

                 this.paramSub = this._ParamsService.paramsObs.subscribe(params => {
                   if (!params) return;

                   this.params = params;

                   if (this.params.currentModule === 'search')
                    if (this.params.path.indexOf('cities') === -1) {
                      let currentTab = decodeURIComponent((this.params.path.split('tab=')).pop());

                      switch(currentTab) {
                        case 'locals':
                          this.selectedTab = 0;
                          break;
                        case 'reviews':
                          this.selectedTab = 1;
                          break;
                        case 'trips':
                          this.selectedTab = 2;
                          break;
                        case 'requested trips':
                          this.selectedTab = 3;
                          break;
                        default:
                        this.selectedTab = 0;
                        break;
                      }
                    }

                 });
                 this.userSub = this._UserService.currentUser.subscribe(user => {
                   if (!user || !user.email || !user.email.length) {
                     if (this.user)
                        this.user = undefined;
                     return
                   };
                   this.user = user;
                   console.log(this.user);
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
    console.log(this.autocomplete);
    let iterator = this.autocomplete.length;
    let index = -1;

    while(iterator --)
      if (this.autocomplete[iterator].name === $event.option.value)
        index = iterator;

    this._SearchService.searchFor($event.option.value, this.autocomplete[index].type);

  }

  ngOnDestroy() {
    if (this.searchSub)
      this.searchSub.unsubscribe();
    if (this.paramSub)
      this.paramSub.unsubscribe();
    if (this.userSub)
      this.userSub.unsubscribe();
  }

  navigateSearchTab(tab: any): void {
    let searchParams = (this.params.path.split('/').pop()).split('?tab=');

    this._SearchService.searchFor(searchParams[0], '', encodeURIComponent(tab.tab.textLabel.toLowerCase()));
  }

  goToProfilePage(): void {
    this._Router.navigateByUrl(`user/${this.user.id}`);
  }
}
