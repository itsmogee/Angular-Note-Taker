import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject, retry } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userID: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserID() {
    return this.userID;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userID: string;
      }>('http://localhost:3000/api/user/login', authData)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userID = response.userID;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000,
          );
          this.saveAuthData(token, expirationDate, this.userID);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userID = authInformation.userID;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userID = null;
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userID: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userID', userID);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userID = localStorage.getItem('userID');

    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      userID: userID,
      expirationDate: new Date(expirationDate),
    };
  }

  private setAuthTimer(duration: number) {
    console.log(`Setting timer : ${duration}`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
  }
}
