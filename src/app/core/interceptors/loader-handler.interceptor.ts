import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class LoaderHandlerInterceptor implements HttpInterceptor {

  constructor(private _loaderService: LoaderService) { }
  counter: number = 0;
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.counter++;
    this._loaderService.showLoader.next(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.counter--;
        if (this.counter == 0) {
          setTimeout(() => {
            this._loaderService.showLoader.next(false);
          }, 500);
        }
      }),
    );
  }
}

