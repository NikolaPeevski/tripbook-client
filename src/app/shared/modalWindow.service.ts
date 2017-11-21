import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { httpWrapperService } from './httpWrapper.service';

import { Constants } from './Constants';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { modalWindowComponent } from './components/modalWindow/modalWindow.component';

@Injectable()
export class ModalWindowService {

  constructor (private _httpWrapperService: httpWrapperService,
               private _MatDialog: MatDialog)
               {}

  public openModal(type: string, cityName?: string): void {
    let config: MatDialogConfig = { data: { 'type': type, cityName}}
    this._MatDialog.open(modalWindowComponent, config);
  }

}
