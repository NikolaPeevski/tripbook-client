import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../shared/material.module';
import { ComponentsModule } from '../shared/components';

import { TripsComponent } from './my/Trips.component';
import { RatedTripsComponent } from './rated/RatedTrips.component';
import { PopularTripsComponent } from './popular/PopularTrips.component';

export const routes = [
    { path: '', redirectTo: 'rated'},
    { path: 'my', redirectTo: 'my/trips'},
    { path: 'my/trips', component: TripsComponent, pathMatch: 'full'},
    { path: 'rated', component: RatedTripsComponent, pathMatch: 'full'},
    { path: 'popular', component: PopularTripsComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [
    //Components come here
    TripsComponent,
    RatedTripsComponent,
    PopularTripsComponent
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
export class TripsModule {
  static routes = routes;
}
