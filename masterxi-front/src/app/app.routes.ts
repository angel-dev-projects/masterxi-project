import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { authGuard } from './guards/auth.guard';
import { TransfersComponent } from './views/transfers/transfers.component';
import { TeamComponent } from './views/team/team.component';
import { StandingsComponent } from './views/standings/standings.component';
import { SettingsComponent } from './views/settings/settings.component';

export const routes: Routes = [
  // Authorization
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  // Home
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  // Transfers
  {
    path: 'transfers',
    component: TransfersComponent,
    canActivate: [authGuard],
  },

  // Team
  {
    path: 'team',
    component: TeamComponent,
    canActivate: [authGuard],
  },

  // Standings
  {
    path: 'standings',
    component: StandingsComponent,
    canActivate: [authGuard],
  },

  // Settings
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
  },

  // Default route
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
