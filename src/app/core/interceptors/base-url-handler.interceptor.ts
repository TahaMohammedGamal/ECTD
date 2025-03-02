import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroment/enviroment';


export const fileManagementAPIUrl = new HttpContextToken(() => false);


@Injectable()
export class BaseUrlHandlerInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {


        const fileManagementAPIUrl: any = environment.fileManagementAPIUrl;
        // Get JWT Token from Local Storage or Service
        const token = localStorage.getItem('token'); // Adjust based on storage method
        if (req.url) {

            if (!req.url.includes('i18n')) {
                req = req.clone(
                    {   
                    url: fileManagementAPIUrl + req.url,
                    setHeaders: {
                        // AuthorizationHeader: `${token}`
                        ...(token !== null && { AuthorizationHeader: `${token}` })
                      }
                }
            );
                // if (req.context.get(fileManagementAPIUrl) === true) {                   
                //     req = req.clone({
                //         url: fileManagementAPIUrl + req.url,
                //     });
                // } 
                // else {
                //     req = req.clone({
                //         url: req.url,
                //     });
                // }
            }
        }
        return next.handle(req);
    }
}
