import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Constants } from './Constants';

import { Angular2TokenService, RegisterData, SignInData } from 'angular2-token';

@Injectable()
export class JWTHandlerService {

  constructor (private _Angular2TokenService : Angular2TokenService) {
    this._Angular2TokenService.init({
        apiBase:                    Constants.APIURL,
        apiPath:                    Constants.APIVERS,

        signInPath:                 'auth/sign_in',
        signInRedirect:             null,
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
  }
  signUp (first_name: string, last_name: string, email: string, password: string) {
    return new Promise<any>((resolve, reject) =>{

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
          .catch(err => reject(err));
    });
  }

  signIn (email: string, password: string) {
    return new Promise<any>((resolve, reject) =>{

      const data: SignInData = {
        email: email,
        password: password
      };

      // (<any>this._Angular2TokenService.signIn(data))
      // .map( response => response)
      //   .toPromise()
      //     .then(data => {
      //       console.log(this._Angular2TokenService.currentUserData)
      //       resolve(data.json());
      //     }) //TODO: this.isJson(data) ? data : add this when Content-Type is fixed
      //     .catch(err => reject(err));
      this._Angular2TokenService.signIn(data).subscribe(
          res => {
            console.log(res);
            this._Angular2TokenService.validateToken();
            resolve(res.json())},
          error =>    console.log(error)
        );
    });
  }
}
