import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
