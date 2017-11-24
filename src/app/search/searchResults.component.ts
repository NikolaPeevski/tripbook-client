import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ParamsService } from '../shared/params.service';
import { SearchService } from '../shared/Search.service';
import { UserService } from '../shared/User.service';
import { ModalWindowService } from '../shared/modalWindow.service';

@Component({
  selector: 'searchresults',
  templateUrl: './searchResults.template.html',
  styleUrls: ['./searchResults.style.scss']
})

export class SearchResultsComponent {

  paramsSub: any;
  params: any;

  userSub: any;
  user: any;

  searching: boolean = false;
  searchResults: any = [];
  size: string = 's';
  type: string = '';

  currentCity: string;

  tripsType = ['booking', 'trip-offer'];


  constructor (private _ParamsService: ParamsService,
               private _SearchService: SearchService,
               private _UserService: UserService,
               private _ModalWindowService: ModalWindowService,
               private _Router: Router) {
    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      if (params && params.currentModule === 'search') {
      this.params = params;
      let searchPath = (params.path.split('/').pop()).split('?tab=');
      this.type = decodeURIComponent(searchPath[1]);
      this.searchResults = [];
      this.searchFor(searchPath[0], decodeURIComponent(searchPath[1]));
      this.currentCity = searchPath[0];
      }

    });
    this.userSub = this._UserService.currentUser.subscribe(user => {
      if (user)
        this.user = user;

      });
  }

  ngOnDestroy() {
    if (this.paramsSub)
      this.paramsSub.unsubscribe();

    if (this.userSub)
      this.userSub.unsubscribe();

  }

  searchFor(keyword: string, tab: string) {

    if (this.searching || !keyword || !this.params) return;
    this.searching = true;
    //TODO: Show the rest of the results
    this._SearchService.search(keyword, tab)
     .then(results => {
       this.searchResults = results.splice(0, 9)})
     .catch(error => console.error(error))
     .finally(() => this.searching = false);
  }

  goToProfilePage(id: string): void {
    this._Router.navigateByUrl(`user/${id}`);
  }

  createTripRequest(): void {
    this._ModalWindowService.openModal('request-trip', this.currentCity);
  }

  goToTripPage($event: any): void {
    this._Router.navigateByUrl(`trip/${$event}`);
  }
}
