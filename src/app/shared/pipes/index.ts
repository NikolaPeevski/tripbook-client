import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Add Application-wide pipes here
import { DecodePipe } from './Decode.pipe';
@NgModule({
    declarations: [
        DecodePipe
    ],
    exports: [
        DecodePipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }
