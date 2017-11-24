import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';

import { HomeComponent } from './Home.component';
import { ComponentsModule } from '../shared/components';


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
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {
  static routes = routes;
}
