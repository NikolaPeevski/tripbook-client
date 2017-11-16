import { NgModule } from '@angular/core';

import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule} from '@angular/material';

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
    ObserversModule,
    PlatformModule
  ]
})
export class CustomMaterialModule {}
