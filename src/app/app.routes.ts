import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
       },
      {
        path: 'ectd',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./ectd/pages/dashboard/ectd-dashboard.component').then(m => m.ECTDDashboardComponent),
       },
       {
        path: 'ectd/validate',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./ectd/pages/validate-file/validate-file.component').then(m => m.ValidateFileComponent),
       },
      
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },

];
