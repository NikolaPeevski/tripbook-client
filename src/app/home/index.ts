import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';

import { HomeComponent } from './Home.component';

export const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    //Components come here
    HomeComponent
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
export class HomeModule {
  static routes = routes;
}
