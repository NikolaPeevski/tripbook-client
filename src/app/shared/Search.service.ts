import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService } from '../shared/Area.service';
import { LocalsService } from '../shared/Locals.service';
import { ReviewService } from '../shared/Review.service';
import { TripsService } from '../shared/Trips.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SearchService {
  constructor (private _Router: Router,
               private _AreaService: AreaService,
               private _LocalsService: LocalsService,
               private _ReviewsService: ReviewService,
               private _TripsService: TripsService) {}

  searchResultsSub: any;

  searchFor(keyword: string, type: string = 'country', tab?: string): void {

    this._Router.navigateByUrl(`/search/${keyword}?tab=${!tab ? (type === 'country' ? 'cities' : 'locals') : tab}`);
  }

  search(areaName: string, tab: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._AreaService.searchAreas(areaName)
        .then(response => {
          let id = response[0].id,
          type = response[0].type;
          setTimeout(() => {

          this.searchByTab(response[0].name, tab, id, type)
            .then(searchResults => resolve(searchResults))
            .catch(error => reject(error));
          }, 50);
        }).catch(error => reject(error));
    });
  }

  private searchByTab(keyword: string, tab: string, id: string, type: string): Promise<any> {
    return new Promise((resolve, reject) => {

      if (tab === 'locals')
          setTimeout(() => {
            this._LocalsService.searchLocals(null, type === 'country' ? id : null, type === 'city' ? id : null)
            .then(results => resolve(results))
            .catch(error => reject(error));
          }, 50);

      if (tab === 'cities')
          setTimeout(() => {
            this._AreaService.getCountry(id)
            .then(results => {

              return resolve(results.cities);
            })
            .catch(error => reject(error));
          }, 50);
      //Reviews needs a look when Arnas fixes  the endpoint
      if (tab === 'reviews')
          setTimeout(() => {
            this._ReviewsService.getReview('city', id)
            .then(results => resolve(results))
            .catch(error => reject(error));
          }, 50);

    if (tab === 'trips')
        setTimeout(() => {
          this._TripsService.getTripsByCity(id)
          .then(results => resolve(results))
          .catch(error => reject(error));
        }, 50);

    if (tab === 'requested trips')
        setTimeout(() => {
          this._TripsService.getTripRequests(id)
          .then(results => resolve(results))
          .catch(error => reject(error));
        }, 50);

    });
  }
}
