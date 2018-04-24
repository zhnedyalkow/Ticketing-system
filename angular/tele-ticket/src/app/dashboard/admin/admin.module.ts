import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../shared/services/admin.service';
import { AsyncPipe } from '@angular/common';

@NgModule({
    declarations: [
        AdminComponent,
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AdminService,
  ]
})
export class AdminModule { }
