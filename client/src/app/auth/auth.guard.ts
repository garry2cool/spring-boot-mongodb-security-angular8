import { ToastrService } from 'ngx-toastr';
import { Valid } from './../modal/valid';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | Observable<boolean>  {
    const token = localStorage.getItem('token');
    let isValidToken = false;
    if (token) {
     return this.validToken(token)
      .pipe(map((data: Valid) => {
        isValidToken = data.valid;
        if (isValidToken) {
          return true;
        }
      }));
    } else {
      if (this.authService.isLoggedIn) { return true; }
      this.authService.redirectUrl = url;

      // Navigate to the login page with extras
      this.toastr.error('User is not authenticated', 'Error', {timeOut: 2000});
      setTimeout( _ => {
        this.router.navigate(['/login']);
        return false;
      }, 2000);
    }
}

  validToken(token: string): Observable<Valid> {
    return this.http.get<Valid>('http://localhost:8080/api/auth/validate/' + token);
  }

}
