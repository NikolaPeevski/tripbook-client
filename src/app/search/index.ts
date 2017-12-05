import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';
import { ComponentsModule } from '../shared/components';
import { PipesModule } from '../shared/pipes';

import { SearchResultsComponent } from './searchResults.component';
import { SearchResultComponent } from './searchResult/searchResult.component';

export const routes = [
    { path: '', component: SearchResultsComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    //Components come here
    SearchResultsComponent,
    SearchResultComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    PipesModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class SearchModule {
  static routes = routes;
}
