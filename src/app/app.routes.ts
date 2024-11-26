import { Routes } from '@angular/router';
import { LoginComponent } from './business/authentication/login/login.component';
import { RegisterComponent } from './business/authentication/register/register.component';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  //{ path: '', component: AppComponent },
  {
    path: 'login',
    component: LoginComponent /*canActivate: [AuthenticatedGuard]*/,
  },
  {
    path: 'register',
    component: RegisterComponent /*canActivate: [AuthenticatedGuard]*/,
  },
];
