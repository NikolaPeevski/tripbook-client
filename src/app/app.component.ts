import { Component } from '@angular/core';


// import { httpWrapperService } from './shared/httpWrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    // private _httpWrapperService: httpWrapperService
  ){}

  // backEndHelloWorld():void {
  //   this._httpWrapperService.get('helloworld')
  //     .then(response => alert(response))
  //     .catch(err => console.error(err));
  // }
}
