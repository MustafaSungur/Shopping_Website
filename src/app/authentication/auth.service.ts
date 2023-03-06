import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './authResponse.model';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_KEY = environment.api_key;

  constructor(private http: HttpClient) {}
  user = new BehaviorSubject<User | null>(null);
  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          //observble , rxjs
          this.handleUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          //observble , rxjs
          this.handleUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  Logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }
  authLogin() {
    if (localStorage.getItem('user') == null) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExperitonDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
  private handleError(err: HttpErrorResponse) {
    let message = '';
    if (err.error.error) {
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          message = 'Bu mail adresi zaten kullanılıyor.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message =
            'Çok fazla giriş denemesi. Bir süre bekleyip tekrar deneyiniz.';
          break;
        case 'EMAIL_NOT_FOUND':
          message = 'Email adresi bulunamadı';
          break;
        case 'INVALID_PASSWORD':
          message = 'Hatalı şifre.';
          break;
        default:
          message = 'Hata Oluştu.';
      }
    }
    return throwError(() => message);
  }

  handleUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const experitonDate = new Date(
      new Date().getTime() + Number(expiresIn) * 1000
    );
    const user = new User(email, localId, idToken, experitonDate);

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
