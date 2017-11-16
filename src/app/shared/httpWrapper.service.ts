import * as Promise from 'bluebird';

import { Angular2TokenService } from 'angular2-token';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Constants } from './Constants';

@Injectable()
export class httpWrapperService {

  constructor(private _Angular2TokenService: Angular2TokenService){}

  /**
 * True of the response content type is JSON.
 */
  private isJson(value: Response): boolean {
      return /\bapplication\/json\b/.test(value.headers.get('Content-Type'));
  }

  /**
   * Wrapped get method with necessary tokens
   * @param  {string}       url               Necessary path
   * @param  {any}          additionalHeaders Future feature
   * @param  {boolean   =                 true}        isAPI  Is internal or external request
   * @return {Promise<any>}                   Json type response in the form of a promise
   */
  get(url: string, additionalHeaders: any = {}, isAPI: boolean = true) : Promise<any> {
    return new Promise((resolve, reject) => {
        (<any>this._Angular2TokenService.get(`${url}`, additionalHeaders))
          .map( response => response)
            .toPromise()
              .then(data => resolve(data.json())) //TODO: this.isJson(data) ? data : add this when Content-Type is fixed
              .catch(err => reject(err));
              //TODO: Implement error service.
    });
  }

  post(url: string, payload: any = {}, additionalHeaders: any = {}, isAPI: boolean = true) : Promise<any> {
    return new Promise((resolve, reject) => {
        (<any>this._Angular2TokenService.post(`${url}`, payload, additionalHeaders))
          .map( response => response)
            .toPromise()
              .then(data => resolve(data.json())) //TODO: this.isJson(data) ? data : add this when Content-Type is fixed
              .catch(err => reject(err));
              //TODO: Implement error service.
    });
  }

  put(url: string, payload: any = {}, additionalHeaders: any = {}, isAPI: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      (<any>this._Angular2TokenService.put(`${url}`, payload, additionalHeaders))
        .map(response => response)
          .toPromise()
            .then(data => resolve(data.json())) //TODO: this.isJson(data) ? data : add this when Content-Type is fixed
            .catch(error => reject(error));
            //TODO: Implement error service.
    });
  }

  patch(url: string, payload: any = {}, additionalHeaders: any = {}, isAPI: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      (<any>this._Angular2TokenService.patch(`${url}`, payload, additionalHeaders))
        .map(response => response)
          .toPromise()
            .then(data => resolve(data.json())) //TODO: this.isJson(data) ? data : add this when Content-Type is fixed
            .catch(error => reject(error));
            //TODO: Implement error service.
    });
  }

  delete(url: string, additionalHeaders: any = {}, isAPI: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      (<any>this._Angular2TokenService.delete(`${url}`, additionalHeaders))
        .map(response => response)
          .toPromise()
            .then(data => resolve(data.json())) //TODO: this.isJson(data) ? data : add this when Content-Type is fixed
            .catch(error => reject(error));
            //TODO: Implement error service.
    });
  }



}
