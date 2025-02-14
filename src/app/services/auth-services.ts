import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Configuration } from '../core/configurations/shared.config';
import { UserResponseModel } from '../ectd/domain/usecases/request-response/response';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedOut: Subject<void> = new Subject<void>();
  public $loggedOut: Observable<void> = this.loggedOut.asObservable();
  constructor(private storageService: StorageService) { }

  saveLoginedUser(userData: UserResponseModel) {
    console.log(userData);
    
    localStorage.setItem(Configuration.localStorageKeys.userData, JSON.stringify(userData.userInfo));
    localStorage.setItem(Configuration.localStorageKeys.token, userData.token);
  }

  logout(): void {
    this.loggedOut.next();
    this.storageService.clear();
  }

}
