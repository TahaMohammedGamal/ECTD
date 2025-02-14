import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../configurations/shared.config';

export const fileUploader = new HttpContextToken(() => false);

@Injectable()
export class HeaderHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization to request header
    if (localStorage.getItem(Configuration.localStorageKeys.token) !== null) {
      const token = 'Bearer ' + localStorage.getItem(Configuration.localStorageKeys.token);
      if (token) {
        req = req.clone({
          headers: req.headers.set('Authorization', `${token}`),
        });
      }
    }

    const currentLanguageString = localStorage.getItem(Configuration.localStorageKeys.currentLanguage);
    let currentLanguage = currentLanguageString == 'ar' ? 1 : 2;
    
   req = req.clone({
      headers: req.headers.set('Accept-Language', 'ar-EG')
      .set("Current-Language", currentLanguage.toString()),
    });

    if (req.context.get(fileUploader) === true) {
      req = req.clone({
        reportProgress: true,
        responseType: 'json',
      });
      return next.handle(req);
    } else {
      // add content type to request header
      if (!req.headers.has('Content-Type') && req.url.indexOf("Upload") == -1) {
        req = req.clone({
          headers: req.headers.set('Content-Type', 'application/json'),
        });
      }
      return next.handle(req);
    }
  }
}
