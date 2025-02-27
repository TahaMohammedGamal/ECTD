import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Configuration } from '../configurations/shared.config';
import { AuthService } from 'src/app/services/auth-services';


@Injectable()
export class AuthGuard  implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  loginRoute:string=`${Configuration.Auth.login}`;
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log(this.loginRoute);      
      this.router.navigate([this.loginRoute]);
      return false;
    }
    return true;
  }
}