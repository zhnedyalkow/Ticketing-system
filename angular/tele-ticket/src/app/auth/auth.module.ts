import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthHomeService } from './services/auth.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AuthComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgbModule,
  ],
  providers: [
    AuthHomeService,
  ],
})
export class AuthModule { }
