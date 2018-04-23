import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { 
    AuthGuardServiceLogin,
    AuthGuardService,
} from '../core/auth/auth-guard.service';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent, canActivate: [AuthGuardServiceLogin] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuardServiceLogin] },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
