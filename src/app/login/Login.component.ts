import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { LoginService } from './Login.service';
import { ModalWindowService } from '../shared/modalWindow.service';
import { ParamsService } from '../shared/params.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './Login.template.html',
  styleUrls: ['./login.scss']
})

export class LoginComponent {
  //Correct email syntax
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //Only letters no spaces
  NAME_REGEX = /^[a-zA-Z ]*$/;
  //Minimum eight characters, at least one letter and one number:
  PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]);
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(this.NAME_REGEX)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]);

  //false - singIn; true - signUp
  viewState: boolean = false;

  constructor (private _LoginService: LoginService,
               private _Router: Router,
               private _ParamsService: ParamsService,
               private _ModalWindowService: ModalWindowService
              ){}

  switchState(): void {
    this.viewState = !this.viewState;
  }

  signUp(): void {

    this._LoginService.signUp(this.nameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value)
      .then(status => {})
      .catch(error => this._ModalWindowService.openModal('errors', null, null, null, error.json().errors.full_messages));
  }

  signIn(): void {

    this._LoginService.signIn(this.emailFormControl.value, this.passwordFormControl.value)
      .then(status => {})
      .catch(error => this._ModalWindowService.openModal('error', null, null, null, error.json()['errors']));
  }

  goBack(): void {

    let previousModule = this._ParamsService.previousParams && this._ParamsService.previousParams['currentModule']  ? this._ParamsService.previousParams['currentModule'] : 'home';

    this._Router.navigateByUrl(`${previousModule}`)
  }

  // handles events on key press
  keypressHandler(keyCode): void {
    // if key press was ENTER, then run the sign in method
    if (keyCode == 13) this.signIn();
  }

}
