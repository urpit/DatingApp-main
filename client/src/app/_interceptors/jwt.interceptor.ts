import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class jwtInterceptor implements HttpInterceptor {
  constructor(private accoutService: AccountService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.accoutService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        }
      },
    });

    return next.handle(req);
  }
}
