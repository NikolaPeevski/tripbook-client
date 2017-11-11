import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'topBar',
  templateUrl: './topBar.template.html'
})


export class TopBarComponent {
  @Input() params:any =  {
    currentModule: "home"

  };

  constructor (private _Router: Router) {}

  navigateTo(url: string) {
    this._Router.navigateByUrl(url);
  }
}
