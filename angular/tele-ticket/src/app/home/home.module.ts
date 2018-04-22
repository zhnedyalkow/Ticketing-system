import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { AuthHomeService } from './services/auth.home.service';

import { routing } from './home.route';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        ComponentsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    declarations: [HomeComponent, LoginComponent, RegisterComponent],
    providers: [
        AuthHomeService,
    ]
})
export class HomeModule { }
