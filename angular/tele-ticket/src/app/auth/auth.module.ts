import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthHomeService } from './services/auth.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  providers: [
    { provide: AuthHomeService, useClass: AuthHomeService },
  ],
})
export class AuthModule { }
