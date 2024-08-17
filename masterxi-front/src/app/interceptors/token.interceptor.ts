import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const userService = inject(UserService);
  const myToken = userService.getToken();

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return next(cloneRequest);
};
