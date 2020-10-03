import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let auth = localStorage.getItem('yabaAuth');

      if (auth) {
        let cognitoAuth = JSON.parse(auth);
        if (cognitoAuth.accessToken.jwtToken) {
          return true;
        }
      }

      this.router.navigate(['auth']);
      return false;
  }
}
