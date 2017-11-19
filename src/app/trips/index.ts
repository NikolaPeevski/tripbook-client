import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';

import { TripsComponent } from './Trips.component';

export const routes = [
    { path: '', component: TripsComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    //Components come here
    TripsComponent
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
export class TripsModule {
  static routes = routes;
}
