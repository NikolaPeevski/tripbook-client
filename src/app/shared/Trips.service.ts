import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { httpWrapperService } from './httpWrapper.service';

import { Area } from './models/Area.model';
import { Constants } from './Constants';

@Injectable()
export class TripsService {

  constructor (private _httpWrapperService: httpWrapperService) {}

  createTrip(title: string, description: string, trip_type: string, city_IDs: any[], user_id: string, numberOfPeople: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        trip: {
              title,
              description,
              trip_type: `${Constants.TRIP_TYPE[trip_type]}`,
              trip_status: '1',
              user_id,
              'number_of_people': numberOfPeople
            },
            'cities': city_IDs,
          };

      this._httpWrapperService.post(`${Constants.TRIPS}`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getTrips(sorting?:string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.TRIPS}${sorting ? '?sort=' + sorting + '&' : ''}`)
        .then(trips => resolve(trips))
    });
  }

  getTrip(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.TRIPS}/${id}`)
        .then(trip => resolve(trip))
        .catch(error => reject(error));
    });
  }

  getTripsByCity(cityId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.TRIPS}?city_id=${cityId}`)
        .then(trips => resolve(trips.trips))
        .catch(error => reject(error));
    });
  }



}
