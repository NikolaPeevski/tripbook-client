import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { httpWrapperService } from './httpWrapper.service';
import { Constants } from './Constants';
import { User } from './models/user.model';
import { Local } from './models/local.model';

@Injectable()
export class LocalsService {

  constructor (private _httpWrapperService: httpWrapperService) {}

  createLocal(country_id, city_id, description:string = '', quote:string = '', available: any = '', available_from = '', available_to = ''): Promise<any> {
    return new Promise((resolve, reject) => {

    if (!country_id || !city_id) return reject();

    const payload = {
      local: {
        description,
        quote,
        available,
        available_from,
        available_to,
        country_id,
        city_id
      }
    }
    this._httpWrapperService.post(`${Constants.LOCALS}/`, payload)
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
  }

  // updateUserByProperty(property: string, value: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     if (this.user[property] === undefined) {
  //       reject();
  //       return;
  //     }
  //     this.user[property] = value;
  //     const payload = {'user': this.user };
  //
  //
  //     this._httpWrapperService.put(`${Constants.LOCALS}/${this.user.id}`, payload)
  //       .then(response => resolve(response))
  //       .catch(error => reject(error));
  //   });
  // }

  getLocalById(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (0 > id) return reject();

      this._httpWrapperService.get(`${Constants.LOCALS}/${id}`)
        .then(response => {

          let local: Local = {
            id: response.id,
            available: response.available || false,
            available_from: response.available_from || '',
            available_to: response.available_to || '',
            city_id: response.city_id,
            country_id: response.country_id,
            description: response.description || '',
            quote: response.quote || '',
            user: {
              'id': response.user.id,
              'local_id': response.id || '',
              'name': response.user.name || '',
              'lastname': response.user.lastname  || '',
              'email': response.user.email || '',
              'age': response.user.age || '',
              'birthday': response.user.birthday || '',
              'gender': response.user.gender || '',
              'active': response.user.active || '',
              'created_at': response.user.created_at || '',
              'updated_at': response.user.updated_at || ''
            }
          };
          resolve(local);
        }).catch(error => reject(error));
    });
  }

  searchLocals(value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!value) return reject();

      this._httpWrapperService.get(`${Constants.LOCALS}?query=${value}`)
        .then(response => {
          resolve(response.locals.map(el => {
            return {
              id: el.id,
              available: el.available || false,
              available_from: el.available_from || '',
              available_to: el.available_to || '',
              city_id: el.city_id,
              country_id: el.country_id,
              description: el.description || '',
              quote: el.quote || '',
              user: {
                'id': el.user.id,
                'local_id': el.id || '',
                'name': el.user.name || '',
                'lastname': el.user.lastname  || '',
                'email': el.user.email || '',
                'age': el.user.age || '',
                'birthday': el.user.birthday || '',
                'gender': el.user.gender || '',
                'active': el.user.active || '',
                'created_at': el.user.created_at || '',
                'updated_at': el.user.updated_at || ''
              }
            }
          }))
        })
    })
  }

}
