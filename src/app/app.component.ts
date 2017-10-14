import { Component } from '@angular/core';


import { httpWrapperService } from './shared/httpWrapper.service';
import { JWTHandlerService } from './shared/JWTHandler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private _JWTHandlerService: JWTHandlerService,
    private _httpWrapperService: httpWrapperService
  ){
      this.backEndHelloWorld();
  }

  backEndHelloWorld():void {
    this._httpWrapperService.get('helloworld')
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
}
