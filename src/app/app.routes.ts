import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/pages/login/login.component';
import { HomePageComponent } from './login/pages/home/home.component';
import { UserPageComponent } from './login/pages/user/user.component';
import { LoginComponent } from './login/components/login/login.component';
import { NotFoundPageComponent } from './login/pages/404/notFound.component';
import { DogPageComponent } from './login/pages/dog/dog.component';
import { AuthGuard } from './login/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    title: 'auth',
    component: LoginPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('./login/pages/user/user.component').then(
            (c) => c.UserPageComponent
          ),
      },
    ],
  },
  {
    path: 'dog',
    loadComponent: () =>
      import('./login/pages/dog/dog.component').then((c) => c.DogPageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./login/pages/404/notFound.component').then(
        (c) => c.NotFoundPageComponent
      ),
  },
];
