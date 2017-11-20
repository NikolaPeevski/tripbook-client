import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './card/Card.component';
import { modalWindowComponent } from './modalWindow/modalWindow.component';
import { CustomMaterialModule } from '../material.module';


@NgModule({
  declarations: [
    //Components come here
    CardComponent,
    modalWindowComponent
  ],
  exports: [
    CardComponent,
    modalWindowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
   entryComponents: [
     modalWindowComponent
   ]
})
export class ComponentsModule {}
