import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(UserService).loggedIn()) {
    return true;
  }

  inject(Router).navigate(['/login']);
  return false;
};
