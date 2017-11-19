import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


import { Angular2TokenService, RegisterData, SignInData } from 'angular2-token';

import { Constants } from './Constants';

import { UserService } from './User.service';

@Injectable()
export class JWTHandlerService {

  constructor (private _Angular2TokenService: Angular2TokenService,
               private _UserService: UserService) {
    this._Angular2TokenService.init({
        apiBase:                    Constants.APIURL,
        apiPath:                    Constants.APIVERS,

        signInPath:                 'auth/sign_in',
        signInRedirect:             '/home',
        signInStoredUrlStorageKey:  null,

        signOutPath:                'auth/sign_out',
        validateTokenPath:          'auth/validate_token',
        signOutFailedValidate:      false,

        registerAccountPath:        'auth',
        deleteAccountPath:          'auth',
        registerAccountCallback:    window.location.href,

        updatePasswordPath:         'auth',
        resetPasswordPath:          'auth/password',
        resetPasswordCallback:      window.location.href,

        oAuthBase:                  window.location.origin,
        oAuthPaths: {
            github:                 'auth/github'
        },
        oAuthCallbackPath:          'oauth_callback',
        oAuthWindowType:            'newWindow',
        oAuthWindowOptions:         null,

        userTypes:                  null,

        globalOptions: {
            headers: {
                'Content-Type':     'application/json',
                'Accept':           'application/json'
            }
        }
    });

    // Long story short Angular2 token has a nasty implementation and this is a bandaid fix.
    // Since time is of the essence, this will stay like this until we have more time.
    // Usually we should consume the Angular2 token validate token on init function,
    // instead of making a second request. w/e
    this.validateToken()
      .then(response => response.success ? this._UserService.defineUser(response.data) : {})
      .catch(error => {});
  }

  signUp(first_name: string, last_name: string, email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const data:RegisterData = {
        email: email,
        password: password,
        passwordConfirmation: password,
        name: `${first_name} ${last_name}`
      };

      (<any>this._Angular2TokenService.registerAccount(data))
        .map( response => response)
          .toPromise()
            .then(data => resolve(data.json())) //TODO: this.isJson(data) ? data : add this when Content-Type is fixed
            .catch(error => reject(error));
    });
  }

  signIn(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const data: SignInData = {
        email: email,
        password: password
      };
      (<any>this._Angular2TokenService.signIn(data))
        .map(response => response)
          .toPromise()
            .then(data => resolve(data.json()))
            .catch(error => reject(error));
    });
  }

signOut(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      (<any>this._Angular2TokenService.signOut())
        .map(response => response)
          .toPromise()
            .then(data => {
              this._UserService.user = undefined;
              resolve(data.json()) })
            .catch(error => reject(error));
    });
  }

  validateToken(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      (<any>this._Angular2TokenService.validateToken())
        .map(response => response)
          .toPromise()
            .then(data => resolve(data.json()))
            .catch(error => error);
    });
  }
}
