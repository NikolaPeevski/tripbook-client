import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import {FormControl, Validators} from '@angular/forms';

import { LocalsService } from '../shared/Locals.service';

@Component({
  selector: 'topBar',
  templateUrl: './topBar.template.html',
  styleUrls: ['../styles/topBar.styles.scss']
})


export class TopBarComponent {
  @Input() params:any =  {
    currentModule: "home"

  };

  SEARCH_REGEX = /^[a-zA-Z ]*$/;

  searchFormContol = new FormControl();

  autocomplete: any =  ['ugh','ugh'];

  constructor (private _Router: Router,
               private _LocalsService: LocalsService) {}

  navigateTo(url: string) {
    this._Router.navigateByUrl(url);
  }

  updateUser(): void {
    this._LocalsService.searchLocals('asd')
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
}
