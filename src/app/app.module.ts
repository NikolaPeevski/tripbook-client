//UI imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginModule } from './login';
import { CustomMaterialModule } from './shared/material.module';
import { ROUTES } from './app.routes';

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
import { LoginService } from './login/Login.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    FlexLayoutModule,
    CustomMaterialModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [
    Angular2TokenService,
    JWTHandlerService,
    httpWrapperService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
