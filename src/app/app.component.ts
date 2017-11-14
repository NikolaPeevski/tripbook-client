import { Component } from '@angular/core';

import { TopBarComponent } from './layout/TopBar.component';

import { JWTHandlerService } from './shared/JWTHandler.service';
import { ParamsService } from './shared/params.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  params:any;
  paramsSub: any;

  constructor(
    private _JWTHandlerService: JWTHandlerService,
    private _ParamsService: ParamsService
  ){
    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      params ? this.params = params : ''

    });
  }
}
