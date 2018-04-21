import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
