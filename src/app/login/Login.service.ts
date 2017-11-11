import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { JWTHandlerService } from '../shared/JWTHandler.service';

@Injectable()
export class LoginService {
  constructor (private _JWTHandlerService: JWTHandlerService) {}

  signUp (first_name: string, last_name: string, email: string, password: string) {
    return new Promise<any>((resolve,reject) => {

      if(!first_name || !last_name || !email || !password) reject();

      this._JWTHandlerService.signUp(first_name, last_name, email, password)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  signIn (email: string, password:string) {
    return new Promise<any>((resolve,reject) => {
      if(!email || !password) reject();
      this._JWTHandlerService.signIn(email, password)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
