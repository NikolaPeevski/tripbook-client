import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';

import { TripComponent } from './Trip.component';

export const routes = [
    { path: '', component: TripComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    //Components come here
    TripComponent
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
export class TripModule {
  static routes = routes;
}
