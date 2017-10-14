//UI imports
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular internal imports
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//Component dependencies
import { AppComponent } from './app.component';

//Module providers
import { Angular2TokenService } from 'angular2-token';
import { JWTHandlerService } from './shared/JWTHandler.service';
import { httpWrapperService } from './shared/httpWrapper.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule
  ],
  providers: [
    Angular2TokenService,
    JWTHandlerService,
    httpWrapperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
