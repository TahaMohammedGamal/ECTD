import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth-services";

import { AuthRepository } from '../auth.repository';
import { EncryptAES } from "../../shared/encryption";
import { Observable, map } from "rxjs";
import { UserRequestModel } from "./request-response/request";
import { DataResponse, FileValidationModel, UserResponseModel } from "./request-response/response";
import { HttpClient, HttpContext } from "@angular/common/http";
import { fileManagementAPIUrl } from "src/app/core/interceptors/base-url-handler.interceptor";
import { Configuration } from "src/app/core/configurations/shared.config";



@Injectable({
    providedIn: 'root'
  })
  export class ValidateUsecase {
    fileManagementAPIUrl: HttpContext = new HttpContext().set(fileManagementAPIUrl, true);
    constructor(
      private authRepository: AuthRepository,
      private authService: AuthService,
      private httpClient: HttpClient
    ) {}
    excute(formData:FormData): Observable<FileValidationModel> {
      return this.httpClient.post<FileValidationModel>(Configuration.APIs.FileValidationManagement.ValidateFile, formData
        , { context: this.fileManagementAPIUrl })
        .pipe(map((res: FileValidationModel) => {
            return res
          }))
        }
  }