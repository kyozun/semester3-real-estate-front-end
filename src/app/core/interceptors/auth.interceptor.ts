import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LocalStorageKeys } from '../../shared/models/local-storage-keys';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getAccessToken()?.token}`,
    },
  });
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorageService.removeItem(LocalStorageKeys.CurrentUser);
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
