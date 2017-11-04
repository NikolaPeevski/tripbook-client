import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { LoginService } from './Login.service';

@Component({
  selector: 'login',
  templateUrl: './login.template.html',
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
  firstNameFormControl = new FormControl('', [Validators.required, Validators.pattern(this.NAME_REGEX)]);
  lastNameFormControl = new FormControl('', [Validators.required, Validators.pattern(this.NAME_REGEX)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]);

  //false - singIn; true - signUp
  viewState: boolean = false;

  constructor (private _LoginService: LoginService){}

  switchState(): void {
    this.viewState = !this.viewState;
  }

  signUp(): void {

    this._LoginService.signUp(this.firstNameFormControl.value, this.lastNameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value)
      .then(status => {})
      .catch(error => console.error(error));
  }

  signIn(): void {

    this._LoginService.signIn(this.emailFormControl.value, this.passwordFormControl.value)
      .then(status => {})
      .catch(error => console.error(error));
  }
  
}
