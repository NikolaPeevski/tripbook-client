import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Constants } from './Constants';

import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class JWTHandlerService {

  constructor(private _Angular2TokenService : Angular2TokenService){
    this._Angular2TokenService.init();
  }


  // get(url:string, additionalHeaders?: any, toJSON: boolean = true, isAPI: boolean = false) : Promise<any> {
  //   return new Promise((resolve, reject) =>{
  //       // let options = {
  //       //   'Content-Type' : 'application/json',
  //       //   'Accept' : 'application/json'
  //       // };
  //       // console.log(options);
  //       // let b = {
  //       //   headers: new Headers(options)
  //       // };
  //       // console.log(b);
  //       // let c = new RequestOptions(b);
  //
  //       (<any>this._Http.get(`${isAPI ? Constants.APIURL : ''}${url}`))
  //         .map( response => response)
  //           .toPromise()
  //             .then(data => resolve(data))
  //             .catch(err => reject(err));
              //Should Implement error service.
    // });
  }
