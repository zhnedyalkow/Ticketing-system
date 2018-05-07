import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstPipe } from '../../../dashboard/shared/pipes/capitalizefirst.pipe';

@NgModule({
  declarations: [CapitalizeFirstPipe],
  imports: [CommonModule ],
  exports: [CapitalizeFirstPipe]
})
export class CapitalizePipeModule {

 }
