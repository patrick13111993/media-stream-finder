import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from './user.model';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string
}

interface AuthRefreshData {
  id_token: string,
  refresh_token: string,
  expires_in: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTime: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => {
        let errorMessage = "An unknown error occurred";

        if(!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }

        switch(errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = "Email is already in use";
            break;
            case 'INVALID_EMAIL':
            errorMessage = "Invalid email address";
            break;
        } 
        return throwError(errorMessage);
      }),
      tap(response => {this.handleAuth(response)})
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => {
        let errorMessage = "An unknown error occurred";

        if(!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }

        switch(errorResponse.error.error.message) {
          case 'EMAIL_NOT_FOUND':
            errorMessage = "Invalid login credentials";
            break;
            case 'INVALID_PASSWORD':
            errorMessage = "Invalid login credentials";
            break;
        } 
        return throwError(errorMessage);
      }),
      tap(response => {this.handleAuth(response)})
    );
  }

  handleAuth(response: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn*1000);
    const user = new User(response.email, response.localId, response.refreshToken, response.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+response.expiresIn*1000, user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/movie']);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      refreshToken: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData.refreshToken, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.Token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration, loadedUser);
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number, user: User) {
    this.tokenExpirationTime = setTimeout(() => {
      this.autoRefreshToken(user.refreshToken).subscribe(response => {
        if(response) {
          const expirationDate = new Date(new Date().getTime() + +response.expiresIn*1000);
          const updatedUser = new User(user.email, user.id, response.refreshToken, response.idToken, expirationDate);
          this.user.next(updatedUser);
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          this.autoLogout(+response.expiresIn*1000, user);
        } else {
          console.log("Login renewal failed, user to be logged out");
          this.logout();
        }
      })
    }, expirationDuration);
  }

  autoRefreshToken(refreshToken: string): Observable<{idToken: string, refreshToken: string, expiresIn: string}> | null {
      return this.http.post<AuthRefreshData>('https://securetoken.googleapis.com/v1/token?key=' + environment.firebaseAPIKey, 
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      }
    ).pipe(
      catchError(error => {
        console.log("Token refresh post request failed");
        return throwError(null);
      }),
      map(response => {
        return {idToken: response.id_token, refreshToken: response.refresh_token, expiresIn: response.expires_in}
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

}
