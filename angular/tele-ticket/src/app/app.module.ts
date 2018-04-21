import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../app/core/auth/token.interceptor';
import { CoreModule } from './core/core.module';
import { AuthHomeService } from './home/services/auth.home.service';
import { AppConfig } from './config/app.config';
import { JwtModule } from '@auth0/angular-jwt';

function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,

        HomeModule,

        CoreModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:3001'],
              blacklistedRoutes: []
            }
          })
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
