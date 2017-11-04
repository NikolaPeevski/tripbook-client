import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';

import { LoginComponent } from './Login.component';

export const routes = [
    { path: '', component: LoginComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    //Components come here
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
})
export class LoginModule {
  static routes = routes;
}
