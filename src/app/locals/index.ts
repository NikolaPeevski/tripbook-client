import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';
import { ComponentsModule } from '../shared/components';

import { LocalsComponent } from './Locals.component';

export const routes = [
    { path: '', component: LocalsComponent, page: '1'}
];

@NgModule({
  declarations: [
    //Components come here
    LocalsComponent
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
export class LocalsModule {
  static routes = routes;
}
