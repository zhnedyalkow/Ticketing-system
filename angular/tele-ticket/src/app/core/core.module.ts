import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AppConfig } from "../config/app.config";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthService } from "./authentication/auth.service";
import { AuthGuardService, AuthGuardServiceLogin } from "./authentication/auth-guard.service";
import { TokenInterceptor } from "./authentication/token.interceptor";
import { AuthHomeService } from "../auth/services/auth.service";
import { RoleGuardService } from "./authentication/role-guard.service";

@NgModule({
    providers: [
      AppConfig,
      AuthService,
      AuthGuardService,
      AuthGuardServiceLogin,
      RoleGuardService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
    ]
  })
  export class CoreModule { }
  