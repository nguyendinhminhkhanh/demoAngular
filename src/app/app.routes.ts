import { Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { authGuard } from './account/auth/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './account/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'pages',
    component: HomePageComponent,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];
