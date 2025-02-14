import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth-services";

import { AuthRepository } from '../auth.repository';
import { EncryptAES } from "../../shared/encryption";
import { Observable, map } from "rxjs";
import { UserRequestModel } from "./request-response/request";
import { DataResponse, UserResponseModel } from "./request-response/response";
import { HttpClient, HttpContext } from "@angular/common/http";
import { fileManagementAPIUrl } from "src/app/core/interceptors/base-url-handler.interceptor";
import { Configuration } from "src/app/core/configurations/shared.config";



@Injectable({
    providedIn: 'root'
  })
  export class LoginUsecase {
    fileManagementAPIUrl: HttpContext = new HttpContext().set(fileManagementAPIUrl, true);
    constructor(
      private authRepository: AuthRepository,
      private authService: AuthService,
      private httpClient: HttpClient
    ) {}
    login(request: UserRequestModel): Observable<UserResponseModel> {

      request.password = request.password.replace(/\s/g, '');
      var credentials = request.email + String.fromCharCode(31) + request.password;
      const encryptedCredentials = EncryptAES(credentials).toString();
      request.credential=encryptedCredentials;
      return this.httpClient.post<UserResponseModel>(Configuration.APIs.Auth.login, request, { context: this.fileManagementAPIUrl }).pipe(
        map((res: UserResponseModel) => {
          return res
        })
      )
    }
  }