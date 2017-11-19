import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './card/Card.component';
import { CustomMaterialModule } from '../material.module';


@NgModule({
  declarations: [
    //Components come here
    CardComponent
  ],
  exports: [
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule
  ],
})
export class ComponentsModule {}
