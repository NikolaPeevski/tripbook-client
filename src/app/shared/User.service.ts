import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { httpWrapperService } from './httpWrapper.service';
import { Constants } from './Constants';
import { User } from './models/user.model';

@Injectable()
export class UserService {

  private userHolder = new BehaviorSubject<any>(undefined);

  public currentUser = this.userHolder.asObservable();

  constructor (private _httpWrapperService: httpWrapperService) {}

  user:User;

  defineUser(data: any): void {
    console.log(data);
    this.user = {
    'id': data.id || '',
    'local_id': data.local_id || '',
    'name': data.name || '',
    'lastname': data.lastname  || '',
    'email': data.email || '',
    'age': data.age || '',
    'birthday': data.birthday || '',
    'gender': data.gender || '',
    'active': data.active || '',
    'created_at': data.created_at || '',
    'updated_at': data.updated_at || '',
    'has_local': data.has_local
    };
    // Notifies whoever's interested.
    this.userHolder.next(this.user);

  }

  getUser(): User {
    return this.user;
  }

  updateUserByProperty(property: string, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.user[property] === undefined) {

        return reject();
      }
      this.user[property] = value;
      const payload = {'user': this.user };


      this._httpWrapperService.put(`${Constants.USERS}/${this.user.id}`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getUserById(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (0 > id) return reject();

      this._httpWrapperService.get(`${Constants.USERS}/${id}`)
        .then(response => {
          let user: User = {
          'id': response.id,
          'local_id': response.local_id || '',
          'name': response.name || '',
          'lastname': response.lastname  || '',
          'email': response.email || '',
          'age': response.age || '',
          'birthday': response.birthday || '',
          'gender': response.gender || '',
          'active': response.active || '',
          'created_at': response.created_at || '',
          'updated_at': response.updated_at || '',
          'has_local': response.has_local
          };
          return resolve(user);
        }).catch(error => reject(error));
    });
  }

  searchUsers(keyword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!keyword) return reject();

      this._httpWrapperService.get(`${Constants.USERS}?query=${keyword}`)
        .then(response => {
          return resolve(response.users.map(el => ({
            'id': el.id,
            'local_id': el.local_id || '',
            'name': el.name || '',
            'lastname': el.lastname  || '',
            'email': el.email || '',
            'age': el.age || '',
            'birthday': el.birthday || '',
            'gender': el.gender || '',
            'active': el.active || '',
            'created_at': el.created_at || '',
            'updated_at': el.updated_at || ''
          })));
        })
        .catch(error => reject(error));
    });
  }

isGuest(): boolean {
  return (!this.user || !this.user.email || this.user.email === '')
  }
}
