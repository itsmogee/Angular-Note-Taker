import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./posts/post-create/post-create.component').then(
        (m) => m.PostCreateComponent,
      ),
  },
  {
    path: 'edit/:postID',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./posts/post-create/post-create.component').then(
        (m) => m.PostCreateComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((m) => m.SignupComponent),
  },
];
