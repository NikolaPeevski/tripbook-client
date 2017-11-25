import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';
import { ComponentsModule } from '../shared/components/';

import { UserComponent } from './User.component';

export const routes = [
    { path: '', component: UserComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    //Components come here
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class UserModule {
  static routes = routes;
}
