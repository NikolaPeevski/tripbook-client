import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ParamsService {

  private subscription: any;
  private params:any = [];

  private paramsSub = new BehaviorSubject<any>(false);
  public paramsObs = this.paramsSub.asObservable();

  public previousParams = [];

  constructor (private _Router: Router) {

    this.subscription = this._Router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {

        if (this.params)
          this.previousParams = this.params;
          
        this.params = this.mapParamsFromUrl(event['urlAfterRedirects'] || event['url'] || this._Router.url);
        console.log(this.previousParams, this.params);
        this.paramsSub.next(this.params);

        }
      });

    }

  private mapParamsFromUrl(url: string): any {
    let urlSplit = url.split('/');
    //Removing empty entry (aka first slash)
    urlSplit.shift();

    let currentModule = urlSplit.shift();
    let path = urlSplit.join('/');
    //Returning the final params
    return {
      currentModule,
      path: path === '' ? '/' : `/${path}`
    };
  }

  public getParams(): any {
    return this.params;
  }

}
