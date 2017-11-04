import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule} from '@angular/material';

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
    ObserversModule,
    PlatformModule
  ]
})
export class CustomMaterialModule {}
