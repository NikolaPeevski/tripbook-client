import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { modalWindowComponent } from './components/modalWindow/modalWindow.component';

@Injectable()
export class ModalWindowService {

  constructor (private _MatDialog: MatDialog)
               {}

  public openModal(type: string, cityName?: string, local_id?: string): void {
    let config: MatDialogConfig = { data: { 'type': type, cityName, local_id}}
    this._MatDialog.open(modalWindowComponent, config);
  }

}
