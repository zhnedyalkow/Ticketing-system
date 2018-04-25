import { Injectable } from '@angular/core';
import { CanActivate, 
         Router, 
         ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { debug } from 'util';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;

        const token = localStorage.getItem('token');

        // decode the tocken to get its payload
        const tokenPayload = jwt_decode(token);
        debugger;

        if (
            !this.auth.isAuthenticated() ||
            tokenPayload.role !== expectedRole
        ) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
