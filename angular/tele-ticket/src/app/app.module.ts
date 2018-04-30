import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';


import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './auth/not-found/not-found.component';


export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot(),

        HttpClientModule,
        CoreModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:3001'],
                blacklistedRoutes: []
            }
        }),

        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
