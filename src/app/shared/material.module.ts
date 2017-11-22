import { NgModule } from '@angular/core';

import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatTableModule,
         MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule,
         MatTabsModule, MatPaginatorModule, MatMenuModule, MatDialogModule, MatStepperModule,
         MatDatepickerModule, MatCheckboxModule, MatNativeDateModule, MatSelectModule } from '@angular/material';

import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';


@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSelectModule,
    ObserversModule,
    PlatformModule
  ]
})
export class CustomMaterialModule {}
