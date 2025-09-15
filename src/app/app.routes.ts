import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/components/home/home.component')
      .then(c => c.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/components/login/login.component')
      .then(c => c.LoginComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component')
      .then(c => c.NotFoundComponent)
  }
];
