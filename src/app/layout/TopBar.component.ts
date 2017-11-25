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
import { LocalsService } from '../shared/Locals.service';

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
  isOwnCity: any;

  selectedTab: any = 0;

  constructor (private _Router: Router,
               private _ReviewService: ReviewService,
               private _UserService: UserService,
               private _JWTHandlerService: JWTHandlerService,
               private _AreaService: AreaService,
               private _ParamsService: ParamsService,
               private _SearchService: SearchService,
               private _LocalsService: LocalsService) {
                 this.searchSub = this.keyUp
                 .map(event => event['target'].value)
                 .debounceTime(250)
                 .distinctUntilChanged()
                 .flatMap(search => Observable.of(search).delay(250))
                 .subscribe(this.onKeyUp.bind(this));

                 this.paramSub = this._ParamsService.paramsObs.subscribe(params => {
                   if (!params) return;

                   this.params = params;

                   if (this.params.currentModule === 'search') {


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
                      this.checkForOwnCity();
                    }
                 });
                 this.userSub = this._UserService.currentUser.subscribe(user => {
                   if (!user || !user.email || !user.email.length) {
                     if (this.user)
                        this.user = undefined;
                     return
                   };
                   this.user = user;
                   setTimeout(() => {

                   this.checkForOwnCity();
                  },50);

                 });
               }

  navigateTo(url: string) {
    this._Router.navigateByUrl(url);
  }

  logout(): void {
    this._JWTHandlerService.signOut()
      .then(() => this._Router.navigateByUrl('/'))
      .catch(error => console.error(error));
  }

  checkForOwnCity(): void {
    if (this.params && this.params.currentModule === 'search' && this.user && this.user.has_local) {

      let search = (this.params.path.split('/').pop()).split('?tab=')
      this._LocalsService.getLocalById(this.user.local_id)
        .then(local => {
          setTimeout(() => {
            this._AreaService.searchAreas(search[0], true)
              .then(city => {
                this.isOwnCity = (city[0] && local.city_id === city[0].id)
              });
        }, 50);

      })
      .catch(error => console.error(error));
    }
  }

  onKeyUp(input: string): void {
    if (!input) return;

    this._AreaService.searchAreas(input)
      .then(data => this.autocomplete = data)
      .catch(error => console.error(error));
  }

  optionSelected($event: any): void {
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
