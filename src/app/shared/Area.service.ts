import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { httpWrapperService } from './httpWrapper.service';
import { Constants } from './Constants';

import { Area } from './models/Area.model';

@Injectable()
export class AreaService {

  constructor (private _httpWrapperService: httpWrapperService) {}

  getCity(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!id) return reject();

      this._httpWrapperService.get(`${Constants.AREAS.AREAS}/city/${id}`)
      .then(response => {
        const city: Area = {
          id: response.id,
          name: response.name,
          type: response.type,
          url: response.url,
          country: response.country,
          cities: ''
        };
        return resolve(city);
      }).catch(error => reject(error));
    });
  }

  getCountry(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!id) return reject();

      this._httpWrapperService.get(`${Constants.AREAS.AREAS}/country/${id}`)
      .then(response => {
        const city: Area = {
          id: response.id,
          name: response.name,
          type: response.type,
          url: response.url,
          cities: response.cities,
          country: ''
        };
        return resolve(city);
      }).catch(error => reject(error));
    });
  }

  searchAreas(keyword: string, onlyCities: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!keyword) return reject();

      this._httpWrapperService.get(`${Constants.AREAS.AREAS}/${keyword}${onlyCities ? '?only=cities' : ''}`)
      .then(response => {
        let results: Area[] = response.map(el => {
          const Area: Area = {
            id: el.id,
            name: el.name,
            type: el.type,
            url: el.url,
            cities: el.cities || '',
            country: el.parent_area || ''
          };
          return Area;
        });
        return resolve (results);
      })
      .catch(error => reject(error));
    });
  }

}
