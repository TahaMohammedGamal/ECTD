import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResponse, DataResponse } from '../models/response.model';
import { LoaderService } from '../services/loader/loader.service';
import { Configuration } from '../configurations/shared.config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private _toastrService:ToastrService,
    private _translationService:TranslationService,
    private _loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<unknown>) => {

        if (event instanceof HttpResponse) {
          let responseBody = event.body as DataResponse<any>;
          if (!request.url.includes('i18n')) {
            if (responseBody && !responseBody.result) {              
              this._loaderService.showLoader.next(false);
            }
          }
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage=error.message;
        this._loaderService.showLoader.next(false);
        if (
          error.status === Configuration.httpResponseStatusCode.badRequest ||
          error.status === Configuration.httpResponseStatusCode.paymentRequiredExperimental ||
          error.status === Configuration.httpResponseStatusCode.notFound ||
          error.status === Configuration.httpResponseStatusCode.methodNotAllowed ||
          error.status === Configuration.httpResponseStatusCode.notAcceptable ||
          error.status === Configuration.httpResponseStatusCode.requestTimeout ||
          error.status === Configuration.httpResponseStatusCode.conflict ||
          error.status === Configuration.httpResponseStatusCode.gone ||
          error.status === Configuration.httpResponseStatusCode.lengthRequired
        ) {
          let responseBody = error.error as BaseResponse;
          if (!request.url.includes('i18n')) {
            if (responseBody) {
              if (!responseBody.result) {
                if(responseBody.errorCode)
                {
                 errorMessage= `${this._translationService.getTranslation(`Errors.${responseBody.errorCode}`)}`;
                }
               
                this._loaderService.showLoader.next(false);
              }
            }

          }

        }


        if (
          error.status === Configuration.httpResponseStatusCode.unauthorized ||
          error.status === Configuration.httpResponseStatusCode.forbidden ||
          error.status ===
          Configuration.httpResponseStatusCode.proxyAuthenticationRequired
        ) {

          localStorage.clear();
          this.router.navigate([Configuration.modules.auth]);
          errorMessage = error.statusText;
        }

        if (
          error.status ===
          Configuration.httpResponseStatusCode.internalServerError ||
          error.status ===
          Configuration.httpResponseStatusCode.notImplemented ||
          error.status === Configuration.httpResponseStatusCode.badGateway ||
          error.status ===
          Configuration.httpResponseStatusCode.serviceUnavailable ||
          error.status ===
          Configuration.httpResponseStatusCode.gatewayTimeout ||
          error.status ===
          Configuration.httpResponseStatusCode.hTTPVersionNotSupported ||
          error.status ===
          Configuration.httpResponseStatusCode.variantAlsoNegotiates ||
          error.status ===
          Configuration.httpResponseStatusCode.insufficientStorage ||
          error.status === Configuration.httpResponseStatusCode.loopDetected ||
          error.status === Configuration.httpResponseStatusCode.notExtended ||
          error.status ===
          Configuration.httpResponseStatusCode.networkAuthenticationRequired ||
          error.status === Configuration.httpResponseStatusCode.unknownError
        ) {

errorMessage=error.statusText;
    
        }
        this._toastrService.error(errorMessage);
        return throwError(() => error.error);
      })
    );
  }
}
