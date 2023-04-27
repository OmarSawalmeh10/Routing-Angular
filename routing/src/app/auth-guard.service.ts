import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router'
import {Injectable} from '@angular/core'

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authServivce: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
         Observable<boolean> | Promise<boolean> | boolean {
            return this.authServivce.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if(authenticated){
                        return true;
                    } else {
                        this.router.navigate(['/']);
                        return false;
                    }
                }
            )
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}